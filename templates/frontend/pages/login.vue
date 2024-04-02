<template>
  <div class="login">
    <form class="form" ref="form" @submit.prevent="logIn">
      <v-text-field v-model="username" type='text'
                    :rules="[v => !!v || 'Обязательное поле']"
                    label="Логин" variant="outlined" required>
      </v-text-field>
      <v-text-field v-model="password" :type="typePassword" autocomplete="on"
                    :rules="[v => !!v || 'Обязательное поле']"
                    label="Пароль" variant="outlined" required>
        <template v-slot:append-inner>
          <v-icon v-if="typePassword==='password'" icon="mdi-eye-off" @click.passive="typePassword='text'"></v-icon>
          <v-icon v-else icon="mdi-eye" @click.passive="typePassword='password'"></v-icon>
        </template>
      </v-text-field>
      <div class="error-messages">
        <div v-for="item in errors">{{ item }}</div>
      </div>
      <v-btn type="submit" variant="tonal" block size="50">Войти</v-btn>
    </form>
    <v-snackbar v-model="snackbar.show" color="red" :timeout="3000">
      <div v-for="item in errors">{{ item }}</div>
    </v-snackbar>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false
})
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const username = ref("")
const password = ref("")
const typePassword = ref("password")
const errors = ref([])
const snackbar = ref({
  show: false,
  text: ''
})

async function logIn() {
  errors.value = []
  await $fetch(`${auth.baseUrl}/auth/jwt/create/`, {
    method: 'POST',
    body: {username: username.value, password: password.value}
  }).then(data => {
    auth.setToken(data.access, route?.query?.path)
  }).catch(error => {
    if (error.response.status === 401) {
      errors.value.push(`Не найдена активная учетная запись с указанными учетными данными`)
    } else {
      errors.value.push(`Что-то пошло не так. Пожалуйста, попробуйте снова'`)
    }
    snackbar.value.show = true
  })
}
</script>
<style scoped lang="scss">

</style>