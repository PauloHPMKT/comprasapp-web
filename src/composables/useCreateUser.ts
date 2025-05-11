import { inject } from "vue";
import type { CreateUserService } from "../services/user/data/create-user-service";
import type { UserModel } from "../services/user/domain/models/create-user";
import type { User } from "../services/user/domain/entities/User";

export const useCreateUser = () => {
  const userService = inject<CreateUserService>("createUserProvider");

  if (!userService) {
    throw new Error("User service not provided");
  }

  /**
   * Creates a new user.
   * @param data - The user data to create.
   * @returns The created user or an error message.
   */
  async function createUser(
    data: UserModel.ToCreate
  ): Promise<User | { error: boolean; message: string }> {
    try {
      const {
        name,
        email,
        password,
        passwordConfirmation,
      } = data;
      const result = await userService?.execute({ name, email, password, passwordConfirmation });
      return result.data;
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: (error as Error).message || "Falha na criação do usuário",
      }
    }
  }

  return { createUser }
}