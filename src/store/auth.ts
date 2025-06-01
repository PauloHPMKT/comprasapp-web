import { defineStore } from "pinia";
import type { User } from "../services/user/domain/entities/User";
import type { UserModel } from "../services/user/domain/models/create-user";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {} as User,
    token: ""
  }),
  actions: {
    async setUser(params: UserModel.Payload) {
      const { user, token } = params;
      this.currentUser = user;
      this.token = token;

      localStorage.setItem("current-user", JSON.stringify(user));
      return Promise.resolve()
    },

    initializeStore() {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const decode = jwtDecode<{ sub: string } & User>(accessToken);
        console.log("Decoded access token:", decode);
        const user = {
          id: decode.sub,
          name: decode.name,
          email: decode.email,
          avatar: decode.avatar,
          accountId: decode.accountId,
          createdAt: decode.createdAt,
        }
        this.currentUser = user;
      }
    }
  }
})
