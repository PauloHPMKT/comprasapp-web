<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '../BaseInput/index.vue';
import MainButton from '../MainButton/index.vue';
import Overlay from '../Overlay/index.vue';

interface CategoryProps {
  id: string;
  name: string;
  icon: string;
}

defineProps<{categories: CategoryProps[]}>();
const emit = defineEmits(['select-category', 'category-modal']);

const isModalOpen = ref(false);
//const showCreateNewCategoryModal = ref<typeof NewCategory | null>(null);

function handleSelectCategory(categoryId: string) {
  // Emitir evento para o componente pai com a categoria selecionada
  emit('select-category', categoryId);
  isModalOpen.value = false;
}

function openNewCategoryModal() {
  emit('category-modal');
  isModalOpen.value = false;
}

function isOpen() {
  isModalOpen.value = true
}

defineExpose({
  isOpen,
})
</script>

<template>
  <Overlay v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="relative min-w-[600px] bg-white rounded-2xl shadow-lg p-4">
      <Icon
        icon="material-symbols-light:close-small-rounded"
        @click="isModalOpen = false"
        class="absolute top-0 right-0 cursor-pointer w-11 h-11"
      />
      <h3 class="text-[#121212] text-2xl font-bold">Categorias</h3>
      <div class="mt-8">
        <BaseInput
          :has-icon="true"
          placeholder="Encontre uma categoria"
          class="border-transparent rounded-b-none border-b-2 border-b-gray-300 bg-white pl-2 pr-4 w-full"
        >
          <Icon
            icon="tabler:search"
            class="text-gray-500 cursor-pointer"
            width="24"
            height="24"
          />
        </BaseInput>
      </div>
      <div class="overflow-y-auto max-h-[300px] border-b-2 border-gray-300">
        <ul class="flex flex-col px-4 py-2">
          <li
            v-for="{ id, name, icon } in categories"
            :key="id"
            @click="handleSelectCategory(id)"
            class="flex justify-between items-center bg-white h-11 w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
          >
            <div class="flex items-center gap-4">
              <p class="w-6 h-6 text-gray-500">{{ icon }}</p>
              <p>{{ name }}</p>
            </div>
          </li>
        </ul>
      </div>
      <MainButton
        @click="openNewCategoryModal"
        class="bg-red-600 flex items-center justify-center rounded-lg h-11 w-fit mt-4"
      >
        <Icon icon="tabler:pencil-plus" width="24" height="24" />
        Adicionar nova categoria
      </MainButton>
    </div>
  </Overlay>
</template>
