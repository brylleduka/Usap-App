<template>
  <v-layout align-center column>
    <v-progress-linear
      :active="isPending"
      indeterminate
      color="teal"
    ></v-progress-linear>
    <v-subheader dark>Community</v-subheader>
    <v-layout align-center column class="scroll">
      <v-list
        v-for="community in computedCommunities(communities, currentUser)"
        :key="community._id"
        nav
        class="title d-flex flex-column justify-center align-center"
        style="padding: 0px"
      >
        <v-list-item class="my-1">
          <v-tooltip right color="black">
            <template v-slot:activator="{ on, attrs }">
              <router-link
                :to="{ name: 'Community', params: { id: community._id } }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a :href="href" :active="isActive" @click="navigate">
                  <v-avatar
                    link
                    class="server__avatar"
                    size="52"
                    v-bind="attrs"
                    v-on="on"
                    :class="[
                      isActive && 'router-link-active',
                      isExactActive && 'router-link-exact-active',
                    ]"
                  >
                    <img
                      v-if="community.icon"
                      :src="community.icon"
                      :alt="community.name"
                    />
                    <span v-else class="white--text">{{
                      toTextAvatar(community.name)
                    }}</span>
                  </v-avatar>
                </a>
              </router-link>
            </template>
            <span>{{ community.name }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-layout>
  </v-layout>
</template>

<script>
import { useFind } from "feathers-vuex";
import { computed } from "@vue/composition-api";
import textavatar from "@/utils/textavatar";
export default {
  props: { welcome: { type: Boolean } },
  setup(props, context) {
    const {  Community } = context.root.$FeathersVuex.api;
    const { $store } = context.root;
    const currentUser = $store.state.auth.user._id;

    // const membersParams = computed(() => {
    //   return {
    //     query: {
    //       $sort: { createdAt: 1 },
    //     },
    //   };
    // });
    // const { items: members, isPending } = useFind({
    //   model: Member,
    //   params: membersParams,
    // });

    const communityParams = computed(() => {
      return {
        query: {
          $sort: { createdAt: 1 },
        },
      };
    });
    const { items: communities, isPending } = useFind({
      model: Community,
      params: communityParams,
    });

    const toTextAvatar = (text) => {
      return textavatar(text);
    };

    const computedCommunities = (communities, owner) => {
      let array = [];
      const compComm = computed(() => {
        communities.forEach((community) => {
          if (community.members && Array.isArray(community.members)) {
            const found = community.members.some(
              (member) => member._id === owner,
            );

            if (found) array.push(community);
          }
        });
        return array;
      });

      return compComm.value;
    };

    return {
      communities,
      toTextAvatar,
      isPending,
      currentUser,
      computedCommunities,

      // resetCommunityChannel
    };
  },
};
</script>

<style scoped lang="scss">
.hide {
  padding: 0px !important;
}
.router-link-active {
  background-color: rgb(0, 185, 0);
  color: #fff;
  border-radius: 10px;
}
.scroll {
  max-height: 250px;
  overflow-y: auto;
}
.scroll::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #000000;
}

.scroll::-webkit-scrollbar {
  width: 2px;
  background-color: #000000;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  border: 2px solid #ffffff;
}
</style>
