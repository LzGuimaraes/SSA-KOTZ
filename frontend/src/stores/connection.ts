import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHealth } from '../services/health';
import type { ConnectionStatus } from '../types/health';

export const useConnectionStore = defineStore('connection', () => {
  const status = ref<ConnectionStatus>('idle');

  async function check(): Promise<void> {
    if (status.value === 'loading') return;
    status.value = 'loading';
    try {
      const health = await getHealth();
      status.value = health.status === 'ok' && health.database === 'up' ? 'online' : 'offline';
    } catch {
      status.value = 'offline';
    }
  }

  return { status, check };
});
