<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Content from './Content.vue';
import UserProfileCard from '../components/UserProfileCard/index.vue';
import horizontalLogo from '../assets/img/Logo-horizontal.png'
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const router = useRouter();

const userProfileCard = ref<typeof UserProfileCard | null>(null);

const firstNameUpperLatter = computed(() => {
  return authStore.$state.currentUser.name.charAt(0).toUpperCase();
})

const username = computed(() => {
  return authStore.$state.currentUser.name;
})

function toCategories() {
  localStorage.removeItem('purchase-list-title');
  router.push('/app/categories')
}

function toggleProfileCard() {
  userProfileCard.value?.toggleCardVisibility();
}
</script>

<template>
  <div class="max-w-[1280px] mx-auto h-[89vh]">
    <div class="mx-6 h-full">
      <header class="flex items-center justify-between py-4 px-6">
        <img :src="horizontalLogo" alt="Logo Comprasapp horizonta" class="w-44" />
        <div class="flex items-center justify-center gap-4">
          <div class="flex items-center gap-2 cursor-pointer relative" @click="toggleProfileCard">
            <span class="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center text-white cursor-pointer">
              {{ firstNameUpperLatter }}
            </span>
            <strong>{{ username }}</strong>
            <UserProfileCard ref="userProfileCard" />
          </div>
        </div>
      </header>
      <div class="flex gap-4 shadow-md shadow-gray-400 rounded-lg h-full pr-4 overflow-hidden">
        <!-- O Menu só aparece quanto existir listas criadas -->
        <div class="w-60 h-full mb-4 border-r-2 border-gray-100 bg-gray-50 pr-4">
          <ul class="flex flex-col items-start justify-start p-4">
            <li class="flex items-center justify-between mb-4">
              <span class="text-gray-500">Minhas Listas</span>
              <Icon icon="mingcute:plus-fill" width="24" height="24" class="text-red-500" />
            </li>
            <li
              @click="toCategories"
              class="flex items-center justify-between mb-4"
            >
              <span class="text-gray-500">Categorias</span>
              <Icon icon="mingcute:plus-fill" width="24" height="24" class="text-red-500" />
            </li>
          </ul>
        </div>
        <main class="w-full h-full">
          <Content />
        </main>
      </div>
    </div>
  </div>
</template>

