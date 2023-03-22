import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '@/views/TodoList'
import Login from '@/views/Login'

import { serverActiveUser } from '@/service/serverActiveUser'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'todo-list',
    component: TodoList,
    // для того чтоб видели только Авторизованные
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login/:type',
    name: 'login',
    component: Login,
    params: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// для того что б без авторизации не попасть в TODO
router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  // console.log('to.matched', to.matched)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (serverActiveUser.get()) {
      next()
      return
    }

    next({ name: 'login', params: { type: 'auth' } })
  } else {
    next()
  }
})

export default router
