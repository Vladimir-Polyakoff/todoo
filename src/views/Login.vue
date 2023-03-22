<script>
import Auth from '@/components/Auth'
import Register from '@/components/Register'

import Api from '@/service/api'

import { mapMutations } from 'vuex'

export default {
  name: 'TheLogin',
  components: {
    Auth,
    Register
  },

  computed: {
    type () {
      return this.$route.params.type
    }
  },

  methods: {
    ...mapMutations(['setMessage', 'setShowPopup']),

    auth (user) {
      const { status, error } = Api.get.auth(user)

      if (status) {
        this.$router.push('/')
      } else {
        this.setMessage(error)
        this.setShowPopup(true)
      }
    },

    register (user) {
      const { status, error } = Api.post.register(user)

      if (status) {
        this.$router.push('/')
      } else {
        this.setMessage(error)
        this.setShowPopup(true)
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <auth
      v-if="type === 'auth'"
      @auth="auth"></auth>
    <register
      v-if="type === 'register'"
      @register="register"
    ></register>
  </div>
</template>

<style scoped>
  .container {
    padding-inline: 40px;
    max-width: 340px;
    height: 300px;
    background: #cccccc73;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
