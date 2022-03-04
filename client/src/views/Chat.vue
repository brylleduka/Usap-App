<template>
  <v-layout column fluid style="height: 100%">
    <v-layout
      fill-height
      class="message d-flex flex-end justify-between flex-column"
      style="padding-top: 2em"
    >
      <v-layout
        ref="chatPane"
        class="message__container pa-3 d-flex justify-start flex-column-reverse"
        id="scroll-target"
      
      >
        <!-- <v-virtual-scroll
          :items="messages"
          :item-height="50"
          height="800"
          :bench="1"
        >
          <template>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Item </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll> -->
        <Message
            v-scroll:#scroll-target="onScrollTop"
            v-for="message in messages"
            :key="message._id"
            :message="message"
          />
    
      </v-layout>
    </v-layout>
    <div v-if="channel">
      <compose-message :channel="channel"></compose-message>
    </div>
  </v-layout>
</template>

<script>
import { useFind } from "feathers-vuex";
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/composition-api";

import Message from "@/components/Message";
import ComposeMessage from "../components/ComposeMessage.vue";
export default {
  components: {
    Message,
    ComposeMessage,
  },
  props: {
    singleChannel: {
      type: Object,
    },
  },
  setup(props, context) {
    const { Message } = context.root.$FeathersVuex.api;
    const ch = ref(null);
    const chatPane = ref(null);
    const channel = computed(() => {
      ch.value = props.singleChannel;
      return ch.value;
    });

    const state = reactive({
      skip: 0,
    });

    // watch(channel, () => {
    //   chid.value = context.root.$route.query.ch;
    //   commid.value = context.root.$route.params.id;
    // });

    // Messages
    const params = (skip = 0) => {
      return {
        query: {
          communityId: props.singleChannel && props.singleChannel.communityId,
          channelId: props.singleChannel && props.singleChannel._id,
          $sort: { createdAt: -1 },
          $limit: 10,
          $skip: skip,
          $limit: 50,
        },
      };
    };
    const messagesParams = computed(() => params(state.skip));

    const { items: messages } = useFind({
      model: Message,
      params: messagesParams,
    });

    function scrollToBottom() {
      context.root.$nextTick(() => {
        chatPane.value.scrollTop = chatPane.value.scrollHeight;
      });
    }
    onMounted(() => {
      watch(
        () => messages.length,
        () => scrollToBottom(),
      );
    });

    const onScrollTop = (e) => {
      let scrollHeight = e.target.scrollHeight;
      let clientHeight = e.target.clientHeight;
      let scrollTop = e.target.scrollTop;
      const scrolled = scrollHeight - (clientHeight - scrollTop);
      const toTop = scrolled <= 1 ? true : false;
      const bottom = scrollTop >= 1 && 0;
      const toBottom = bottom === 0 ? true : false;
      //  console.log("SCROLLED", scrolled);
      // console.log('SCROLL TOP',scrollTop);
      // console.log(scrolled > -scrollTop ? true : false);
      if (toTop) {
        console.log("top");
        //  clientHeight = 700
        // state.skip+=5
      }

      if (toBottom) {
        console.log("bottom", scrollTop);
      }

    
    };
    return {
      messages,
      channel,
      onScrollTop,
    };
  },
};
</script>

<style lang="scss" scoped>
.message__container {
  height: 80vh;
  overflow-y: scroll;
  margin-top: 2em;

  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
  }

  &::-webkit-scrollbar {
    width: 2px;
    background-color: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 2px solid #000000;
  }
}
</style>
