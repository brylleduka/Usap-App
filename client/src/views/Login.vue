<template>
  <v-container fluid class="d-flex justify-center align-center login-container">
    <v-card
      class="pa-8 d-flex flex-column justify-center align-center"
      width="500"
      height="400"
    >
      <v-main class="pa-4" style="width: 100%" >
        <LoginForm />
    
      </v-main>
   <v-btn text to="/signup">Sign up</v-btn>
          
    </v-card>
  </v-container>
</template>

<script>
import { onMounted, watch } from '@vue/composition-api'
import LoginForm from '@/components/LoginForm';
import route from "@/router"
export default {
  components: {
    LoginForm,
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
