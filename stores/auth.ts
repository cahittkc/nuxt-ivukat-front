import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  
  state: () => ({
    isLoggedIn: false,
    authInfo: {
      id: null,
      username: null,
      email: null,
      isVerified: false,
      accessToken: null,
      expiresIn : null,
    },
    session: null,
    // İstersen token, user vs. ekleyebilirsin
  }),
  actions: {
    login(data: any) {
      this.authInfo = data 
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
      this.authInfo = {
        id: null,
        username: null,
        email: null,
        isVerified: false,
        accessToken: null,
        expiresIn : null,
      }
      this.session = null
    }
  },
  persist: true
},) 