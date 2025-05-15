<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface InputFieldProps {
  placeholder: string;
  isPassword?: boolean;
  modelValue?: string;
}

const props = defineProps<InputFieldProps>();
const emit = defineEmits(["update:modelValue"]);

import { ref, watch } from "vue";

const inputType = ref(props.isPassword ? "password" : "text");

watch(
  () => props.isPassword,
  (newInputTypeValue) => {
    inputType.value = newInputTypeValue ? "password" : "text";
  }
);

function togglePassword() {
  inputType.value =
    inputType.value === "password" ? "text" : "password";
}

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="flex border border-gray-300 rounded-lg px-2 h-12 items-center">
    <input
      v-bind="$attrs"
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      class="w-full h-full outline-none border-none"
    />
    <div
      v-if="isPassword"
      class="cursor-pointer"
      @click="togglePassword"
    >
      <Icon
        :icon="`tabler:${inputType === 'password' ? 'eye-off' : 'eye'}`"
        class="flex items-center w-10"
      />
    </div>
  </div>
</template>
