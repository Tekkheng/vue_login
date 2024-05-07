<script setup>
import { ref } from 'vue'
import useTesStore from '@/stores/counter'

const title = ref('')
const tesStore = useTesStore()
const handleSubmit = () => {
  tesStore.addUser({
    id: Math.floor(Math.random() * 10000),
    title: title.value,
    isFav: false
  })
  title.value = ''
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div class="row bg bg-success mx-auto">
      <div class="col-md-6">
        <label for="">Title: </label>
        <input type="text" placeholder="isi title" v-model="title" />
      </div>
    </div>
    <button class="btn btn-danger" type="submit">add</button>
  </form>
</template>

<style lang="scss" scoped></style>
