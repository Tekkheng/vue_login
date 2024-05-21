import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import router from '@/router'

export const useScheduleStore = defineStore('scheduleStore', {
  state: () => ({
    schedule: []
  }),
  getters: {},
  actions: {
    async fetchItemsSchedule() {
      const response = await axios.get('truck_schedule')
      this.schedule = response.data
    },
    async addItemSchedule(newItem, selectInfo) {
      console.log(this.schedule)
      // const calendarApi = selectInfo.view.calendar
      // console.log(calendarApi)
      // console.log(newItem)

      // cek kondisi plat_no pada event === plat_no pada input dan jika tgl berangkat dan tgl sampai pada event tabrakan dengan input tgl_berangkat dan tgl_sampai maka true
      console.log(this.schedule)
      const isOverlap = this.schedule.some(
        (schedule) =>
          (newItem.plat_no === schedule.plat_no &&
            ((newItem.tgl_berangkat >= schedule.tgl_berangkat &&
              newItem.tgl_berangkat <= schedule.tgl_sampai) ||
              (newItem.tgl_sampai >= schedule.tgl_berangkat &&
                newItem.tgl_sampai <= schedule.tgl_sampai))) ||
          (newItem.plat_no === schedule.plat_no &&
            ((schedule.tgl_berangkat >= newItem.tgl_berangkat &&
              schedule.tgl_berangkat <= newItem.tgl_sampai) ||
              (schedule.tgl_sampai >= newItem.tgl_berangkat &&
                schedule.tgl_sampai <= newItem.tgl_sampai)))
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
        if (isOverlap) {
          Swal.fire({
            title: 'Failed',
            text: `Jadwal Truck pada plat ${newItem.plat_no} tabrakan !`,
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 4500
          })
        } else {
          const response = await axios.post(`truck_schedule`, JSON.stringify(newItem), {
            headers: { 'Content-type': 'application/json' }
          })
          if (response.status === 200) {
            // terpaksa pakai fetchItemsSchedule karena this.schedule.push ke local data response.data.data tidak memiliki data dri relasi table field driverName
            this.fetchItemsSchedule()
            this.schedule.push(response.data.data)
            Swal.fire({
              title: 'Success!',
              text: 'Add Data Success!',
              icon: 'success',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            // if (selectInfo) {
            //   const dataTruck = response.data.data
            //   console.log(dataTruck)
            //   console.log(current_events)
            //   calendarApi.addEvent({
            //     id: dataTruck.id,
            //     title: dataTruck.tipe_truck,
            //     start: dataTruck.tgl_berangkat,
            //     end: selectInfo.endStr,
            //     allDay: selectInfo.allDay,
            //     extendedProps: {
            //       truck: dataTruck.plat_no,
            //       status: 'done'
            //     }
            //   })
            //   return
            // }
            // localCalendar
            if (selectInfo) {
              return
            }
            setTimeout(() => {
              router.push('/schedules')
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
          text: err.response.data,
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1500
        })
      }
    },

    //   deleteLocalCalendar.remove()
    async deleteItemSchedule(noItem) {
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
            const response = await axios.delete(`truck_schedule/${noItem}`)
            if (response.status === 200) {
              console.log('Events:', this.schedule)
              console.log('No item:', noItem)
              const index = this.schedule.findIndex((_event) => _event.id == noItem)
              console.log('Index:', index)

              this.schedule.splice(index, 1)

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
            text: 'Remove Data Truck Schedule Success',
            icon: 'success'
          })
        }
      })
    },
    async updateItemSchedule(payload) {
      const { idItem, newEditData, clickInfo } = payload
      // console.log(
      //   `seluruh data eventdrop, ${newEditData.plat_no}, ${newEditData.tipe_truck}, ${newEditData.tgl_berangkat}, ${newEditData.tgl_sampai}, ${idItem}`
      // )

      // console.log(this.schedule)
      // console.log(newEditData, idItem)

      // cek kondisi plat_no pada event === plat_no pada input dan idItem != id eventyglgi diedit dan jika tgl berangkat dan tgl sampai pada event tabrakan dengan input tgl_berangkat dan tgl_sampai maka true
      const isOverlap = this.schedule.some((schedule) => {
        return (
          (newEditData.plat_no === schedule.plat_no &&
            idItem != schedule.id && // Periksa bahwa idItem tidak sama dengan id schedule
            ((newEditData.tgl_berangkat >= schedule.tgl_berangkat &&
              newEditData.tgl_berangkat <= schedule.tgl_sampai) ||
              (newEditData.tgl_sampai >= schedule.tgl_berangkat &&
                newEditData.tgl_sampai <= schedule.tgl_sampai))) ||
          (newEditData.plat_no === schedule.plat_no &&
            idItem != schedule.id &&
            ((schedule.tgl_berangkat >= newEditData.tgl_berangkat &&
              schedule.tgl_berangkat <= newEditData.tgl_sampai) ||
              (schedule.tgl_sampai >= newEditData.tgl_berangkat &&
                schedule.tgl_sampai <= newEditData.tgl_sampai)))
        )
      })

      // const isOverlap = false
      try {
        if (newEditData.tgl_sampai < newEditData.tgl_berangkat) {
          Swal.fire({
            title: 'Failed',
            text: `Invalid Input Date!`,
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 4500
          })
          if (clickInfo.revert) {
            clickInfo.revert()
          }
          return
        }
        if (isOverlap) {
          Swal.fire({
            title: 'Failed',
            text: `Jadwal Truck pada plat ${newEditData.plat_no} tabrakan !`,
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 4500
          })
          if (clickInfo.revert) {
            clickInfo.revert()
          }
        } else {
          const response = await axios.put(`truck_schedule/${idItem}`, newEditData)
          if (response.status === 200) {
            Swal.fire({
              title: 'Success',
              text: 'Edit Data Success',
              icon: 'success',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            // console.log('Events:', this.schedule)
            // console.log('No item:', idItem)

            // terpaksa pakai fetchItemsSchedule karena this.schedule.push ke local data response.data.data tidak memiliki data dri relasi table field driverName
            this.fetchItemsSchedule()
            const index = this.schedule.findIndex((_event) => _event.id == idItem)
            // console.log('Index:', index)

            this.schedule.splice(index, 1, response.data.data)
            // const index = this.schedule.findIndex((schedule) => schedule.id === idItem)
            // this.schedule.splice(index, 1, response.data.data)
            // if (clickInfo) {
            //   const dataTruck = response.data.data
            //   const calendarApi = clickInfo.view.calendar
            //   console.log('ini ', dataTruck)
            //   calendarApi.getEventById(dataTruck.id).setProps({
            //     title: dataTruck.tipe_truck,
            //     start: dataTruck.tgl_berangkat,
            //     end: clickInfo.endStr,
            //     allDay: clickInfo.allDay,
            //     extendedProps: {
            //       truck: dataTruck.plat_no,
            //       status: 'done'
            //     }
            //   })
            //   return
            // }
            if (clickInfo) {
              return
            }

            setTimeout(() => {
              router.push('/schedules')
            }, 1500)
          } else {
            Swal.fire({
              title: 'Failed!',
              text: 'Edit Data Failed',
              icon: 'error',
              confirmButtonText: 'Okay',
              timer: 1500
            })
            if (clickInfo.revert) {
              clickInfo.revert()
            }
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
        if (clickInfo.revert) {
          clickInfo.revert()
        }
      }
    }
  }
})
