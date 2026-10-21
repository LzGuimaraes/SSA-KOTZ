import assert from 'node:assert/strict';

const apiUrl = (process.env.SMOKE_API_URL || 'http://localhost:3000/api').replace(/\/+$/, '');
const webUrl = process.env.SMOKE_WEB_URL || 'http://localhost:5173';
const origin = new URL(webUrl).origin;
const request = (url, options = {}) =>
  fetch(url, { ...options, signal: AbortSignal.timeout(15000) });

const health = await request(`${apiUrl}/health`, { headers: { Origin: origin } });
assert.equal(health.status, 200, 'A API deve responder 200 com o PostgreSQL conectado.');
assert.deepEqual(await health.json(), { status: 'ok', database: 'up' });
assert.equal(
  health.headers.get('access-control-allow-origin'),
  origin,
  'CORS deve liberar o frontend.',
);

const preflight = await request(`${apiUrl}/health`, {
  method: 'OPTIONS',
  headers: { Origin: origin, 'Access-Control-Request-Method': 'GET' },
});
assert.equal(preflight.status, 204);
assert.equal(preflight.headers.get('access-control-allow-origin'), origin);

const denied = await request(`${apiUrl}/health`, {
  headers: { Origin: 'https://invalid.example' },
});
assert.equal(
  denied.headers.get('access-control-allow-origin'),
  null,
  'CORS deve restringir outras origens.',
);

const docs = await request(`${apiUrl}/docs`);
assert.equal(docs.status, 200, 'Swagger UI deve estar disponível.');
assert.match(await docs.text(), /swagger-ui/i);

const spec = await request(`${apiUrl}/docs-json`);
assert.equal(spec.status, 200);
const document = await spec.json();
assert.ok(document.paths['/api/health']?.get, 'Swagger deve documentar a rota de saúde.');
assert.deepEqual(
  Object.keys(document.paths),
  ['/api/health'],
  'Somente a rota técnica deve existir.',
);

const frontend = await request(webUrl);
assert.equal(frontend.status, 200, 'Frontend deve responder 200.');
assert.match(await frontend.text(), /<title>SSA KOTZ/);

console.log('OK: PostgreSQL via Prisma, API, Swagger, CORS e HTML do frontend.');
console.log('A renderização e as interações no navegador precisam de verificação visual.');
