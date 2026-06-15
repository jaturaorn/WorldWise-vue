import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { user: null, password: null, isAuthenticated: false };
  },

  actions: {
    login(user, password) {
      this.user = user;
      this.password = password;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
