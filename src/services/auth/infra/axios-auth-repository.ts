
import type { Account } from "../../../types/Account";
import type { HttpAxiosInstance } from "../../api/axios";
import type { AuthRepository } from "../data/protocols/auth-repository";

export class AxiosAuthRepository implements AuthRepository {
  constructor(private readonly axiosInstance: HttpAxiosInstance) {}

  async login(data: Account.ToLogin): Promise<any> {
    return await this.axiosInstance.axios.post("/auth", data)
  }
}
