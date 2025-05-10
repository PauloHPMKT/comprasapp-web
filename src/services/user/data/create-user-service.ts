import type { CreateUser } from "../domain/protocols/create-user";
import type { CreateUserRepository } from "./protocols/repositories/create-user";

export class CreateUserService implements CreateUser {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(data: any): Promise<any> {
    return await this.createUserRepository.create(data);
  }
}