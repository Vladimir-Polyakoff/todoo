<script>
import Field from '@/components/Field'

export default {
  name: 'TheRegister',

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

  methods: {
    register () {
      if (!this.validate()) { return false }

      this.$emit('register', { login: this.login, password: this.password })
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
  <div>
    <field
      label="логин"
      :value="login"
      :error="loginError"
      @input="value => { login = value, loginError = '' }"
    ></field>
    <field
      label="пароль"
      :value="password"
      type="password"
      :error="passwordError"
      @input="value => { password = value, passwordError = '' }"
    ></field>
    <button @click="$router.push({ name: 'login', params: { type: 'auth' } })">Авторизация</button>
    <button @click="register">Регистрация</button>
  </div>
</template>

<style scoped>
  button {
    padding: 6px 10px;
    border-radius: 6px;
    border: none;
    color: #fff;
    background: linear-gradient(to top left, blue, pink);
    margin: 40px 4px;
  }
</style>
