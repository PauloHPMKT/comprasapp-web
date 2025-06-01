<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, inject, onMounted, ref } from 'vue';
import FormLogin from '../components/FormLogin/index.vue';
import RegisterForm from '../components/RegisterForm/index.vue';
import VerticalLogo from '../assets/img/Logo-vertical.png';
import type { Account } from '../types/Account';
import { AuthLoginService } from '../services/auth/data/auth-login-service';
import { useAuthStore } from '../store/auth';

const authLoginService = inject<AuthLoginService>('authLoginService');

const authStore = useAuthStore();
const router = useRouter();

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

async function handleLogin(params: Account.ToLogin) {
  try {
    const { payload, status } = await authLoginService?.execute(params);
    if (status === 200) {
      await authStore.setUser(payload);
      router.push('/app/dashboard');
    }
  } catch (error) {
    console.error(error);
    return error;
  }
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

      <transition name="fade" mode="out-in">
        <div v-if="showLogin">
          <FormLogin @handle-login="handleLogin" />
        </div>
        <div v-else>
          <RegisterForm @user-created="handleUserCreated" />
        </div>
      </transition>

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
