<script setup lang="ts">
import { reactive } from 'vue';
import MainButton from '../MainButton/index.vue';
import BaseInput from '../BaseInput/index.vue';
import type { Account } from '../../types/Account';

const emit = defineEmits(['handle-login']);

const loginUserData = reactive<Account.ToLogin>({
  email: '',
  password: ''
})

function handleLogin() {
  emit('handle-login', loginUserData);
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="w-full">
    <div class="flex flex-col gap-3">
      <BaseInput
        placeholder="Insira seu e-mail"
        v-model="loginUserData.email"
      />
      <BaseInput
        :isPassword="true"
        placeholder="Insira sua senha"
        v-model="loginUserData.password"
      />
    </div>

    <div class="flex justify-between mt-3 mb-8">
      <label class="flex items-center">
        <input type="checkbox" class="mr-2">
        <small>Lembrar-me</small>
      </label>
      <small class="text-red-500 cursor-pointer">Esqueci minha senha</small>
    </div>

    <MainButton
      type="submit"
      class="mb-4 bg-red-600 w-full"
    >
      Entrar
    </MainButton>
  </form>
</template>
