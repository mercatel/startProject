import {defineStore} from 'pinia'

const baseUrl = 'http://127.0.0.1:8000'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        async setToken(token, patch) {
            this.token = token
            localStorage.setItem('token', token)
            return navigateTo(patch)
        },
        async initStore() {
            if (localStorage.getItem('token')) {
                this.token = localStorage.getItem('token')
            }
            await this.initUser()
        },
        async initUser() {
            await $fetch(`${baseUrl}/auth/users/me/`, {
                headers: {
                    'Authorization': `JWT ${this.token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    this.user = response
                })
                .catch(error => {
                    console.log(error)
                    this.logout()
                })
        },
        logout() {
            this.user = null
            this.token = ""
            localStorage.removeItem('token')
            return navigateTo('/');
        }
    },
    getters: {
        getUser() {
            return this.user
        },
        baseUrl() {
            return baseUrl
        },
    }
})