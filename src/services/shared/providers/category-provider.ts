import { HttpAxiosInstance } from "../../api/axios";
import { CreateCategoryService } from "../../category/data/create-category";
import { GetCategoriesService } from "../../category/data/get-categories";
import { AxiosCategoryRepository } from "../../category/infra/repository/axios-category-repository";

const makeRepositoryInstance = (): AxiosCategoryRepository => {
  const httpClient = HttpAxiosInstance.getInstance();
  return new AxiosCategoryRepository(httpClient);
}

const makeCreateCategoryService = (): CreateCategoryService => {
  return new CreateCategoryService(makeRepositoryInstance());
}

const makeGetCategoriesService = (): GetCategoriesService => {
  return new GetCategoriesService(makeRepositoryInstance());
}

export {
  makeCreateCategoryService,
  makeGetCategoriesService
}
