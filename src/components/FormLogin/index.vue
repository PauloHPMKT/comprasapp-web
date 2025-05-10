<script setup lang="ts">
import MainButton from '../MainButton/index.vue';
</script>

<template>
  <form class="w-full">
    <div class="flex flex-col gap-3">
      <input type="text" placeholder="Insira seu e-mail" class="border border-gray-300 rounded-lg px-2 h-12 w-full">
      <input type="password" placeholder="Senha" class="border border-gray-300 rounded-lg px-2 h-12 w-full">
    </div>

    <div class="flex justify-between mt-3 mb-8">
      <label class="flex items-center">
        <input type="checkbox" class="mr-2">
        <small>Lembrar-me</small>
      </label>
      <small class="text-red-500 cursor-pointer">Esqueci minha senha</small>
    </div>

    <MainButton class="mb-4 bg-red-600">Entrar</MainButton>
  </form>
</template>