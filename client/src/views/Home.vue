<template>
  <v-layout fill-height>
     
    <v-container fluid class="pa-0">
      <v-row no-gutters style="height: 100%">
        <v-col class="col-12">
          <v-layout class="d-flex flex-start flex-wrap py-14 px-2">
            
            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="community in computedCommunities(
                    communities,
                    currentUser,
                  )"
                  :key="community._id"
                  :cols="4"
                >
                  <router-link
                    :to="{ name: 'Community', params: { id: community._id } }"
                  >
                    <v-card>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/plane.jpg"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                      >
                        <v-card-title
                          class="subtitle-1"
                          v-text="community.name"
                        ></v-card-title>
                      </v-img>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </router-link>
                </v-col>
              </v-row>
            </v-container>
          </v-layout>
        </v-col>
     
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { computed } from "@vue/composition-api";
import { useFind } from "feathers-vuex/dist";
export default {
  setup(props, context) {
    const { Community } = context.root.$FeathersVuex.api;
    const { $store } = context.root;
    const currentUser = $store.state.auth.user._id;

    const communitiesParams = computed(() => {
      return {
        query: {
          $sort: { createdAt: 1 },
        },
      };
    });
    const { items: communities, isPending } = useFind({
      model: Community,
      params: communitiesParams,
    });

    const computedCommunities = (communities, owner) => {
      const compComm = computed(() => {
        const community = communities.filter(
          (community) => community.ownerId !== owner,
        );

        return community;
      });

      return compComm.value;
    };

    return {
      communities,
      isPending,
      currentUser,
      computedCommunities,
    };
  },
};
</script>
