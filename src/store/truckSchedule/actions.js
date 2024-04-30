import Swal from 'sweetalert2'
import axios from 'axios'
import router from '@/router/index'

export const fetchItemsSchedule = async ({ commit }) => {
  const response = await axios.get('truck_schedule')
  commit('SET_SCHEDULE', response.data)
}
export const addItemSchedule = async ({ commit }, newItem) => {
  try {
    const response = await axios.post(`truck_schedule`, JSON.stringify(newItem), {
      headers: { 'Content-type': 'application/json' }
    })
    if (response.status === 200) {
      commit('ADD_SCHEDULE', response.data.data)
      Swal.fire({
        title: 'Success!',
        text: 'Add Data Success!',
        icon: 'success',
        confirmButtonText: 'Okay',
        timer: 1500
      })
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
}
export const deleteItemSchedule = async ({ commit }, noItem) => {
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
          commit('REMOVE_SCHEDULE', noItem)
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
        text: 'Remove Data Truck Schedule Success',
        icon: 'success'
      })
    }
  })
}
export const updateItemSchedule = async ({ commit }, payload) => {
  const { idItem, newEditData } = payload
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
      commit('UPDATE_SCHEDULE', response.data.data)
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
