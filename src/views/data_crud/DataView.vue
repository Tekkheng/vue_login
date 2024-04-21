<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
// import Swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    NavbarComponent
  },
  data() {
    return {
      truck: [],
      plat_no: '',
      tipe_truck: null,
      isEdit: false,
      editItemId: null
    }
  },
  computed: {
    ...mapGetters(['getAllItems', 'getItemById'])
  },
  methods: {
    ...mapActions(['addItem', 'updateItem', 'deleteItem', 'fetchItems']),
    addNewItem() {
      const newData = {
        plat_no: this.plat_no,
        tipe_truck: this.tipe_truck
      }
      this.addItem(newData, this.apiURL)
      this.plat_no = ''
      this.tipe_truck = ''
    },
    updatedItem(noItem) {
      const newEditData = {
        plat_no: this.plat_no,
        tipe_truck: this.tipe_truck
      }
      this.updateItem({ noItem, newEditData })
      this.editItemId = ''
      this.plat_no = ''
      this.tipe_truck = ''
    },
    removedItem(noItem) {
      this.deleteItem(noItem)
    }
    // async getData() {
    //   try {
    //     const response = await axios.get(this.$apiURL + '/data')
    //     console.log(response.data)
    //     this.truck = response.data
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
  },
  mounted() {
    this.fetchItems(this.apiURL)
    console.log('mmountend ni')
    console.log(`hasil ${this.getAllItems}`)
  }
}
</script>

<template>
  <NavbarComponent />
  <div class="container-fluid p-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="d-flex flex-row mb-4">
          <h4>DATA</h4>
          <button
            type="button"
            class="btn btn-primary ms-auto"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
            @click.prevent="isEdit = false"
          >
            Add Data
          </button>
          <!-- <RouterLink :to="{ name: 'add' }" class="nav-link">
            <button class="btn btn-primary ms-2">Add Data</button>
          </RouterLink> -->
        </div>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Plat No</th>
              <th scope="col">Tipe Truck</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in getAllItems" :key="index">
              <th scope="row">{{ item.no }}</th>
              <td>{{ item.plat_no }}</td>
              <td>{{ item.tipe_truck }}</td>
              <td>
                <!-- <RouterLink :to="{ name: 'edit' }" class="nav-link">
                  <button class="btn btn-info me-2 text-light" :id="item.no">Edit</button>
                </RouterLink> -->

                <button
                  type="button"
                  class="btn btn-info me-2 text-light"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                  @click.prevent="(isEdit = true), (editItemId = item.no)"
                >
                  Edit
                </button>
                <button class="btn btn-danger" @click.prevent="removedItem(item.no)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ isEdit ? 'Edit Data' : 'Add Data' }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="plat_no" class="col-form-label">Plat No:</label>
              <input
                type="text"
                class="form-control"
                id="plat_no"
                placeholder="isi plat no"
                v-model="plat_no"
              />
            </div>
            <div class="mb-3">
              <label for="tipe_truck" class="col-form-label">Truck No: </label>
              <input
                type="number"
                class="form-control"
                id="tipe_truck"
                placeholder="isi truck no"
                v-model="tipe_truck"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="addNewItem"
            data-bs-dismiss="modal"
            v-if="!isEdit"
          >
            Add
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="updatedItem(editItemId)"
            data-bs-dismiss="modal"
            v-if="isEdit"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
