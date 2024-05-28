import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

// membuat setiap request axios memiliki header bearer token yg diambil dari localstorage, yg dimana data localstorage di set ketika user login
axios.interceptors.request.use(
  (config) => {
    // console.log(config.url)

    // Kecualikan route /login dan /register
    if (config.url !== 'login' && config.url !== 'register') {
      //   const token = JSON.parse(atob(localStorage.getItem('user')))
      // tidak perlu enkripsi menggunakan atob() karena sudah pakai jwt di backend otomatis enkripsi
      const token = localStorage.getItem('user') // Ambil token dari localstorage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
