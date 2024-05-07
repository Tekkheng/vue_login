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
      try {
        const response = await axios.post(`truck_schedule`, JSON.stringify(newItem), {
          headers: { 'Content-type': 'application/json' }
        })
        if (response.status === 200) {
          this.schedule.push(response.data.data)
          // console.log(response.data.data)
          // console.log(setLocalCalendar)
          Swal.fire({
            title: 'Success!',
            text: 'Add Data Success!',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          if (selectInfo) {
            const dataTruck = response.data.data
            const calendarApi = selectInfo.view.calendar
            console.log(dataTruck)
            calendarApi.addEvent({
              id: dataTruck.id,
              title: dataTruck.tipe_truck,
              start: dataTruck.tgl_berangkat,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay,
              extendedProps: {
                truck: dataTruck.plat_no,
                status: 'done'
              }
            })
            return
          }
          // localCalendar
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
    async deleteItemSchedule(noItem, deleteLocalCalendar) {
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
              if (deleteLocalCalendar) {
                deleteLocalCalendar.remove()
              }
              const index = this.schedule.findIndex((schedule) => schedule.id === noItem)
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
      try {
        const response = await axios.put(`truck_schedule/${idItem}`, newEditData)
        if (response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Edit Data Success',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 1500
          })
          const index = this.schedule.findIndex((schedule) => schedule.id === idItem)
          this.schedule.splice(index, 1, response.data.data)
          if (clickInfo) {
            console.log('edit local!')
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
