<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      {{ message }}
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
  </div>
</template>

<script>
import Pusher from 'pusher-js';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      pusher: null,
      privateChannel: null,
    };
  },
  created() {
    this.pusher = new Pusher('556f5cee277b4c7c22d7', {
      cluster: 'eu',
      encrypted: true,
      authEndpoint: `http://akry.moltaqadev.com/api/pusher/auth`,
      auth: {
        headers: {
          Authorization: 'Bearer 104|mVnSzPaVQztAv3aD6BqcEpq6k7473SmKKSS8mEO8', // Change to your access token
        },
      },
      debug: true,
    });

    this.pusher.connection.bind('connected', () => {
      console.log('Connected to Pusher');
    });

    this.privateChannel = this.pusher.subscribe('private-my-channel.3');


    this.privateChannel.bind('pusher:subscription_succeeded', () => {
      console.log('Subscription to private channel succeeded.');
    });

    this.privateChannel.bind('pusher:subscription_error', (status) => {
      console.error('Subscription error:', status);
    });

    this.privateChannel.bind('my-event', (data) => {
      this.messages.push(data);
      console.log(data)
      console.log('Channel subscribed successfully!');
    });
  },
  methods: {
    sendMessage() {
      const messageData = {
        id: Date.now(),
        text: this.newMessage,
      };
      this.messages.push(this.newMessage);
      this.newMessage = '';

      this.privateChannel.trigger('client-new-message', this.newMessage);
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>