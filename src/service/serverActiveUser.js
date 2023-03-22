export const serverActiveUser = {
  get: () => localStorage.getItem('activeUser'),

  set: name => {
    localStorage.setItem('activeUser', name)
  }
}
