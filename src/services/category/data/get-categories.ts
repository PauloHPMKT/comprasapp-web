import type { GetCategories } from "../domain/protocols/get-categories";
import type { GetCategoriesRepository } from "./protocols/get-categories";

export class GetCategoriesService implements GetCategories {
  constructor(private readonly getAllCategories: GetCategoriesRepository) {}

  async execute(): Promise<any> {
    const { data } = await this.getAllCategories.findAll();
    if (!data.length) {
      return 'Não há nenhuma categoria listada';
    }
    const categories = data;
    return categories;
  }
}
