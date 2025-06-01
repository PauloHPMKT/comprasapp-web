import type { Account } from "../../../types/Account";
import type { UserModel } from "../../user/domain/models/create-user";
import type { HandleLogin } from "../domain/protocols/handle-login";
import type { AuthRepository } from "./protocols/auth-repository";

export class AuthLoginService implements HandleLogin {
  constructor(private readonly authLoginRepository: AuthRepository) {}

  async execute(params: Account.ToLogin): Promise<any> {
    const { data, status } = await this.authLoginRepository.login(params);
    const payload: UserModel.Payload = {
      user: data.user,
      token: data.access_token,
    }
    console.log("Login response data:", data, payload);
    if (payload.token) {
      console.log("Setting token in localStorage", payload.token);
      localStorage.setItem("token", JSON.stringify(payload.token));
    }
    return {
      payload,
      status,
    };
  }
}
