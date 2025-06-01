import { HttpAxiosInstance } from "../../api/axios";
import { AuthLoginService } from "../../auth/data/auth-login-service"
import { AxiosAuthRepository } from "../../auth/infra/axios-auth-repository";

const makeRepositoryInstance = (): AxiosAuthRepository => {
  const httpClient = HttpAxiosInstance.getInstance();
  return new AxiosAuthRepository(httpClient);
}

export const makeAuthService = () => {
  const authLoginRepository = makeRepositoryInstance();
  return new AuthLoginService(authLoginRepository)
}
