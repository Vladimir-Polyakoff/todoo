<template>
  <div class="container" v-if="getShowPopup">
    <div class="popup" @click.stop>
      {{ message }}
      <span class="close" @click="setShowPopup(false)">X</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ThePopup',

  data () {
    return {
      prewShowPopupValue: false
    }
  },

  computed: {
    ...mapGetters(['getShowPopup']),

    // без импорта вызвать на прямую
    message () {
      return this.$store.state.message
    }
  },

  mounted () {
    document.addEventListener('click', this.hidePopup)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hidePopup)
  },

  methods: {
    ...mapMutations(['setShowPopup']),

    hidePopup () {
      this.prewShowPopupValue && this.getShowPopup && this.setShowPopup(false)
      this.prewShowPopupValue = this.getShowPopup
    }
  }
}
</script>

<style scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: linear-gradient(to top right, rgba(0, 0, 255, 0.4),pink);
    z-index: 1;
  }
  .popup {
    position: absolute;
    top: 25%;
    left: 50%;
    padding: 8px;
    transform: translate(-50%, -50%);
    height: 200px;

    background: linear-gradient(to top right, blue, rgb(255, 192, 203));
    color: #fff;
    font-size: 20px;
    text-transform: uppercase;word-wrap: break-word;
    border-radius:8px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close {
    position: absolute;
    color: #fff;
    top: 8px;
    right: 16px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
</style>
