<script setup lang="ts">
import { Sparkles } from '@lucide/vue';
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-6xl flex-col px-6 sm:px-10">
    <a href="#main" class="sr-only focus:not-sr-only focus:py-3">Pular para o conteúdo</a>
    <header class="flex items-center justify-between gap-4 border-b border-slate-800 py-7">
      <RouterLink
        to="/"
        aria-label="SSA KOTZ, página inicial"
        class="inline-flex items-center gap-3 font-semibold tracking-widest text-slate-100"
      >
        <Sparkles class="text-amber-300" :size="24" aria-hidden="true" />
        SSA <span class="text-amber-300">KOTZ</span>
      </RouterLink>
      <span class="rounded-full border border-amber-300/25 px-3 py-1 text-xs text-amber-200"
        >Em desenvolvimento</span
      >
    </header>
    <main id="main" class="flex-1 py-16 sm:py-24"><slot /></main>
    <footer class="border-t border-slate-800 py-6 text-xs leading-relaxed text-slate-400">
      Projeto independente da comunidade. Saint Seiya Awakening: Knights of the Zodiac pertence aos
      seus respectivos titulares.
    </footer>
  </div>
</template>
