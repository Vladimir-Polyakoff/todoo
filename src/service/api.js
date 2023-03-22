import { serverList } from '@/service/serverList'
import { serverUser } from '@/service/serverUser'

export default {
  get: {
    list: () => serverList.getList(),

    auth: user => serverUser.auth(user),
    logout: () => serverUser.logout()
  },

  post: {
    todo: todo => serverList.createTodo(todo),

    register: user => serverUser.register(user)
  },

  patch: {
    status: (id, status) => serverList.toggleStatus(id, status),
    todo: editingTodo => serverList.editTodo(editingTodo)
  },

  delete: {
    todos: removeIdsList => serverList.removeTodos(removeIdsList)
  }
}
