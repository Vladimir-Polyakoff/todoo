import { serverActiveUser } from './serverActiveUser'

export const serverList = {
  getList: () => ({
    status: true,
    data: JSON.parse(localStorage.getItem(serverActiveUser.get())) || []
  }),

  saveList: list => {
    localStorage.setItem(serverActiveUser.get(), JSON.stringify(list))
  },

  createTodo: todo => {
    const { status, data } = serverList.getList()

    if (!status) { return { status: false, error: 'не удалось загрузить todo' } }

    for (const { name, completed } of data) {
      if (name === todo.name && !completed) {
        return { status: false, error: 'такое todo уже существует' }
      }
    }

    serverList.saveList([...data, todo])

    return { status: true }
  },

  toggleStatus: (id, status) => {
    return { status: true }
    // обновление
  },

  editTodo: ({ name, id }) => {
    const { status, data } = serverList.getList()

    if (!status) { return { status: false, error: 'не удалось редактировать todo' } }

    const updatedData = data.map(todo => {
      if (todo.id === id) {
        todo.name = name
      }

      return todo
    })

    serverList.saveList(updatedData)

    return { status: true }
  },

  removeTodos: removeIdsList => {
    const { status, data } = serverList.getList()

    if (!status) { return { status: false, error: 'не удалось удалить todo' } }

    const updatedData = data.filter(({ id }) => !removeIdsList.includes(id))

    serverList.saveList(updatedData)

    return { status: true }
  }
}
