import type { CreateCategory } from "../domain/protocols/create-category";
import type { CreateCategoryRepository } from "./protocols/create-category-repository";


export class CreateCategoryService implements CreateCategory {
  constructor(private readonly createNewCategoryRepository: CreateCategoryRepository) {}

  async execute(data: any): Promise<any> {
    console.log("Creating category with data:", data);
    return await this.createNewCategoryRepository.create(data);
  }
}
