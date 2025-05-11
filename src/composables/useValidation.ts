import { ref } from "vue";

export const useValidation = () => {
  const validationMessage = ref<string | null>(null);

  function formsValidation<T extends Record<string, any>>(data: T): boolean | string {
    const requiredFields = Object.keys(data) as Array<keyof T>;
    const allFieldsVerify = requiredFields.every(field => !data[field]);
    if (allFieldsVerify) {
      validationMessage.value = "Preencha todos os campos obrigatórios";
      return validationMessage.value;
    }

    for (const field of requiredFields) {
      if (!data[field]) {
        const passwordConfirmationField = field === "passwordConfirmation" && "confirmação de senha";
        const passwordField = field === "password" && "senha";
        const typeofField = passwordField || passwordConfirmationField || field;
        validationMessage.value = `Campo ${typeofField as string} é obrigatório`;
        return validationMessage.value;
      }
    }

    return true;
  }

  function lengthValue(value: string) {
    if (value.length < 3 || value.length > 50) {
      validationMessage.value = "O campo deve ter entre 3 e 50 caracteres";
      return validationMessage.value;
    }
  }

  function clearValidationMessage() {
    validationMessage.value = null;
  }

  return {
    formsValidation,
    clearValidationMessage,
    lengthValue,
    validationMessage,
  }
}