<script setup lang="ts">
</script>

<template>
  <button
    v-bind="$attrs"
    class="bg-gray-300 text-white rounded-lg h-12 w-full flex justify-center items-center"
  >
    <slot></slot>
  </button>
</template>