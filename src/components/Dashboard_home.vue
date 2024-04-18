<script>
import Navbar from '../components/NavbarComponent.vue'

export default {
  components: {
    Navbar
  },

  data() {
    return {
      // userData: localStorage.getItem('user')
      userData: JSON.parse(atob(localStorage.getItem('user')))
    }
  }
}
// const userData = JSON.parse(atob(localStorage.getItem('user')))
// const userData = localStorage.getItem('user')
// console.log('mydata: ')
</script>

<template>
  <Navbar />
  <div class="container">
    <h4 class="text-center" v-html="'Welcome To Dashboard ' + userData.data.nama"></h4>
  </div>
  <div class="container">
    <div
      v-if="this.$attrs.message_success_post && this.$attrs.message_success_post.length > 0"
      class="alert alert-success"
    >
      {{ this.$attrs.message_success_post }}
    </div>
  </div>
</template>
