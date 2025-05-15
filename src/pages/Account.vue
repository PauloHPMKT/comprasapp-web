<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import FormLogin from '../components/FormLogin/index.vue';
import RegisterForm from '../components/RegisterForm/index.vue';
import VerticalLogo from '../assets/img/Logo-vertical.png';

const showLogin = ref(true);

const welcomeAccountMessage = computed(() => {
  return showLogin.value
  ? 'Acesse sua conta para continuar'
  : 'e organize suas compras de forma prática e inteligente';
});

function toggleForm() {
  showLogin.value = !showLogin.value;
};

function handleUserCreated() {
  showLogin.value = true;
}

onMounted(() => {
  const useremail = localStorage.getItem('useremail');
  if (useremail) {
    showLogin.value = true;
  }
});

</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="p-8 w-96">
      <div class="flex flex-col items-center mb-8">
        <img :src="VerticalLogo" alt="Logo principal comprassapp" class="w-32 mb-4" />

        <div class="text-center my-6">
          <h2 class="font-bold text-2xl">
            {{ showLogin ? 'Bem-vindo de volta!' : 'Crie sua conta!' }}
          </h2>
          <p class="text-gray-400 font-light" v-html="welcomeAccountMessage"></p>
        </div>
      </div>

      <div v-if="showLogin">
        <FormLogin />
      </div>
      <div v-else>
        <RegisterForm @user-created="handleUserCreated" />
      </div>

      <div class="flex justify-center items-center mt-8">
        <span
          class="mr-2 text-red-500 underline text-[14px] cursor-pointer"
          @click="toggleForm"
        >
          {{ showLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login' }}
        </span>
      </div>
    </div>
  </div>
</template>
