import type { HttpAxiosInstance } from "../../../api/axios";
import type { CreateCategoryRepository } from "../../data/protocols/create-category-repository";

export class AxiosCategoryRepository implements CreateCategoryRepository {
  constructor(private readonly axiosInstance: HttpAxiosInstance) {}

  async create(data: any): Promise<any> {
    return await this.axiosInstance.axios.post("/category", data);
  }
}

