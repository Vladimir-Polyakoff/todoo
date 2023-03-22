import { serverActiveUser } from '@/service/serverActiveUser'

export const serverUser = {
  getList: () => ({
    status: true,
    data: JSON.parse(localStorage.getItem('userList')) || []
  }),

  saveList: list => {
    localStorage.setItem('userList', JSON.stringify(list))
  },

  auth: ({ login, password }) => {
    const { status, data } = serverUser.getList()

    if (!status) { return { staus: false, error: 'ошибка авторизации' } }

    for (const user of data) {
      if (user.login === login && user.password === password) {
        serverActiveUser.set(login)

        return { status: true }
      }
    }

    return { status: false, error: 'не правильный логин или пароль' }
  },

  register: user => {
    const { status, data } = serverUser.getList()

    if (!status) { return { staus: false, error: 'ошибка регистрации' } }

    const existedUser = data.find(({ login }) => login === user.login)

    if (existedUser) {
      return { status: false, error: 'такой пользователь уже существует' }
    }

    serverUser.saveList([...data, user])

    // проверка , есть ли пользователь которого зарегали
    const response = serverUser.getList()

    if (!response.status || !response.data.find(({ login }) => login === user.login)) { return { status: false, error: 'не удалось зарегестрироваться' } }

    serverActiveUser.set(user.login)

    localStorage.setItem(user.login, JSON.stringify([]))

    return { status: true }
  },

  logout: () => {
    serverActiveUser.set('')

    const activeUser = serverActiveUser.get()

    if (!activeUser) {
      return { status: true }
    }

    return { status: false, error: 'Не удалось выйти' }
  }
}
