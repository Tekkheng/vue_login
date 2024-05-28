import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
// import Swal from 'sweetalert2'

const useAuthStore = defineStore('authStore', {
  state: () => ({
    userLoggedin: []
  }),
  getters: {
    favorite: (state) => state.userLoggedin.filter((user) => user.isFav),
    favCount: (state) =>
      state.userLoggedin.reduce(
        (currentValue, user) => (user.isFav ? currentValue + 1 : currentValue),
        0
      ),
    totalCount: (state) => state.userLoggedin.length
  },
  actions: {
    async fetchUser() {
      try {
        // const response = await axios.get('profile', {
        //   headers: { Authorization: `Bearer ${JSON.parse(atob(localStorage.getItem('user')))}` }
        // })
        const response = await axios.get('profile')
        // console.log(response)
        if (response.status === 200) {
          this.userLoggedin = response.data.data
        } else {
          console.log('Failed get user')
          //   return 'session habis! token berubah, anda harus login ulang!'
        }
      } catch (err) {
        console.log('user token berubah!')
        console.log(err)
        localStorage.removeItem('user')
      }
    },
    async LoginUser(user) {
      try {
        const response = await axios.post('login', user)
        console.log(response)
        if (response.data.status === 200) {
          // manual enkripsi data pakai btoa()
          // localStorage.setItem('user', btoa(JSON.stringify(response.data.token)))

          // tidak perlu enkripsi karna dibackend sudah pakai jwt yg otomatis enkripsi
          localStorage.setItem('user', response.data.token)
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          return response.data.message
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },
    async Logout() {
      try {
        // const response = await axios.delete('logout', {
        //   headers: { Authorization: `Bearer ${JSON.parse(atob(localStorage.getItem('user')))}` }
        // })
        const response = await axios.delete('logout')
        console.log('proses logout', response)
        if (response.status === 200) {
          localStorage.removeItem('user')
          setTimeout(() => {
            router.push({ name: 'login' })
          }, 2000)
        } else {
          return response.data.message
        }
      } catch (err) {
        console.log('hhehe', err)
        return err
      }
    },
    addUser(newUser) {
      this.userLoggedin.push(newUser)
    }
  }
})

export default useAuthStore
