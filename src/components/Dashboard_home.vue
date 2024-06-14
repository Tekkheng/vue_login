<script setup>
import useAuthStore from '@/stores/authStore'
import { computed, ref, onMounted } from 'vue'

// tammpil pesan login succes pakai toast primevue
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
const toast = useToast()

const authStore = useAuthStore()
const userData = computed(() => authStore.userLoggedin)
// console.log('userData', userData.value.nama)

const successShown = ref(true)
onMounted(() => {
  authStore.fetchUser()
  if (successShown.value) {
    successShown.value = false
    showSuccess()
  }
})

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Login',
    detail: 'Welcome',
    life: 99999999
  })
}
</script>

<template>
  <!-- <Navbar :user="$attrs.user" /> -->
  <Toast style="margin-top: 5rem" />
  <div class="d-flex container justify-content-center align-items-center" style="height: 60vh">
    <h4 class="text-center">Welcomes to Dashboard, {{ userData.nama }}</h4>
  </div>
  <div class="container">
    <!-- <div v-if="this.$attrs.user > 0" class="alert alert-success">
      {{ this.$attrs.user }}
    </div> -->
  </div>
</template>

<style>
.p-toast-message {
  /* background-color: red !important; */
  /* height: 50px; */
}
</style>
