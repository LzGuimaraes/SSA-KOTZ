<script setup lang="ts">
import { BookOpen, Shield, Sparkles } from '@lucide/vue';
import PublicLayout from '../../layouts/PublicLayout.vue';
import ConnectionStatus from '../../components/ConnectionStatus.vue';

const sections = [
  {
    title: 'Cavaleiros',
    description: 'Um espaço para conhecer os cavaleiros e suas habilidades.',
    icon: Shield,
  },
  {
    title: 'Builds e cosmos',
    description: 'Combinações para explorar o potencial de cada cavaleiro.',
    icon: Sparkles,
  },
  {
    title: 'Guias',
    description: 'Estratégias e conhecimento compartilhados pela comunidade.',
    icon: BookOpen,
  },
];
</script>

<template>
  <PublicLayout>
    <p class="mb-5 text-xs font-medium tracking-[0.22em] text-amber-300 uppercase">
      Saint Seiya Awakening
    </p>
    <h1
      class="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-slate-50 sm:text-6xl"
    >
      O próximo passo da sua jornada começa com <span class="text-amber-200">conhecimento.</span>
    </h1>
    <p class="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
      Um ponto de encontro para guias, builds e estratégias de Knights of the Zodiac. Estamos
      preparando esse universo para você.
    </p>
    <div class="mt-9"><ConnectionStatus /></div>
    <section class="mt-16 grid gap-4 sm:grid-cols-3" aria-label="Conteúdos planejados">
      <article
        v-for="section in sections"
        :key="section.title"
        class="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6"
      >
        <component :is="section.icon" class="mb-6 text-amber-300" :size="24" aria-hidden="true" />
        <h2 class="text-lg font-medium text-slate-100">{{ section.title }}</h2>
        <p class="mt-3 text-sm leading-6 text-slate-400">{{ section.description }}</p>
        <p class="mt-6 text-xs text-amber-200/80">Em breve</p>
      </article>
    </section>
  </PublicLayout>
</template>
