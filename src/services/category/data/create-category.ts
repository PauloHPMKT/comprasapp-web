import type { CreateCategory } from "../domain/protocols/create-category";
import type { CreateCategoryRepository } from "./protocols/create-category-repository";


export class CreateCategoryService implements CreateCategory {
  constructor(private readonly createNewCategoryRepository: CreateCategoryRepository) {}

  async execute(data: any): Promise<any> {
    return await this.createNewCategoryRepository.create(data);
  }
}
