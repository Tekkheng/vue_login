import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

const useTruckStore = defineStore('truckStore', {
  state: () => ({
    truck: []
  }),
  getters: {},
  actions: {
    async fetchItems() {
      const response = await axios.get('data')
      this.truck = response.data
    },
    async addItem(newItem) {
      console.log(`hoi`, newItem)
      try {
        const response = await axios.post(`data`, JSON.stringify(newItem), {
          headers: { 'Content-type': 'application/json' }
        })
        if (response.status === 200) {
          this.truck.push(response.data.data)
          await this.fetchItems()
          Swal.fire({
            title: 'Success!',
            text: 'Add Data Success!',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
        } else {
          Swal.fire({
            title: 'Failed',
            text: 'Add Data Failed!',
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 1500
          })
        }
      } catch (err) {
        Swal.fire({
          title: 'Add Data Failed!',
          text: err.response.data,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    },
    async deleteItem(noItem) {
      console.log('tes')
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`data/${noItem}`)
            if (response.status === 200) {
              const index = this.truck.findIndex((truck) => truck.no === noItem)
              if (index !== -1) {
                this.truck.splice(index, 1)
              }
              Swal.fire({
                title: 'Success!',
                text: 'Remove Data Success!',
                icon: 'success',
                confirmButtonText: 'Okay',
                timer: 1500
              })
            } else {
              Swal.fire({
                title: 'Failed',
                text: 'Remove Data Failed!',
                icon: 'error',
                confirmButtonText: 'Okay',
                timer: 1500
              })
            }
          } catch (err) {
            Swal.fire({
              title: 'Failed',
              text: err.response.data.tipe_truck,
              icon: 'error',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            console.log(err)
          }
          Swal.fire({
            title: 'Deleted!',
            text: 'Remove Data Truck Success',
            icon: 'success'
          })
        }
      })
    },

    async updateItem({ noItem, newEditData }) {
      try {
        const response = await axios.put(`data/${noItem}`, newEditData)
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Edit Data Success',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          const index = this.truck.findIndex((item) => item.no === noItem)
          if (index !== -1) {
            this.truck.splice(index, 1, response.data.data)
          }
          await this.fetchItems()
        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'Edit Data Failed',
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 1500
          })
        }
      } catch (err) {
        console.log(err)
        Swal.fire({
          title: 'Failed',
          text: err.response.data,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    }
  }
})

export default useTruckStore
