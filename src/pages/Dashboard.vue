<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import MainButton from '../components/MainButton/index.vue';
import greenCart from '../assets/img/Logo-carrinho-verde.png';
import emptyMarket from '../assets/img/img-casas.png';

const router = useRouter();

const purchaseLists = ref([
  {
    id: 1,
    name: 'Compras do mês',
    value: 1000,
    date: '2025-01-01',
  },
  {
    id: 2,
    name: 'Compras do ano',
    value: 12000,
    date: '2025-01-01',
  },
]);
const titleBox = ref(false);
const purchaseListTitle = ref('');

function openTitleBox() {
  titleBox.value = true;
}

function navigateToCreatePurchaseListView() {
  titleBox.value = false;
  localStorage.setItem('purchase-list-title', purchaseListTitle.value); // provisório, será utilizado indexDB
  router.push({ name: 'purchase-list' });
}
</script>

<template>
  <div v-if="purchaseLists.length" class="flex justify-center items-center h-full">
    <div class="flex flex-col items-center justify-center rounded-lg">
      <img :src="emptyMarket" alt="Mercados vazios" class="w-48 rounded-lg" />
      <p class="text-gray-500 py-8">Nenhuma lista encontrada</p>
      <MainButton
        @click="openTitleBox"
        class="bg-red-600 h-11">
        Ir às compras
      </MainButton>
    </div>
  </div>
  <div v-else class="h-[77vh]">
    <div class="mb-8">
      <h2 class="text-3xl font-bold">Dashboard</h2>
    </div>
    <div class="flex h-full">
      <div class="w-1/2">
        <div class="flex w-full mb-4">
          <!-- Criar componente de input para englobar o icone de pesquisa -->
          <input
            type="text"
            placeholder="Nome do item"
            class="border border-gray-300 rounded-lg px-2 h-12 w-full"
          />
          <MainButton class="bg-red-600 flex items-center justify-center rounded-lg w-fit">
            <Icon icon="material-symbols:search-rounded" width="28" height="28" class="text-bold text-white" />
          </MainButton>
        </div>
        <div class="bg-[#e2e2e2] rounded-lg gap-4 h-36 overflow-hidden relative">
          <div class="flex justify-between px-4 py-3 h-full">
            <div class="w-[90%] flex flex-col pt-2">
              <p class="font-semibold">Valor total de compras no ano de 2025</p>
              <span class="font-bold text-[25px] pb-3">R$ 1.000,00</span>
              <p class="text-gray-500">Utilize os valores aqui gerados para ajudar a medir seu orçamento</p>
            </div>
            <div class="w-[10%]">
              <img :src="greenCart" alt="Carrinho Verde" class="w-14" />
            </div>
          </div>
          <div class="w-full bg-green-600 h-2 absolute bottom-0"></div>
        </div>
        <div class="border-t-2 border-gray-200 mt-4 py-3 h-[60%] overflow-hidden">
          <ul class="overflow-auto h-full flex flex-col gap-2">
            <li class="bg-gray-50 flex flex-col px-4 py-3 rounded-lg gap-2">
              <div class="flex gap-4 mb-4 justify-start">
                <Icon
                  icon="mingcute:check-fill"
                  width="24"
                  height="24"
                  class="text-green-600 bg-white rounded-full"
                />
                <div>
                  <h3 class="font-bold">Listas de compras do mês de abril</h3>
                  <p>Teste</p>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="flex gap-4">
                  <Icon icon="mdi:marketplace" width="24" height="24" class="text-red-500" />
                  <span class="text-gray-500">Items mais comprados no mês...</span>
                </div>
                <div class="flex gap-2">
                  <span class="text-gray-800 font-bold">R$ 1.000,00</span>
                </div>
              </div>
            </li>
            <li class="bg-gray-50 flex flex-col px-4 py-3 rounded-lg gap-2">
              <div class="flex gap-4 mb-4 justify-start">
                <Icon
                  icon="mingcute:check-fill"
                  width="24"
                  height="24"
                  class="text-green-600 bg-white rounded-full"
                />
                <div>
                  <h3 class="font-bold">Listas de compras do mês de abril</h3>
                  <p>Teste</p>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="flex gap-4">
                  <Icon icon="mdi:marketplace" width="24" height="24" class="text-red-500" />
                  <span class="text-gray-500">Items mais comprados no mês...</span>
                </div>
                <div class="flex gap-2">
                  <span class="text-gray-800 font-bold">R$ 1.000,00</span>
                </div>
              </div>
            </li>
            <li class="bg-gray-50 flex flex-col px-4 py-3 rounded-lg gap-2">
              <div class="flex gap-4 mb-4 justify-start">
                <Icon
                  icon="mingcute:check-fill"
                  width="24"
                  height="24"
                  class="text-green-600 bg-white rounded-full"
                />
                <div>
                  <h3 class="font-bold">Listas de compras do mês de abril</h3>
                  <p>Teste</p>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="flex gap-4">
                  <Icon icon="mdi:marketplace" width="24" height="24" class="text-red-500" />
                  <span class="text-gray-500">Items mais comprados no mês...</span>
                </div>
                <div class="flex gap-2">
                  <span class="text-gray-800 font-bold">R$ 1.000,00</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-1/2">
        folder 2
      </div>
    </div>
  </div>
  <div
    v-if="titleBox"
    class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-md p-4 w-[450px] text-center relative">
      <Icon
        icon="material-symbols-light:close-small-rounded"
        @click="titleBox = false"
        class="absolute top-0 right-0 cursor-pointer w-11 h-11"
      />
      <h3 class="font-bold mt-4 mb-3">Adicione um título à lista</h3>
      <p class="text-gray-500">Para melhor organização das suas listas de compras adicione um título a cada uma delas.</p>
      <div class="flex items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Título da lista"
          v-model="purchaseListTitle"
          class="border border-gray-300 rounded-lg px-2 h-12 w-[800px]"
        >
        <MainButton
          @click="navigateToCreatePurchaseListView"
          class="min-w-fit bg-red-600 h-12">
          Criar
        </MainButton>
      </div>
    </div>
  </div>
</template>
