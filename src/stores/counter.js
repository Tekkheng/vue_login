import { defineStore } from 'pinia'

const useTesStore = defineStore('tesStore', {
  state: () => ({
    usersLog: [
      { id: 1, title: 'buy some milk', isFav: false },
      { id: 2, title: 'play ml', isFav: true }
    ],
    name: 'hai'
  }),
  getters: {
    favorite: (state) => state.usersLog.filter((user) => user.isFav),
    favCount: (state) =>
      state.usersLog.reduce(
        (currentValue, user) => (user.isFav ? currentValue + 1 : currentValue),
        0
      ),
    totalCount: (state) => state.usersLog.length
  },
  actions: {
    addUser(newUser) {
      this.usersLog.push(newUser)
    }
  }
})

export default useTesStore
