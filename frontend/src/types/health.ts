export interface HealthResponse {
  status: 'ok';
  database: 'up';
}

export type ConnectionStatus = 'idle' | 'loading' | 'online' | 'offline';
