import { HttpAxiosInstance } from "../../api/axios";
import { CreateCategoryService } from "../../category/data/create-category";
import { AxiosCategoryRepository } from "../../category/infra/repository/axios-category-repository";

const makeCreateCategoryService = (): CreateCategoryService => {
  const httpClient = HttpAxiosInstance.getInstance();
  const axiosUserRepository = new AxiosCategoryRepository(httpClient);

  return new CreateCategoryService(axiosUserRepository);
}

export {
  makeCreateCategoryService,
}
