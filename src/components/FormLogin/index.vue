<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import MainButton from '../MainButton/index.vue';

interface userEmailProps {
  useremaillogin?: string;
}

const props = defineProps<userEmailProps>();
const emit = defineEmits(['successed-login']);

const loginUserData = reactive({
  email: '',
  password: ''
})

function handleLogin() {
  console.log('Login data:', loginUserData);
  emit('successed-login');
}

onMounted(() => {
  if (props.useremaillogin) {
    loginUserData.email = props.useremaillogin;
  }
});
</script>

<template>
  <form @submit.prevent="handleLogin" class="w-full">
    <div class="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Insira seu e-mail"
        v-model="loginUserData.email"
        class="border border-gray-300 rounded-lg px-2 h-12 w-full"
      >
      <input
        type="password"
        placeholder="Senha"
        v-model="loginUserData.password"
        class="border border-gray-300 rounded-lg px-2 h-12 w-full"
      >
    </div>

    <div class="flex justify-between mt-3 mb-8">
      <label class="flex items-center">
        <input type="checkbox" class="mr-2">
        <small>Lembrar-me</small>
      </label>
      <small class="text-red-500 cursor-pointer">Esqueci minha senha</small>
    </div>

    <MainButton class="mb-4 bg-red-600 w-full">Entrar</MainButton>
  </form>
</template>
