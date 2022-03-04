<template>
  <v-form @submit.prevent="register(state)">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            v-model="state.firstname"
            label="First name"
            outlined
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            dense
            v-model="state.lastname"
            outlined
            label="Last name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-layout column>
          <v-container>
            <v-text-field
              v-model="state.email"
              dense
              outlined
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="state.username"
              dense
              outlined
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="state.password"
              dense
              outlined
              label="Password"
              required
              type="password"
            ></v-text-field>

            <v-text-field
              v-model="state.confirmpassword"
              dense
              outlined
              label="Confirm Password"
              type="password"
            ></v-text-field>
          </v-container>
        </v-layout>
      </v-row>

      <v-btn type="submit" block large> Sign up </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
import { notEmptyRules } from "@/utils/validators.js";

export default {
  name: "LoginForm",
  setup(props, context) {
    const { $router } = context.root;
    const { User } = context.root.$FeathersVuex.api;
    const state = reactive({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
    });

    // const username = ref("");
    // const password = ref("");
    // const state = reactive({
    //   firstname: "",
    //   lastname: "",
    //   email: "",
    //   username: "",
    //   password: "",
    //   confirmpassword: "",

    // });

    // const user = ref(new User(state));

    // const registerUser = async () => {
    //   if (!user.value) return;
    //   const result = await user.value.save();
    //   console.log(result);

    // };

    const register = async (userState) => {
      
        const user = ref(new User(userState));
  
        if (!user.value) return;
        await user.value.save();

        state.value = {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            confirmpassword: "",
        };

        $router.push('login')

    };

    return {
      state,
      register,
    };
  },
};
</script>
