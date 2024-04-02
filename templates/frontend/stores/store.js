import {defineStore} from 'pinia'

const baseUrl = 'http://127.0.0.1:8000'
export const useBaseStore = defineStore('baseStore', {
    id: 'baseStore',
    state: () => ({
        example: null,
    }),
    actions: {
        async fetchExample() {
            await $fetch(`${baseUrl}/patch/`, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    this.example = response
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    getters: {
        getExample() {
            if (this.example == null) {
                this.fetchExample()
            } else
                return this.example
        },
        baseUrl() {
            return baseUrl
        }
    }
})