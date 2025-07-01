import { defineStore } from 'pinia'
import type { SessionResponesModel } from '~/types/models/authModels'

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
    session: null as SessionResponesModel | null,
    expTime : null as number | null,
    expirationDate : null as number | null,
    refreshTokenTimer : null as ReturnType<typeof setTimeout> | null,
    isLoggingOut: false,
    // İstersen token, user vs. ekleyebilirsin
  }),
  actions: {
    async login(data: any) {
      try {
          const res = await apiRequest('post', '/auth/login', data)
              if(res.data.success){
                  this.authInfo = res.data.data
                  this.isLoggedIn = true
                  const now = new Date();
                  const expTime = new Date(res.data.data.expiresIn);
                  const time2 = (expTime.getTime() - now.getTime()) - 15000;
                  this.expTime = time2;
                  this.expirationDate = new Date().getTime() + time2;
                  await this.getSession();
                  return res;
              }
          } catch (err: any) {
              console.log(err);
            }
    },
    async getSession(){
      try {
        const response = await apiRequest('get', '/auth/session')
        if(response.data.success){
          this.session = response.data.data as SessionResponesModel
        }
      } catch (error) {
        console.log(error);
        
      }
    },
    async setRefreshTokenTime() {
      console.log('çalıştı');
      
      if (!this.session) return;
      if (this.expTime == null) return;
      if (this.expirationDate == null) return;

      const now = Date.now();

      if (now >= this.expirationDate) {
        this.logout();
        return;
      }

      const newTime = this.expirationDate - now;
      if (isNaN(newTime) || newTime <= 0) {
        this.logout();
        return;
      }

      this.expTime = newTime;

      if (this.refreshTokenTimer) {
        clearTimeout(this.refreshTokenTimer);
      }

      this.refreshTokenTimer = setTimeout(async () => {
        console.log('başladı', this.expTime);
        if (this.expTime == null || this.expTime <= 0) {
          return;
        }
        this.refreshToken();
      }, this.expTime);
    },
    async refreshToken(){
        try {
            const response = await apiRequest('get', '/auth/refresh-token')  
            if(response.data.success){
              this.authInfo.accessToken = response.data.data.accessToken
              const now = new Date();
              const expTime = new Date(response.data.data.expiresIn);
              const time2 = (expTime.getTime() - now.getTime()) - 15000;
              this.expTime = time2;
              this.expirationDate = new Date().getTime() + time2;
              await this.setRefreshTokenTime();
            }
        } catch (error) {
          console.log(error);
        }
    },
    async logout() {
      if (this.isLoggingOut) return;
      this.isLoggingOut = true;
      try {
        if(this.session) {
          await apiRequest('get','/auth/logout')
        }
      } catch (err : any) {
        console.log(err);
      } finally {
        this.authInfo = {
          id: null,
          username: null,
          email: null,
          isVerified: false,
          accessToken: null,
          expiresIn : null,
        }
        this.isLoggedIn = false
        this.session = null
        this.expTime = null
        this.expirationDate = null
        this.refreshTokenTimer = null
        this.isLoggingOut = false;
      }
    }
  },
  persist: true
},) 