<template>
  <v-layout>
    <v-app-bar>
      <v-app-bar-title>Title</v-app-bar-title>
      <v-spacer/>
      <client-only>
        <v-list-item v-if="!auth.getUser" link append-icon="mdi-login" title="Войти" to="/login"></v-list-item>
        <v-list-item v-else link append-icon="mdi-login" title="Выйти" @click.passive="logOut"></v-list-item>
      </client-only>
      <template v-slot:extension>
        <client-only>
          <div v-if="auth.getUser">
            <v-list-item link title="Home" to="/"/>
          </div>
          <v-spacer/>
           <div v-if="auth.getUser && auth.getUser.is_staff">
            <v-list-item link title="Панель управления" to="/dashboard"/>
          </div>
        </client-only>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <slot/>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
const auth = useAuthStore()

async function logOut() {
  await auth.logout()
}

</script>
