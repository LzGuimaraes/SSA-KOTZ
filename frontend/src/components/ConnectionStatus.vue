<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RefreshCw } from '@lucide/vue';
import { useConnectionStore } from '../stores/connection';

const connection = useConnectionStore();
const label = computed(
  () =>
    ({
      idle: 'Aguardando conexão',
      loading: 'Verificando conexão…',
      online: 'Serviços disponíveis',
      offline: 'Conexão indisponível',
    })[connection.status],
);

onMounted(() => {
  void connection.check();
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 text-sm text-slate-300">
    <span role="status" class="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        class="size-2 rounded-full"
        :class="
          connection.status === 'online'
            ? 'bg-emerald-400'
            : connection.status === 'offline'
              ? 'bg-amber-400'
              : 'bg-slate-500'
        "
      />
      {{ label }}
    </span>
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-xs transition hover:border-amber-300 hover:text-amber-200 disabled:cursor-wait disabled:opacity-50"
      :disabled="connection.status === 'loading'"
      @click="connection.check()"
    >
      <RefreshCw
        :size="14"
        aria-hidden="true"
        :class="{ 'animate-spin': connection.status === 'loading' }"
      />
      Verificar conexão
    </button>
  </div>
</template>
