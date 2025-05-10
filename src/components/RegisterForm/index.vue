<script setup lang="ts">
import { reactive } from 'vue';
import MainButton from '../MainButton/index.vue';
import { useCreateUser } from '../../composables/useCreateUser';

const { createUser } = useCreateUser();
const createUserData = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
});

async function submitData() {
  await createUser(createUserData);
}

</script>

<template>
  <form @submit.prevent="submitData" class="w-full">
    <div class="flex flex-col gap-3 mb-8">
      <input
        type="text"

        placeholder="Insira seu nome"
        v-model="createUserData.name"
        class="border border-gray-300 rounded-lg px-2 h-12 w-full"
      >
      <input
        type="text"
        placeholder="Insira seu e-mail"
        class="border border-gray-300 rounded-lg px-2 h-12 w-full"
        v-model="createUserData.email"
      >
      <input
        type="password"
        placeholder="Senha"
        class="border border-gray-300 rounded-lg px-2 h-12 w-full"
        v-model="createUserData.password"
      >
      <input
        type="password"
        placeholder="Confirme sua senha"
        class="border border-gray-300 rounded-lg px-2 h-12 w-full"
        v-model="createUserData.passwordConfirmation"
      >
    </div>

    <MainButton class="mb-4 bg-red-600">Criar conta</MainButton>
  </form>
</template>