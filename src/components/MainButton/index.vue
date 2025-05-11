<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

interface MainButtonProps {
  class?: string;
}

const props = defineProps<MainButtonProps>();
</script>

<template>
  <button
    v-bind="$attrs"
    :class="twMerge(
      'flex items-center justify-center gap-2 text-white font-semibold rounded-lg px-4 py-2',
      props.class
    )"
  >
    <slot></slot>
  </button>
</template>