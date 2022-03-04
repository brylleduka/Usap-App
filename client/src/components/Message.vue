<template>
  <div class="message" :class="{ start: currentUser !== message.user._id }">
    <div class="message-wrapper">
      <p class="message-header">
        <strong class="username font-600">{{ message.user.username }}</strong>
        <span class="sent-date font-300">{{ date }}</span>
      </p>
      <p class="message-content font-300">{{ message.text }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const { $store } = context.root;
    const currentUser = $store.state.auth.user._id;

    const date = computed(() => {
      const createdAt = props.message && props.message.createdAt
      return new Date(createdAt).toLocaleString()
    })

    return { currentUser, date };
  },
};
</script>
<style lang="scss" scoped>
.sent-date {
  font-size: 9px;
}
.message {
  display: flex;
  justify-content: flex-end;
  margin: 0 0.5em ;
  margin-bottom: 1.2em;


  .message-wrapper {
    height: auto;
  }
  .message-header {
    display: flex;
    flex-direction: column;
    text-align: start;
  }
}

.start {
  justify-content: flex-start
}


</style>