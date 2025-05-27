<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import MainButton from '../components/MainButton/index.vue';
import BaseInput from '../components/BaseInput/index.vue';
import SelectBox from '../components/SelectBox/index.vue';
import NewCategory from '../components/NewCategory/index.vue';
import emptyList from '../assets/img/img-lista-vazia.png';
import type { PurchaseList } from '../types/Purchase-list';
import type { Category } from '../services/category/domain/entities/Category';
import { useCategories } from '../composables/useCategories';

interface Item {
  localId: number;
  name: string;
  quantity: string;
  category: string;
  price: string;
  isEditing: boolean;
  isEditingPrice: boolean;
}

const { createCategory, getCategories } = useCategories();
const router = useRouter();
const listTitle = ref(localStorage.getItem('purchase-list-title'));
const newItem = reactive<PurchaseList.ItemToAdd>({
  name: '',
  quantity: '',
  category: ''
});
const listProducts = reactive<Item[]>([]);
const formatedValue = ref('R$ 0,00');
const openSelectBox = ref<typeof SelectBox | null>(null)
const newCategory = ref<typeof NewCategory | null>(null);

const categories = ref<Category[]>([]);

// adicionar função a um watch
watch(listProducts, () => {
  calculateTotalPriceItems();
}, { deep: true });

function backToDashboard() {
  localStorage.removeItem('purchase-list-title');
  router.back()
}

function addItem() {
  // realizar a validação dos campos
  if (newItem.name && newItem.quantity /*&& newItem.category*/) {
    const itemToAdd = {
      ...newItem,
      quantity: newItem.quantity,
      localId: listProducts.length + 1,
      price: '',
      isEditing: false,
      isEditingPrice: false
    }
    listProducts.push(itemToAdd);
    // enviar o item para o banco de dados
    newItem.name = '';
    newItem.quantity = '';
    newItem.category = '';
  }
}

function toogleEditField(id: number, field?: string) {
  const item = listProducts.find(item => item.localId === id);
  if (!item) return;

  // Sempre ativa o modo de edição de preço
  if (field === 'price') {
    item.isEditingPrice = true;
  }

  if (!field) {
    item.isEditing = true
  }
}

function handleSetItem(id: number, field: keyof Item, value: string) {
  const item = listProducts.find(item => item.localId === id);
  if (!item) return;

  (item as Record<string, any>)[field] = value;
  item.isEditing = false;
  item.isEditingPrice = false;
}

function selectCategory(id: string) {
  const category = categories.value.find(category => category.id === id);
  if (!category) return;
  newItem.category = category.icon;
}

function openSelectBoxModal() {
  openSelectBox.value?.isOpen();
}

function openNewCategoryModal() {
  newCategory.value?.isOpen();
}

function calculateTotalPriceItems () {
  const total = listProducts.reduce((total, item) => {
    const price = Number(item.price.replace(",", "."));
    const quantity = Number(item.quantity);
    return total + (price * quantity);
  }, 0);
  return formatedValue.value = total.toFixed(2)
};

