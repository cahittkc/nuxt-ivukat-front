import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  
  state: () => ({
    isLoggedIn: false,
    authInfo : null,
    // İstersen token, user vs. ekleyebilirsin
  }),
  actions: {
    login(data: any) {
      this.authInfo = data 
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
    }
  },
  persist : true
}) 