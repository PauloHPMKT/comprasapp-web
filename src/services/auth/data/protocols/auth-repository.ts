import type { Account } from "../../../../types/Account";

export interface AuthRepository {
  login(data: Account.ToLogin): Promise<any>;
}
