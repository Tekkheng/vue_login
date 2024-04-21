<script setup>
import Dashboard from '../components/Dashboard_home.vue'
</script>

<template>
  <main>
    <Dashboard :user="$attrs.user" />
  </main>
</template>
