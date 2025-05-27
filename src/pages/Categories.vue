<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import MainButton from '../components/MainButton/index.vue';
import BaseInput from '../components/BaseInput/index.vue';
import NewCategory from '../components/NewCategory/index.vue';
import { useCategories } from '../composables/useCategories';
import type { Category } from '../services/category/domain/entities/Category';

const router = useRouter();
const { createCategory, getCategories } = useCategories();

const categories = ref<Category[]>([]);
const showCreateNewCategoryModal = ref<typeof NewCategory | null>(null);

function backToDashboard() {
  localStorage.removeItem('purchase-list-title');
  router.back()
}

function openNewCategoryModal() {
  showCreateNewCategoryModal.value?.isOpen();
}

async function addNewCategory(data: any) {
  const response = await createCategory(data);
  console.log(response);
}

function teste() {
  alert('teste');
}

onMounted(async () => {
  const response = await getCategories();
  if ('error' in response) {
    return response.error;
  }

  categories.value.push(...response);
})
</script>

<template>
  <div class="h-full">
    <div class="border-b-2 border-gray-300">
      <div class="flex gap-4">
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          class="text-gray-800 font-extrabold cursor-pointer mt-2"
          width="24"
          height="24"
          @click="backToDashboard"
        />
        <div class="flex flex-col">
          <h2 class="text-3xl font-bold">Categorias</h2>
          <p class="text-gray-500 mb-8">Selecione uma categoria para ver os produtos disponíveis.</p>
        </div>
      </div>
      <div class="flex items-center gap-4 mb-6">
        <BaseInput
          :has-icon="true"
          placeholder="Pesquisar categorias..."
          class="border-2 border-gray-300 rounded-lg px-2 h-11 min-w-1/2"
        >
          <Icon
            icon="material-symbols:search-rounded"
            width="24"
            height="24"
            class="flex items-center w-10 text-gray-500 cursor-pointer"
          />
        </BaseInput>
        <MainButton
          @click="openNewCategoryModal"
          class="bg-red-600 flex items-center justify-center rounded-lg h-11 w-fit"
        >
          <Icon icon="mingcute:plus-fill" width="24" height="24" />
          Nova Categoria
        </MainButton>
      </div>
    </div>
    <ul class="grid grid-cols-2 gap-4 mt-4">
      <li
        v-for="category in categories"
        :key="category.id"
        class="group w-full shadow-md rounded-lg p-4 flex items-center justify-between cursor-pointer bg-white"
      >
        <div class="w-full">
          <span class="text-3xl mr-4">{{ category.icon }}</span>
          <span class="text-lg font-semibold">{{ category.name }}</span>
        </div>
        <div class="hidden group-hover:block" @click="teste">
          <Icon
            icon="tabler:trash"
            width="24"
            height="24"
            class="text-red-500 cursor-pointer"
          />
        </div>
      </li>
    </ul>
    <NewCategory @create-category="addNewCategory" ref="showCreateNewCategoryModal"/>
  </div>
</template>
