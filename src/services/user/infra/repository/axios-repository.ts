import type { HttpAxiosInstance } from "../../../api/axios";
import type { CreateUserRepository } from "../../data/protocols/repositories/create-user";

export class AxiosUserRepository implements CreateUserRepository {
  constructor(private readonly axiosInstance: HttpAxiosInstance) {}

  async create(data: any): Promise<any> {
    return await this.axiosInstance.axios.post("/signup", data)
  }
}