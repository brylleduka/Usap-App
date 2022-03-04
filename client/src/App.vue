<template>
  <v-app id="app">
    <v-layout fill-height>
      <v-container fluid class="pa-0">
        <v-row no-gutters style="height: 100%">
         
            <side-navigation
              :class="$vuetify.breakpoint.mobile ? 'col-0' : 'col-1'"
              v-if="auth.user"
              
            ></side-navigation>
          <v-col :class="$vuetify.breakpoint.mobile ? 'col-12' : 'col-11'">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import SideNavigation from "@/components/SideNavigation";
import router from "@/router";
export default {
  name: "App",
  components: { SideNavigation },
  setup(props, context) {
    const { $store } = context.root;
    const auth = $store.state.auth;
    const state = reactive({
      drawer: false,
    });
    // Redirect to chat page if there's a user, otherwise to login page.
    // watch(
    //   () => $store.state.auth.user,
    //   user => {
    //     const toRouteName = user ? 'Home' : 'Login'
    //     $router.replace({ name: toRouteName })
    //   },
    //   { lazy: true }
    // )

    // Attempt jwt auth when the app mounts.
    onMounted(async () => {
      try {
        await $store.dispatch("auth/authenticate");
      } catch (error) {
        if (!error.message.includes("Could not find stored JWT")) {
          console.error(error);
        }
      }
    });
    return {
      auth,
      state,
    };
  },
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #999999;
  }

  &::-webkit-scrollbar {
    width: 2px;
    background-color: #000000;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border: 2px solid #ffffff;
  }
}
a {
  text-decoration: none;
}
.nav__drawer {
  height: 100%;
  background: #2c2c2c !important;
}
.server__avatar {
  cursor: pointer;
  background-color: rgb(204, 204, 204);
  transition: all 0.2s ease-in-out;

  .icon {
    color: rgb(0, 185, 0);
  }

  &:hover {
    background-color: rgb(0, 185, 0);
    color: #fff;
    border-radius: 10px;
  }
  &.server__add:hover {
    background-color: rgb(0, 185, 0);
    color: #fff;

    .icon {
      color: #fff;
    }
  }
}

.server__overlay {
  position: absolute;
  height: 100%;
  width: 100vw;
  background-color: rgba(77, 77, 77, 0.3);
  display: none;
  justify-content: center;
  align-items: center;

  &.show {
    display: flex;
  }
}
</style>
