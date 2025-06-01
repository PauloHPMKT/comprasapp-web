import type { Account } from "../../../../types/Account";

export interface HandleLogin {
  execute(data: Account.ToLogin): Promise<any>;
}
