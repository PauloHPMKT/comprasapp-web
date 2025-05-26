import { inject } from "vue";
import type { CreateCategoryService } from "../services/category/data/create-category";
import type { Category } from "../services/category/domain/entities/Category";

export const useCategories = () => {
  const categoryService = inject<CreateCategoryService>("createCategoryProvider");

  if (!categoryService) {
    throw new Error("User service not provided");
  }

  /**
   * Creates a new category.
   * @param data - The category data to create.
   * @returns The created category or an error message.
   */
  async function createCategory(data: any): Promise<Category | { error: boolean; message: string }> {
    try {
      const { name, icon } = data;
      const result = await categoryService?.execute({ name, icon });
      return result.data;
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: (error as Error).message || "Falha na criação da categoria",
      }
    }
  }

  return { createCategory }
}
