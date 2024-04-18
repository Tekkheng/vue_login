<!-- <script setup>
import axios from 'axios'
import imageSrc from '@/assets/pt_rimba.png'
import { ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')
const message_password = ref('')

const showInput = async ({ email, password }) => {
  // console.log({ email, password })
  window.axios = axios
  window.axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

  if (!email || !password) {
    alert('Email dan kata sandi harus diisi.')
    message_password.value = 'Email dan kata sandi tidak boleh kosong!'
    return
  }
  const data = {
    email: email,
    password: password
  }
  try {
    const response = await axios.post('http://localhost:8000/api/login', data)
    if (response.data.status === 200) {
      alert('login success')
      router.push('/dashboard')
    } else {
      alert('Login gagal. ' + response.data.message)
      message_password.value = 'Login gagal. ' + response.data.message
    }
    console.log(response.data)
  } catch (err) {
    console.error('Login gagal:', err)
    ;(message_password.value = 'Login Failed'), err
    alert('Login gagal. Silakan periksa kembali email dan kata sandi Anda.')
  }
}
</script>

<template>
  <form class="rounded d-flex justify-content-center align-items-center" style="height: 100vh">
    <div
      class="card mt-5 p-5 border border-gray p-5 rounded-2 shadow d-flex justify-content-center align-items-center"
      style="width: 350px"
    >
      <div class="d-flex flex-row">
        <h1 class="fs-5 fw-bold text-center">Form Login</h1>
        <img :src="imageSrc" class="mb-4" alt="" width="40" style="border: 0px solid transparent" />
      </div>

      <div class="mb-4">
        <label for="email" class="form-label">Email: </label>
        <div v-if="message_password.length > 0" class="invalid-feedback" v-html="message_password"></div>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          placeholder="isi Email"
          v-model="email"
          required
          :class="[message_password.length > 0 ? 'is-invalid' : '']"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">Password: </label>
        <input
          type="text"
          id="password"
          name="password"
          class="form-control"
          placeholder="isi Password"
          v-model="password"
          required
        />
      </div>
      <button
        :disabled="!email && !password"
        class="btn btn-success btn-block w-100 mt-3"
        type="submit"
        @click.prevent="showInput({ email, password })"
      >
        Login
      </button>
    </div>
  </form>
</template> -->

<script>
// import imageSrc from '@/assets/pt_rimba.png'
// import { ref } from 'vue'

import axios from 'axios'
// import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      password: '',
      message_email: '',
      message_password: '',
      msg_error: ''
    }
  },
  methods: {
    async submit() {
      // console.log({ email, password })
      window.axios = axios
      window.axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

      if (!this.email) {
        this.message_email = 'Email tidak boleh kosong!'
        return
      } else if (!this.password) {
        this.message_password = 'kata sandi tidak boleh kosong!'
        return
      }
      const data = {
        email: this.email,
        password: this.password
      }
      this.message_email = ''
      this.message_password = ''
      try {
        const response = await axios.post(this.$apiURL + '/login', data)
        console.log(response.data.email)
        if (response.data.status === 200) {
          alert('login success')
          // const userData = {
          //   nama: response.data.nama,
          //   email: response.data.email,
          //   token: response.data.token
          // }
          // console.log(userData)

          localStorage.setItem('user', btoa(JSON.stringify(response.data)))
          // localStorage.setItem('user', userData)
          this.email = ''
          this.password = ''
          this.$router.push('/dashboard')
          this.msg_error = ''
        } else {
          alert('Login gagal. ' + response.data.message)
          this.msg_error = response.data.message
        }
        console.log(response.data)
      } catch (err) {
        console.error('Login gagal:', err)
        alert('Login gagal. Silakan periksa kembali email dan kata sandi Anda.')
        this.msg_error = err
      }
    }
  }
}
</script>

<template>
  <form class="rounded d-flex justify-content-center align-items-center" style="height: 100vh">
    <div
      class="card mt-5 p-5 border border-gray p-5 rounded-2 shadow d-flex justify-content-center align-items-center"
      style="width: 350px"
    >
      <div class="alert alert-danger text-center" v-if="this.msg_error.length > 0">
        {{ this.msg_error }}
      </div>
      <div class="d-flex flex-row align-items-center mb-5">
        <h1 class="fs-5 fw-bold text-center mb-0">Form Login</h1>
        <img src="../assets/pt_rimba.png" alt="Rimba" width="40" class="ms-2" />
      </div>

      <div class="mb-4">
        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          placeholder="Isi Email"
          v-model="email"
          required
          :class="[message_email.length > 0 ? 'is-invalid' : '']"
        />
        <div v-if="message_email.length > 0" class="invalid-feedback" v-html="message_email"></div>
      </div>

      <div class="mb-5">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          placeholder="Isi Password"
          v-model="password"
          required
          :class="{ 'is-invalid': message_password.length > 0 }"
        />
        <div
          v-if="message_password.length > 0"
          class="invalid-feedback"
          v-html="message_password"
        ></div>
      </div>

      <button
        :disabled="!email && !password"
        class="btn btn-success btn-block w-100 mt-3"
        type="submit"
        @click.prevent="submit()"
      >
        Login
      </button>
    </div>
  </form>
</template>
