import { access, readFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { parseEnv } from 'node:util';

const root = fileURLToPath(new URL('../', import.meta.url));

async function createIfMissing(path, content) {
  try {
    await writeFile(resolve(root, path), content, { flag: 'wx', mode: 0o600 });
    console.log(`Criado: ${path}`);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    console.log(`Preservado: ${path}`);
  }
}

const rootEnv = resolve(root, '.env');
try {
  await access(rootEnv);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  const template = await readFile(resolve(root, '.env.example'), 'utf8');
  await createIfMissing(
    '.env',
    template.replace('ssa_kotz_dev_password', randomBytes(24).toString('hex')),
  );
}

const values = parseEnv(await readFile(rootEnv, 'utf8'));

for (const key of ['POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB', 'POSTGRES_PORT']) {
  if (!values[key]) throw new Error(`Defina ${key} no .env da raiz antes de continuar.`);
}

const databaseUrl = `postgresql://${encodeURIComponent(values.POSTGRES_USER)}:${encodeURIComponent(values.POSTGRES_PASSWORD)}@localhost:${values.POSTGRES_PORT}/${encodeURIComponent(values.POSTGRES_DB)}?schema=public`;
const backendTemplate = await readFile(resolve(root, 'backend/.env.example'), 'utf8');
await createIfMissing(
  'backend/.env',
  backendTemplate
    .replace(/^DATABASE_URL=.*$/m, `DATABASE_URL=${databaseUrl}`)
    .replace(
      'replace_with_a_random_secret_before_implementing_auth',
      randomBytes(48).toString('hex'),
    ),
);
await createIfMissing(
  'frontend/.env',
  await readFile(resolve(root, 'frontend/.env.example'), 'utf8'),
);
