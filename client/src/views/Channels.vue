<template>
  <v-layout fill-height column class="d-flex pa-4 channel__container">
    <v-progress-linear
      :active="isPending"
      indeterminate
      color="teal"
    ></v-progress-linear>
    <create-channel></create-channel>

    <v-list
      color="transparent"
      nav
      fluid
      min-width="100%"
      max-width="100%"
      class="ma-0 pa-0"
    >
      <v-list-item-group light>
        <v-list-item
          @click="getChannel(channel, index)"
          v-for="(channel, index) in channels"
          :key="channel._id"
        >
        
          <v-list-item-content>
            <v-list-item-title
              v-text="channel.name"
              class="item__title white--text"
            ></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="deleteChannel(channel._id)">
              <v-icon small color="red lighten-1">mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-layout>
</template>

<script>
import { useFind } from "feathers-vuex";
import { computed, reactive } from "@vue/composition-api";
import CreateChannel from "../components/CreateChannel.vue";

export default {
  components: { CreateChannel },
  setup(props, context) {
    const { Channel } = context.root.$FeathersVuex.api;
    const { emit } = context;
    const state = reactive({
      selectedItem: 0,
    });

    const channelsParams = computed(() => {
      return {
        query: {
          $sort: { createdAt: 1 },
          communityId: context.root.$route.params.id,
        },
      };
    });

    const { items: channels, isPending } = useFind({
      model: Channel,
      params: channelsParams,
    });

    const getChannel = (channel, index) => {
      // localStorage.setItem("selectedItem", index)
      // localStorage.setItem("channelId", channel._id)
      // state.selectedItem = index
      emit("getChannel", channel);
    };

    const deleteChannel = (channelId) => {
      console.log(channelId);
    };

    return {
      state,
      channels,
      getChannel,
      isPending,
      deleteChannel,
    };
  },
};
</script>
