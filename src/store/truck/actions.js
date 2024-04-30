import Swal from 'sweetalert2'
import axios from 'axios'

export const fetchItems = async ({ commit }) => {
  const response = await axios.get('data')
  commit('SET_ITEMS', response.data)
}
export const addItem = async ({ commit }, newItem) => {
  console.log(`hoi`, newItem)
  try {
    const response = await axios.post(`data`, JSON.stringify(newItem), {
      headers: { 'Content-type': 'application/json' }
    })
    if (response.status === 200) {
      commit('ADD_ITEM', response.data.data)
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
}
export const deleteItem = async ({ commit }, noItem) => {
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
          commit('REMOVE_ITEM', noItem)
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
}

export const updateItem = async ({ commit }, { noItem, newEditData }) => {
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
      commit('UPDATE_ITEM', response.data.data)
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