async function addNewCategory(data: any) {
  console.log('Nova categoria:', data);
  const response = await createCategory(data);
  console.log(response);
  openSelectBoxModal();
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
    <div class="pb-6 border-b-2 border-gray-300">
      <div class="flex items-center gap-4 mb-6">
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          class="text-gray-800 font-extrabold cursor-pointer mb-6"
          width="24"
          height="24"
          @click="backToDashboard"
        />
        <div class="flex flex-col ">
          <h2 class="text-3xl font-bold">{{ listTitle }}</h2>
          <p class="text-gray-500">Insira os dados e preencha sua lista de compras</p>
        </div>
      </div>

      <div class="flex gap-2 w-[70%]">
        <BaseInput
          placeholder="Nome do produto"
          class="border-2 border-gray-300 rounded-lg px-2 h-11 w-[75%]"
          v-model="newItem.name"
        />
        <BaseInput
          placeholder="Quant..."
          class="border-2 border-gray-300 rounded-lg px-2 h-11 w-[25%]"
          v-model="newItem.quantity"
        />
        <div
          @click="openSelectBoxModal"
          class="relative flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-lg px-2 h-11 w-[25%]"
        >
          <span>
            {{ newItem.category || 'Categoria' }}
          </span>
        </div>
        <SelectBox
          :categories="categories"
          @select-category="selectCategory"
          @category-modal="openNewCategoryModal"
          ref="openSelectBox"
        />

        <NewCategory
          @create-category="addNewCategory"
          ref="newCategory"
        />

        <MainButton
          @click="addItem"
          class="bg-red-600 flex items-center justify-center rounded-lg h-11 w-fit"
        >
          <Icon icon="mingcute:plus-fill" width="24" height="24" />
          Adicionar
        </MainButton>
      </div>
    </div>

    <div v-if="!listProducts.length" class="h-[72%] flex items-center justify-center">
      <div class="flex justify-center items-center flex-col">
        <img :src="emptyList" alt="Lista vazia" class="w-42 mb-12" />
        <h4 class="font-bold text-2xl">Lista Vazia!</h4>
        <span class="text-[12px] text-gray-400">Nenhum item foi adicionado à lista...</span>
      </div>
    </div>
    <div v-else class="h-[72%] relative">
      <ul class="flex flex-col gap-2 bg-gray-50 h-full overflow-auto">
        <li
          v-for="product in listProducts"
          :key="product.localId"
          class="flex justify-between items-center bg-white h-16 w-full rounded-lg shadow px-4 py-3"
        >
          <div class="flex items-center justify-between w-[80%]">
            <div class="flex items-center gap-8 w-[10%]">
              <p class="w-12 h-12 text-[30px] text-gray-500">{{ product.category }}</p>
            </div>
            <div class="w-[60%] flex items-center gap-4">
              <p class="font-semibold">{{ product.name }}</p>
            </div>
            <div class="w-[20%] flex items-center justify-center rounded-lg h-12">
              <BaseInput
                v-if="product.isEditing"
                v-model="product.quantity"
                placeholder="0"
                class="w-full h-11"
                @keyup.enter="handleSetItem(product.localId, 'quantity', product.quantity)"
              />
              <span
                v-else
                @click="toogleEditField(product.localId)"
                class="text-gray-500 w-full h-full flex items-center justify-center"
              >
                {{ product.quantity }}
              </span>
            </div>
          </div>
          <!-- TODO transformar bloco input em um componente editavel -->
          <div class="flex items-center justify-end gap-2 w-[20%]">
            <BaseInput
              v-if="product.isEditingPrice"
              v-model="product.price"
              placeholder="R$ 0,00"
              class="w-[50%] h-11"
              @keyup.enter="handleSetItem(product.localId, 'price', product.price)"
            />
            <MainButton
              v-else-if="!product.price"
              @click="toogleEditField(product.localId, 'price')"
              class="flex items-center justify-center rounded-lg w-fit h-11 bg-red-700"
            >
              R$ <Icon icon="cuida:plus-outline" class="w-4 h-4 font-bold text-white" />
            </MainButton>
            <div
              v-else
              @click="toogleEditField(product.localId, 'price')"
              style="cursor:pointer"
            >
              <p class="font-semibold">
                {{ Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="bg-white flex justify-between items-center absolute bottom-0 w-full h-22 pt-4 border-t-2 border-gray-200">
        <div class="px-4 py-3">
          <p class="font-normal">Total de itens: 1</p>
          <h6 class="font-semibold">Valor total {{ formatedValue }}</h6>
        </div>
        <MainButton class="bg-red-600 flex items-center justify-center rounded-lg w-fit h-11">
          Salvar Lista
        </MainButton>
      </div>
    </div>
  </div>
</template>
