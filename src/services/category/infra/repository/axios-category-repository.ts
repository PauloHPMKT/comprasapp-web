import type { HttpAxiosInstance } from "../../../api/axios";
import type { CreateCategoryRepository } from "../../data/protocols/create-category-repository";
import type { GetCategoriesRepository } from "../../data/protocols/get-categories";

export class AxiosCategoryRepository implements CreateCategoryRepository, GetCategoriesRepository {
  constructor(private readonly axiosInstance: HttpAxiosInstance) {}

  async create(data: any): Promise<any> {
    return await this.axiosInstance.axios.post("/category", data);
  }

  async findAll(): Promise<any> {
    return await this.axiosInstance.axios.get("/categories");
  }
}

