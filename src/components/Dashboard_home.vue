<script>
import axios from 'axios'
import Navbar from '../components/NavbarComponent.vue'

export default {
  components: {
    Navbar
  },

  data() {
    return {
      userData: ''
    }
  },
  methods: {
    async getUser() {
      const response = await axios.get(this.$apiURL + '/profile', {
        headers: { Authorization: `Bearer ${this.$attrs.user}` }
      })
      console.log(response.data.data)
      this.userData = response.data.data
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<template>
  <Navbar :user="$attrs.user" />
  <div class="container">
    <h4 class="text-center">Welcomes to Dashboard, {{ userData.nama }}</h4>
  </div>
  <div class="container">
    <div v-if="this.$attrs.user > 0" class="alert alert-success">
      {{ this.$attrs.user }}
    </div>
  </div>
</template>
