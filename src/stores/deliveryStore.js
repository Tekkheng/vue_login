import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import router from '../router/index'

export const useDeliveryStore = defineStore('deliveryStore', {
  state: () => ({
    delivery: []
  }),
  getters: {},
  actions: {
    async fetchItemsDelivery() {
      const response = await axios.get('delivery_schedule')
      this.delivery = response.data
    },
    async addItemDelivery(newItem) {
      console.log(this.delivery)
      const isOverlap = this.delivery.some(
        (delivery) =>
          (newItem.plat_no === delivery.plat_no &&
            ((newItem.tgl_berangkat >= delivery.tgl_berangkat &&
              newItem.tgl_berangkat <= delivery.tgl_sampai) ||
              (newItem.tgl_sampai >= delivery.tgl_berangkat &&
                newItem.tgl_sampai <= delivery.tgl_sampai))) ||
          (newItem.plat_no === delivery.plat_no &&
            ((delivery.tgl_berangkat >= newItem.tgl_berangkat &&
              delivery.tgl_berangkat <= newItem.tgl_sampai) ||
              (delivery.tgl_sampai >= newItem.tgl_berangkat &&
                delivery.tgl_sampai <= newItem.tgl_sampai)))
      )

      try {
        if (newItem.tgl_sampai < newItem.tgl_berangkat) {
          Swal.fire({
            title: 'Failed',
            text: `Invalid Input Date!`,
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 4500
          })
          return
        }
        await this.fetchItemsDelivery()
        for (let item of this.delivery) {
          if (newItem.no_delivery == item.no_delivery) {
            Swal.fire({
              title: 'Failed',
              text: `No delivery already exist!`,
              icon: 'error',
              confirmButtonText: 'Okay',
              timer: 4500
            })
            return
          }
        }
        // const isOverlap = false
        if (isOverlap) {
          Swal.fire({
            title: 'Failed',
            text: `Estimasi Delivery pada plat ${newItem.plat_no} tabrakan !`,
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 4500
          })
        } else {
          const response = await axios.post(`delivery_schedule`, JSON.stringify(newItem), {
            headers: { 'Content-type': 'application/json' }
          })
          if (response.status === 200) {
            this.delivery.push(response.data.data)
            Swal.fire({
              title: 'Success!',
              text: 'Add Data Success!',
              icon: 'success',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            // localCalendar
            setTimeout(() => {
              router.push('/deliverySchedule')
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
    async deleteItemDelivery(noItem) {
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
            const response = await axios.delete(`delivery_schedule/${noItem}`)
            if (response.status === 200) {
              console.log('Events:', this.delivery)
              console.log('No item:', noItem)
              const index = this.delivery.findIndex((_event) => _event.id == noItem)
              console.log('Index:', index)

              this.delivery.splice(index, 1)

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
            text: 'Remove Data Delivery Success',
            icon: 'success',
            timer: 4500
          })
        }
      })
    },
    async updateItemDelivery(payload) {
      const { idItem, newEditData } = payload
      // console.log(
      //   `seluruh data eventdrop, ${newEditData.plat_no}, ${newEditData.tipe_truck}, ${newEditData.tgl_berangkat}, ${newEditData.tgl_sampai}, ${idItem}`
      // )

      // console.log(this.delivery)
      // console.log(newEditData, idItem)

      // cek kondisi plat_no pada event === plat_no pada input dan idItem != id eventyglgi diedit dan jika tgl berangkat dan tgl sampai pada event tabrakan dengan input tgl_berangkat dan tgl_sampai maka true

      const isOverlap = this.delivery.some((delivery) => {
        return (
          (newEditData.plat_no === delivery.plat_no &&
            idItem != delivery.id && // Periksa bahwa idItem tidak sama dengan id delivery
            ((newEditData.tgl_berangkat >= delivery.tgl_berangkat &&
              newEditData.tgl_berangkat <= delivery.tgl_sampai) ||
              (newEditData.tgl_sampai >= delivery.tgl_berangkat &&
                newEditData.tgl_sampai <= delivery.tgl_sampai))) ||
          (newEditData.plat_no === delivery.plat_no &&
            idItem != delivery.id &&
            ((delivery.tgl_berangkat >= newEditData.tgl_berangkat &&
              delivery.tgl_berangkat <= newEditData.tgl_sampai) ||
              (delivery.tgl_sampai >= newEditData.tgl_berangkat &&
                delivery.tgl_sampai <= newEditData.tgl_sampai)))
        )
      })

      try {
        if (newEditData.tgl_sampai < newEditData.tgl_berangkat) {
          Swal.fire({
            title: 'Failed',
            text: `Invalid Input Date!`,
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 4500
          })
          return
        }
        await this.fetchItemsDelivery()
        for (let item of this.delivery) {
          if (newEditData.no_delivery == item.no_delivery) {
            Swal.fire({
              title: 'Failed',
              text: `No delivery already exist!`,
              icon: 'error',
              confirmButtonText: 'Okay',
              timer: 4500
            })
            return
          }
        }

        if (isOverlap) {
          Swal.fire({
            title: 'Failed',
            text: `Jadwal Delivery pada plat ${newEditData.plat_no} tabrakan !`,
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 4500
          })
        } else {
          const response = await axios.put(`delivery_schedule/${idItem}`, newEditData)
          if (response.status === 200) {
            Swal.fire({
              title: 'Success',
              text: 'Edit Data Success',
              icon: 'success',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            console.log('Events:', this.delivery)
            console.log('No item:', idItem)
            const index = this.delivery.findIndex((_event) => _event.id == idItem)
            console.log('Index:', index)

            this.delivery.splice(index, 1, response.data.data)
            setTimeout(() => {
              router.push('/deliverySchedule')
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
