<template>
  <v-container fluid class="d-flex justify-center align-center login-container">
    <v-card
      class="pa-8 d-flex flex-column justify-center align-center"
      width="500"
      height="auto"
    >
      <v-main class="pa-4" style="width: 100%" >
        <signup-form ></signup-form>
    
      </v-main>
   <v-btn text to="/login">Log in</v-btn>
          
    </v-card>
  </v-container>
</template>

<script>
import { watch } from '@vue/composition-api'

import route from "@/router"
import SignupForm from '../components/SignupForm.vue';
export default {
  components: {

    SignupForm
  },
  setup(props, context) {
    const { $store, $router } = context.root
    const auth = $store.state.auth
    // Redirect to chat page if there's a user, otherwise to login page.
    watch(
      () => $store.state.auth.user,
      user => {
        const toRouteName = user ? 'Home' : 'Login'
        $router.replace({ name: toRouteName })
      },
      { lazy: true }
    )

    if(auth && auth.user){
      route.push("/")
    }
    return {
      auth
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100%;
}
</style>
