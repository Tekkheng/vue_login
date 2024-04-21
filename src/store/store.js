import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

const store = createStore({
  state: {
    items: []
  },
  mutations: {
    SET_ITEMS(state, data) {
      state.items = data
    },
    ADD_ITEM(state, newItem) {
      state.items.push(newItem)
    },
    UPDATE_ITEM(state, updatedItem) {
      const index = state.items.findIndex((item) => item.no === updatedItem.no)
      if (index !== -1) {
        state.items.splice(index, 1, updatedItem)
      }
    },
    REMOVE_ITEM(state, noItem) {
      state.items = state.items.filter((item) => item.no !== noItem)
    }
  },
  actions: {
    async fetchItems({ commit }) {
      const response = await axios.get('http://localhost:8000/api/data')
      commit('SET_ITEMS', response.data)
    },
    async addItem({ commit }, newItem) {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/data`,
          JSON.stringify(newItem),
          {
            headers: { 'Content-type': 'application/json' }
          }
        )
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
    },
    async deleteItem({ commit }, noItem) {
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
            const response = await axios.delete(`http://localhost:8000/api/data/${noItem}`)
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
            text: 'Your file has been deleted.',
            icon: 'success'
          })
        }
      })
    },
    async updateItem({ commit }, { noItem, newEditData }) {
      try {
        const response = await axios.put(`http://localhost:8000/api/data/${noItem}`, newEditData)
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
  },
  getters: {
    getAllItems: (state) => state.items,
    getItemById: (state) => (no) => state.items.find((item) => item.no === no)
  }
})

export default store
