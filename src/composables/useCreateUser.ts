import { inject } from "vue";
import type { CreateUserService } from "../services/user/data/create-user-service";

export const useCreateUser = () => {
  const userService = inject<CreateUserService>("createUserProvider");

  if (!userService) {
    throw new Error("User service not provided");
  }

  async function createUser(data: any) {
    const user = await userService?.execute(data);
    console.log("user", user);
  }

  return { createUser }
}