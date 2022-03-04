<template>
  <v-form
    ref="form"
    @submit.prevent="createChannel(communityId)"
    @keydown.prevent.enter
    lazy-validation
  >
    <v-text-field  v-model="state.name" dark placeholder="New Channel">
      <v-btn slot="append" icon text type="submit" color="white" small right>
        <v-icon color="green lighten-1"> mdi-plus </v-icon>
      </v-btn>
    </v-text-field>
  </v-form>
</template>

<script>
import { computed, reactive, ref } from "@vue/composition-api";
export default {
  setup(props, context) {
    const { Channel } = context.root.$FeathersVuex.api;

    const comm = ref(null);

    const state = reactive({
      name: "",
    });

     const communityId = computed(() => {
      comm.value = context.root.$route.params.id;
      return comm.value;
    });

    async function createChannel(communityId) {
      if (!state.name) {
        return;
      }
      const channel = new Channel({
        name: state.name,
        communityId,
      });

      const res = await channel.save();
      state.name = ""
    }

    return { communityId, createChannel, state };
  },
};
</script>

<style>
</style>