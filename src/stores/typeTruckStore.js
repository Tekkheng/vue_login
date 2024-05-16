import axios from 'axios'
import { defineStore } from 'pinia'
// import Swal from 'sweetalert2'

export const useTypeStore = defineStore('typeStore', {
  state: () => ({
    typeTruck: []
  }),
  getters: {},
  actions: {
    async fetchItemsType() {
      const res = await axios.get('typeTruck')
      this.typeTruck = res.data
    }
  }
})
