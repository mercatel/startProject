import {useAuthStore} from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
        const userStore = useAuthStore()
        if (process.client)
            if (to?.name !== 'login' && !localStorage.getItem('token'))
                return navigateTo({
                    path: '/login',
                    query: {
                        path: to?.path
                    }
                });
            else if (to?.name !== 'login' && localStorage.getItem('token') != null && !userStore.user) {
                await userStore.initStore()
            }
    }
)


