<script>
import Field from '@/components/Field'

export default {
  name: 'TheAuth',

  components: {
    Field
  },

  data () {
    return {
      login: '',
      password: '',

      loginError: '',
      passwordError: ''
    }
  },

  watch: {
    login () {
      this.loginError = ''
    }
  },

  methods: {
    auth () {
      if (!this.validate()) { return false }

      this.$emit('auth', { login: this.login, password: this.password })
    },

    validate () {
      let isValid = true

      if (!this.login) {
        this.loginError = 'введите логин'
        isValid = false
      }
      if (!this.password.length) {
        this.passwordError = 'введите пароль'
        isValid = false
      }

      return isValid
    }
  }
}
</script>

<template>
  <div class="form">
    <field
      v-model="login"
      label="логин"
      :error="loginError"
    >
    </field>
    <field
      label="пароль"
      :value="password"
      type="password"
      :error="passwordError"
      @input="value => { password = value, passwordError = '' }"
    >
    </field>
    <button @click="auth">Вход</button>
    <button @click="$router.push({ name: 'login', params: { type: 'register' } })">Регистрация</button>
  </div>
</template>

<style scoped lang="scss">
  button {
    padding: 6px 10px;
    border-radius: 6px;
    border: none;
    color: #fff;
    background: linear-gradient(to top left, blue, rgba(255, 192, 203, 0.5));
    margin: 40px 4px;
  }
</style>
