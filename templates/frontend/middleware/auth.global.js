import {useAuthStore} from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
        const userStore = useAuthStore()
        if (process.client)
            if (localStorage.getItem('token') != null && !userStore.user) {
                await userStore.initStore()
            }
    }
)


