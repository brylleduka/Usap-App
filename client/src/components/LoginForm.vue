<template>
  <v-form
    v-model="user.valid"
    fluid
    lazy-validation
    @submit.prevent="onSubmit(user.username, user.password)"
    @keydown.prevent.enter
  >
     <!-- <div v-if="user.error" class="error">
          {{ user.error }}
      </div> -->
    <v-text-field
      v-model="user.username"
      label="Username"
      placeholder="example123"
      outlined
      required
      :rules="notEmptyRules"
    ></v-text-field>
  {{user.error.message}}
    <v-text-field
      v-model="user.password"
      label="Password"
      placeholder="*********"
      type="password"
      :rules="notEmptyRules"
      outlined
      required
    ></v-text-field>

    <v-btn type="submit" block large>
      Login
    </v-btn>
  </v-form>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
import { notEmptyRules } from '@/utils/validators.js';

export default {
  name: "LoginForm",
  setup(props, context) {
    const { $store } = context.root;

    // const username = ref("");
    // const password = ref("");
    const user = reactive({
      username: '',
      password: '',
      valid: true,
      error: ''
    })

    // const error = ref(null);
    // function dismissError() {
    //   error.value = null;
    // }

  const onSubmit = async (username, password) => {
      try {
          if (user.valid) 
             await $store.dispatch("auth/authenticate", { strategy: "local", username, password });
      } catch (err) {
         
          // Convert the error to a plain object and add a message.
          console.log(err);
          let type = err.className;
          err = Object.assign({}, err);
          err.message =
            type === "not-authenticated"
              ? "Incorrect username or password."
              : "An error prevented login.";
            // user.error = (err);
      }
      // $store
      //   .dispatch("auth/authenticate", { strategy: "local", username, password })
      //   // Just use the returned error instead of mapping it from the store.
      //   .catch(err => {
        
      //   });
    }

    return {
     user,
      onSubmit,
      notEmptyRules,
    };
  }
};
</script>
