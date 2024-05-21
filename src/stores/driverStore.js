import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import router from '../router/index'

export const useDriverStore = defineStore('driverStore', {
  state: () => ({
    driver: []
  }),
  getters: {},
  actions: {
    async fetchItemsDriver() {
      const response = await axios.get('drivers')
      this.driver = response.data
    },
    async addItemDriver(newItem) {
      console.log(this.driver)
      console.log(newItem)
      try {
        const response = await axios.post(`drivers`, JSON.stringify(newItem), {
          headers: { 'Content-type': 'application/json' }
        })
        if (response.status === 200) {
          this.fetchItemsDriver()
          this.driver.push(response.data.data)
          Swal.fire({
            title: 'Success!',
            text: 'Add Data Success!',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          // localCalendar
          setTimeout(() => {
            router.push('/drivers')
          }, 1500)
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
        console.log(err)
        Swal.fire({
          title: 'Add Data Failed!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    },

    //   deleteLocalCalendar.remove()
    async deleteItemDriver(noItem) {
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
            const response = await axios.delete(`drivers/${noItem}`)
            if (response.status === 200) {
              console.log('Events:', this.driver)
              console.log('No item:', noItem)
              const index = this.driver.findIndex((_event) => _event.id == noItem)
              console.log('Index:', index)

              this.driver.splice(index, 1)

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
              text: err.response,
              icon: 'error',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            console.log(err)
          }
          Swal.fire({
            title: 'Deleted!',
            text: 'Remove Data Driver Success',
            icon: 'success',
            timer: 4500
          })
        }
      })
    },
    async updateItemDriver(payload) {
      const { idItem, newEditData } = payload
      try {
        const response = await axios.put(`drivers/${idItem}`, newEditData)
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Edit Data Success',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          //   console.log('Events:', this.driver)
          //   console.log('No item:', idItem)
          const index = this.driver.findIndex((_event) => _event.id == idItem)
          //   console.log('Index:', index)

          this.driver.splice(index, 1, response.data.data)
          this.fetchItemsDriver()
          setTimeout(() => {
            router.push('/drivers')
          }, 1500)
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
          text: err,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    },

    async updateDriverStatus(idItem, isActive) {
      try {
        console.log(idItem, isActive)
        const response = await axios.put(`driversStatus/${idItem}`, { isActive: isActive })
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Edit Status Success',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          //   this.fetchItemsDriver()
          const driver = this.driver.find((driver) => driver.id === idItem)
          if (driver) {
            driver.isActive = isActive
          }
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
          text: err,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    }
  }
})
