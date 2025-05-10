<script setup lang="ts">
import MainButton from '../MainButton/index.vue';
</script>

<template>
  <form class="w-full">
    <div class="flex flex-col gap-3 mb-8">
      <input type="text" placeholder="Insira seu nome" class="border border-gray-300 rounded-lg px-2 h-12 w-full">
      <input type="text" placeholder="Insira seu e-mail" class="border border-gray-300 rounded-lg px-2 h-12 w-full">
      <input type="password" placeholder="Senha" class="border border-gray-300 rounded-lg px-2 h-12 w-full">
      <input type="password" placeholder="Confirme sua senha" class="border border-gray-300 rounded-lg px-2 h-12 w-full">
    </div>

    <MainButton class="mb-4 bg-red-600">Criar conta</MainButton>
  </form>
</template>