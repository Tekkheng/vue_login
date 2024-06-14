<script setup>
// import axios from 'axios'
import imageSrc from '@/assets/pt_rimba.png'
import { reactive, ref } from 'vue'
import useAuthStore from '@/stores/authStore'
// import useTesStore from '@/stores/counter'
// import { useRouter } from 'vue-router'
import InlineMessage from 'primevue/inlinemessage'
import Swal from 'sweetalert2'
// import userDetails from './userDetails.vue'
// import addUser from './addUser.vue'
// const router = useRouter()

let isPasswordVisible = ref(false)
let isLoading = ref(false)
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
  console.log(isPasswordVisible.value)
}

const handleInput = reactive({
  email: '',
  password: '',
  msg_password: '',
  msg_email: '',
  msg_err: ''
})

const authStore = useAuthStore()
// const tesStore = useTesStore()
// console.log(tesStore.usersLog)

const showInput = async () => {
  isLoading.value = true
  const { email, password } = handleInput
  if (!email) {
    handleInput.msg_email = 'Email tidak boleh kosong!'
    handleInput.msg_err = ''
    isLoading.value = false
    return
  } else if (!password) {
    handleInput.msg_password = 'kata sandi tidak boleh kosong!'
    handleInput.msg_err = ''
    isLoading.value = false
    return
  }
  const data = {
    email: email,
    password: password
  }

  const error = await authStore.LoginUser(data)
  if (error) {
    handleInput.msg_err = error
    handleInput.msg_email = ''
    handleInput.msg_password = ''
    isLoading.value = false
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Login Berhasil',
      text: 'Anda telah berhasil login!',
      timer: 1500
    })
    isLoading.value = false
    Object.assign(handleInput, {
      password: '',
      email: '',
      msg_err: '',
      msg_email: '',
      msg_password: ''
    })
  }
}
</script>

<template>
  <form class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div
      class="card mt-5 p-5 border border-gray p-5 rounded-2 shadow d-flex justify-content-center align-items-center"
      style="width: 350px"
    >
      <!-- <span
        v-if="handleInput.msg_err.length > 0"
        class="alert alert-danger text-center position-absolute"
        style="bottom: 25.3rem"
        v-html="handleInput.msg_err"
      ></span> -->
      <InlineMessage
        severity="error"
        class="position-absolute"
        style="bottom: 27rem"
        v-if="handleInput.msg_err.length > 0"
        >{{ handleInput.msg_err }}</InlineMessage
      >
      <div class="d-flex flex-row mt-5 mb-2">
        <h1 class="fs-5 fw-bold text-center">Form Login</h1>
        <img :src="imageSrc" class="mb-4" alt="" width="40" style="border: 0px solid transparent" />
      </div>
      <!-- <div class="mb-4">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-envelope"> </InputIcon>
          <InputText
            type="email"
            id="email"
            name="email"
            class="form-control input-login"
            placeholder="isi Email"
            v-model="handleInput.email"
            required
            :class="[handleInput.msg_email.length > 0 ? 'is-invalid' : '']"
          />
        </IconField>
        <div
          v-if="handleInput.msg_email.length > 0"
          class="invalid-feedback"
          v-html="handleInput.msg_email"
        ></div>
      </div> -->

      <div class="mb-4">
        <label for="email" class="form-label">Email: </label>
        <span class="icon-email">
          <i class="pi pi-envelope"></i>
        </span>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control input-login"
          placeholder="isi Email"
          v-model="handleInput.email"
          required
          :class="[handleInput.msg_email.length > 0 ? 'is-invalid form-control' : 'form-control']"
        />
        <span
          v-if="handleInput.msg_email.length > 0"
          class="invalid-feedback position-absolute"
          v-html="handleInput.msg_email"
        ></span>
      </div>
      <div class="mb-5 mt-2">
        <label for="password" class="form-label">Password: </label>
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          id="password"
          name="password"
          class="form-control input-login"
          placeholder="isi Password"
          v-model="handleInput.password"
          required
          :class="[
            handleInput.msg_password.length > 0 ? 'is-invalid form-control' : 'form-control'
          ]"
        />
        <span class="logoKey">
          <i class="pi pi-key"></i>
        </span>
        <span class="password-toggle" v-show="handleInput.msg_password === ''">
          <i
            @click="togglePasswordVisibility"
            :class="isPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
            id="togglePassword"
          ></i>
        </span>
        <span
          v-if="handleInput.msg_password.length > 0"
          class="invalid-feedback position-absolute"
          v-html="handleInput.msg_password"
        ></span>
      </div>
      <button
        :disabled="(!handleInput.email && !handleInput.password) || isLoading"
        class="btn btn-success text-light btn-block w-100 mt-3"
        type="submit"
        @click.prevent="showInput()"
      >
        Login
      </button>
    </div>
  </form>
  <!-- <div class="container">
    <div class="row mx-auto bg bg-primary w-100 p-5">
      <div class="list" v-if="filterList === 'all'">
        <h1>All List {{ tesStore.totalCount }}</h1>
        <div
          class="col-md-6 bg bg-warning mx-auto"
          v-for="(user, index) in tesStore.usersLog"
          :key="index"
        >
          <userDetails :user="user" />
        </div>
      </div>
      <div class="list" v-if="filterList === 'favs'">
        <h1>FAV List {{ tesStore.favCount }}</h1>
        <div
          class="col-md-6 bg bg-warning mx-auto"
          v-for="(user, index) in tesStore.favorite"
          :key="index"
        >
          <userDetails :user="user" />
        </div>
      </div>
      <div class="list-button">
        <button class="btn btn-primary" @click="filterList = 'all'">All</button>
        <button class="btn btn-primary" @click="filterList = 'favs'">Fav</button>
      </div>
    </div>
    <addUser />
  </div> -->

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

<style>
/* Styling for password toggle icon */
.password-toggle {
  position: absolute;
  top: 20.4rem;
  right: 5.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
}

.logoKey {
  position: absolute;
  top: 20.4rem;
  left: 5.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
}

.icon-email {
  position: absolute;
  top: 14.1rem;
  left: 5.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
}

.input-login {
  /* background-color: red; */
  padding-left: 2rem;
  padding-right: -5rem;
  width: 15rem;
}

/* Styling for icon when password is visible */
.password-toggle.active i {
  color: #007bff; /* Change color as needed */
}
</style>
