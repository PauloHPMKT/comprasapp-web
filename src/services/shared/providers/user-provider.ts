import { HttpAxiosInstance } from "../../api/axios";
import { CreateUserService } from "../../user/data/create-user-service";
import { AxiosUserRepository } from "../../user/infra/repository/axios-repository";

const makeCreateUserProvider = (): CreateUserService => {
  const httpClient = HttpAxiosInstance.getInstance();
  const axiosUserRepository = new AxiosUserRepository(httpClient);

  return new CreateUserService(axiosUserRepository);
}

export {
  makeCreateUserProvider,
}