<template>
  <v-layout  style="height: 100%; width: 100%; overflow: hidden">
      <v-layout
        ref="chatPane"
        style="overflow-y: auto;"
        class="message__container pa-2 d-flex justify-start flex-column-reverse"
         id="scroll-target"
      >
          <Message
          v-for="message in messages"
          :key="message._id"
          :message="message"
        />
      </v-layout>
    </v-layout>
</template>

<script>
import { ref, watch, onMounted } from '@vue/composition-api'
// import ComposeMessage from './Composer.vue'
import Message from './Message.vue'

export default {
  components: {
    Message
  },
  props: {
    messages: {
      type: Array,
    }
  },
  setup(props, context) {
    const placeholder = ref('PLACEHOLDER')
    // console.log(props && props.latestQuery)

    // Chat Pane
    const chatPane = ref(null)
    function scrollToBottom() {
      context.root.$nextTick(() => {
        chatPane.value.scrollTop = chatPane.value.scrollHeight
      })
    }
    onMounted(() => {
      watch(
        () => props.messages && props.messages.length,
        () => scrollToBottom()
      )
    })

    const onScroll = (e) => {
      console.log(e.target.scrollTop);
    }

    return {
      placeholder,
      chatPane,
      onScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.message__container{
  height: 100%;

 &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #000000;
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
 
</style>