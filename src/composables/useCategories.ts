import { inject } from "vue";
import type { CreateCategoryService } from "../services/category/data/create-category";
import type { Category } from "../services/category/domain/entities/Category";
import type { GetCategoriesService } from "../services/category/data/get-categories";

export const useCategories = () => {
  const categoryService = inject<CreateCategoryService>("createCategoryProvider");
  const getCategoriesService = inject<GetCategoriesService>("getCategoriesProvider");

  if (!categoryService || !getCategoriesService) {
    throw new Error("Category service not provided");
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

  /**
   * GetCategories retrieves a list of categories.
   * @returns - The list of categories or an error message.
   */
  async function getCategories(): Promise<Category[] | { error: boolean; message: string }> {
    try {
      const result = await getCategoriesService?.execute();
      return result;
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message || "Falha ao carregar as categorias",
      }
    }
  }

  return { createCategory, getCategories }
}
