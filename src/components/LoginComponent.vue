<script setup>
import axios from 'axios'
import imageSrc from '@/assets/pt_rimba.png'
// import bamboo from '@/assets/bamboo.png'
// import bg_bamboo from '@/assets/bg_bamboo.png'
// import { RouterLink } from 'vue-router'
import { reactive } from 'vue'

import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const handleInput = reactive({
  email: '',
  password: '',
  msg_password: '',
  msg_email: '',
  msg_err: ''
})

const showInput = async () => {
  // window.axios = axios
  // window.axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
  const { email, password } = handleInput
  if (!email) {
    handleInput.msg_email = 'Email tidak boleh kosong!'
    handleInput.msg_err = ''
    return
  } else if (!password) {
    handleInput.msg_password = 'kata sandi tidak boleh kosong!'
    return
  }
  const data = {
    email: email,
    password: password
  }
  try {
    const response = await axios.post('login', data)
    console.log(response.data.message)
    if (response.data.status === 200) {
      Swal.fire({
        title: 'Success!',
        text: 'Login Success!',
        icon: 'success',
        confirmButtonText: 'Okay',
        timer: 1500
      })

      Object.assign(handleInput, {
        password: '',
        email: '',
        err: ''
      })

      localStorage.setItem('user', btoa(JSON.stringify(response.data.token)))
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else {
      Object.assign(handleInput, {
        msg_err: 'Login gagal. ' + response.data.message,
        msg_password: '',
        msg_email: ''
      })
    }
    console.log(response.data)
  } catch (err) {
    console.error('Login gagal:', err)
    handleInput.msg_err = 'Login gagal:' + err
  }
}
</script>

<template>
  <form class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div
      class="card mt-5 p-5 border border-gray p-5 rounded-2 shadow d-flex justify-content-center align-items-center"
      style="width: 350px"
    >
      <div
        v-if="handleInput.msg_err.length > 0"
        class="alert alert-danger text-center"
        v-html="handleInput.msg_err"
      ></div>
      <div class="d-flex flex-row">
        <h1 class="fs-5 fw-bold text-center">Form Login</h1>
        <img :src="imageSrc" class="mb-4" alt="" width="40" style="border: 0px solid transparent" />
      </div>

      <div class="mb-4">
        <label for="email" class="form-label">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          placeholder="isi Email"
          v-model="handleInput.email"
          required
          :class="[handleInput.msg_email.length > 0 ? 'is-invalid' : '']"
        />
        <div
          v-if="handleInput.msg_email.length > 0"
          class="invalid-feedback"
          v-html="handleInput.msg_email"
        ></div>
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">Password: </label>
        <input
          type="text"
          id="password"
          name="password"
          class="form-control"
          placeholder="isi Password"
          v-model="handleInput.password"
          required
          :class="[handleInput.msg_password.length > 0 ? 'is-invalid' : '']"
        />
        <div
          v-if="handleInput.msg_password.length > 0"
          class="invalid-feedback"
          v-html="handleInput.msg_password"
        ></div>
      </div>
      <button
        :disabled="!handleInput.email && !handleInput.password"
        class="btn btn-success btn-block w-100 mt-3"
        type="submit"
        @click.prevent="showInput()"
      >
        Login
      </button>
    </div>
  </form>

  <!-- <form action="">
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh">
      <div class="row w-100">
        <div class="col-md-6">
          <img :src="bg_bamboo" alt="gambar rimba" width="100%" />
        </div>
        <div class="col-md-6 p-5">
          <div class="card bg bg-transparent border border-light align-items-center p-5">
            <img :src="bamboo" alt="gambar rimba" width="150px" />
            <div class="mb-4 p-2 d-block w-100 form-control">
              <input
                type="text"
                placeholder="Name"
                class="form-control border border-light"
                id="name"
              />
              <br />
              <div class="d-flex">
                <input
                  type="password"
                  placeholder="Password"
                  class="form-control border border-light"
                  id="password"
                />
                <button class="btn btn-transparent">*</button>
              </div>
            </div>
            <div class="mb-4">
              <RouterLink :to="{ name: 'dashboard' }" class="nav-link text-warning"
                >Forget Password?</RouterLink
              >
            </div>
            <button class="btn btn-warning d-block w-100 text-light" @click.prevent="showInput">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template> -->

  <!-- <script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      email: '',
      password: '',
      message_email: '',
      msg_password: '',
      msg_error: ''
    }
  },
  methods: {
    async submit() {
      window.axios = axios
      window.axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

      if (!this.email) {
        this.message_email = 'Email tidak boleh kosong!'
        return
      } else if (!this.password) {
        this.msg_password = 'kata sandi tidak boleh kosong!'
        return
      }
      const data = {
        email: this.email,
        password: this.password
      }
      this.message_email = ''
      this.msg_password = ''
      try {
        const response = await axios.post(this.$apiURL + '/login', data)
        console.log(response.data.email)
        if (response.data.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Login Success!',
            icon: 'success',
            confirmButtonText: 'Cool',
            timer: 1500
          })

          localStorage.setItem('user', btoa(JSON.stringify(response.data.token)))
          this.email = ''
          this.password = ''
          this.$router.push('/dashboard')
          this.msg_error = ''
        } else {
          this.msg_error = response.data.message
        }
        console.log(response.data)
      } catch (err) {
        console.error('Login gagal:', err)
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
          :class="{ 'is-invalid': msg_password.length > 0 }"
        />
        <div
          v-if="msg_password.length > 0"
          class="invalid-feedback"
          v-html="msg_password"
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
</template> -->
</template>
