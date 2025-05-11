<script setup lang="ts">
import { reactive } from 'vue';
import MainButton from '../MainButton/index.vue';
import { useCreateUser } from '../../composables/useCreateUser';
import { useValidation } from '../../composables/useValidation';
import type { UserModel } from '../../services/user/domain/models/create-user';

const emit = defineEmits(['user-created']);

const { createUser } = useCreateUser();
const { formsValidation, validationMessage, lengthValue } = useValidation();

const createUserData = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
});

async function submitData() {
  const params = createUserData as UserModel.ToCreate

  const validationResult = formsValidation(params);
  if (typeof validationResult === 'string') {
    alert(validationMessage.value);
    return;
  }

  const nameLength = lengthValue(params.name);
  if (nameLength) {
    alert(validationMessage.value)
    return;
  }

  const result = await createUser(params);
  if ('error' in result) {
    console.log('Usuário criado com sucesso', result.error);
    alert('Usuario ja existe') // replicar erro correto vindo do backend
    return;
  }

  localStorage.setItem('useremail', result.email)
  emit('user-created');
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