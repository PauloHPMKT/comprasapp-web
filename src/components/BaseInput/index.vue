<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

interface InputFieldProps {
  placeholder: string;
  isPassword?: boolean;
}

defineProps<InputFieldProps>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref("");
const inputType = ref("password");
const isFocused = ref(false);

const handleBlur = (newValue: string) => {
  inputValue.value = newValue;
  emit("update:modelValue", newValue);
};

const togglePassword = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div class="flex border border-gray-300 rounded-lg px-2 h-12 w-full">
    <input
      v-bind="$attrs"
      v-model="inputValue"
      @focus="isFocused = true"
      @blur="handleBlur(($event.target as HTMLInputElement).value || '')"
      class="w-full h-full outline-none border-none"
      :type="isPassword ? inputType : 'text'"
      :placeholder="placeholder"
    />
    <div
      v-if="isPassword"
      @click="togglePassword"
      class="text-black flex items-center justify-end cursor-pointer"
    >
      <Icon :icon="`tabler:${
          inputType === 'text'
            ? 'eye'
            : 'eye-off'
        }`"
        class="w-5 h-5 mr-2"
      />
    </div>
  </div>
</template>
