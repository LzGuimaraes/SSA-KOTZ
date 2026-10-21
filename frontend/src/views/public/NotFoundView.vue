<script setup lang="ts">
import PublicLayout from '../../layouts/PublicLayout.vue';
</script>

<template>
  <PublicLayout>
    <p class="text-sm text-amber-300">404</p>
    <h1 class="mt-4 text-4xl font-semibold text-slate-100">Página não encontrada</h1>
    <p class="mt-5 text-slate-300">Este caminho ainda não faz parte do nosso universo.</p>
    <RouterLink
      to="/"
      class="mt-8 inline-block rounded-lg border border-amber-300/50 px-5 py-3 text-amber-200 hover:bg-amber-300/10"
      >Voltar ao início</RouterLink
    >
  </PublicLayout>
</template>
