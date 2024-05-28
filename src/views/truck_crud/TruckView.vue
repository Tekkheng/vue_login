<!-- <script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import TruckStore from '@/store'
import { computed, onMounted, ref } from 'vue'

const plat_no = ref('')
const tipe_truck = ref(null)
const isEdit = ref(false)
const editItemId = ref(null)

const truckItems = computed(() => TruckStore.state.items)

const keepCurrentId = (current_id) => {
  isEdit.value = true
  editItemId.value = current_id
}
console.log(plat_no.value)

const addNewItem = () => {
  const newData = {
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value
  }
  TruckStore.dispatch('addItem', newData)
  plat_no.value = ''
  tipe_truck.value = ''
}

const updatedItem = (noItem) => {
  const newEditData = {
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value
  }
  TruckStore.dispatch('updateItem', { noItem, newEditData })
  editItemId.value = ''
  plat_no.value = ''
  tipe_truck.value = ''
}

const removedItem = (noItem) => {
  TruckStore.dispatch('deleteItem', noItem)
}

onMounted(() => {
  TruckStore.dispatch('fetchItems')
})
</script>

<template>
  <NavbarComponent />
  <div class="container-fluid p-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header d-flex">
            <h4>DATA TRUCK</h4>
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
          </div>

          <div class="card-body">
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
                <tr v-for="(item, index) in truckItems" :key="index">
                  <th scope="row">{{ item.no }}</th>
                  <td>{{ item.plat_no }}</td>
                  <td>{{ item.tipe_truck }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-info me-2 text-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                      @click.prevent="keepCurrentId"
                    >
                      Edit
                    </button>
                    <button class="btn btn-danger" @click.prevent="removedItem(item.no)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
            @click.prevent="updatedItem(editItemId)"
            data-bs-dismiss="modal"
            v-if="isEdit"
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="addNewItem"
            data-bs-dismiss="modal"
            v-else
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script setup>
import useTruckStore from '@/stores/truckStore'

import { onMounted, ref } from 'vue'

// import ColumnGroup from 'primevue/columngroup' // optional
// import Row from 'primevue/row' // optional

const plat_no = ref('')
const tipe_truck = ref(null)
const isEdit = ref(false)
const editItemId = ref(null)

const TruckStore = useTruckStore()

const keepCurrentId = (current_id) => {
  isEdit.value = true
  editItemId.value = current_id
}
console.log(editItemId.value)

const addNewItem = () => {
  const newData = {
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value
  }
  TruckStore.addItem(newData)
  plat_no.value = ''
  tipe_truck.value = ''
}

const updatedItem = (noItem) => {
  const newEditData = {
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value
  }
  TruckStore.updateItem({ noItem, newEditData })
  editItemId.value = ''
  plat_no.value = ''
  tipe_truck.value = ''
}

const removedItem = (noItem) => {
  console.log(noItem)
  TruckStore.deleteItem(noItem)
}

onMounted(async () => {
  await TruckStore.fetchItems()
  console.log(TruckStore.truck)
})
</script>

<template>
  <div class="container-fluid p-3">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <div class="card text-center">
          <div class="card-header d-flex">
            <h4 class="text-success">DATA TRUCK</h4>
            <!-- <span style="display: inline-block; transform: scaleX(-1)">🚚</span> -->
            <button
              type="button"
              class="btn btn-outline-success ms-auto"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
              @click.prevent="isEdit = false"
            >
              <i class="pi pi-plus p-2"></i> Add Data
            </button>
          </div>
          <DataTable
            :value="TruckStore.truck"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            stripedRows
            showGridlines
            tableStyle="min-width: 50rem"
          >
            <TableColumn
              field="no"
              header="No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="plat_no"
              header="Plat No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="truck_type.tipe_truck"
              header="Tipe Truck"
              bodyStyle="overflow: visible;"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <!-- <TableColumn field="no" header="No" style="width: 25%"></TableColumn> -->

            <TableColumn
              bodyStyle="overflow: visible"
              header="Action"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            >
              <template #body="truckValue">
                <button
                  type="button"
                  class="btn btn-outline-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                  @click.prevent="keepCurrentId(truckValue.data.no)"
                >
                  <i class="pi pi-pen-to-square"></i>
                </button>

                <button
                  class="btn btn-outline-danger"
                  @click.prevent="removedItem(truckValue.data.no)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </template>
            </TableColumn>
          </DataTable>
        </div>
        <!-- <div class="card">
          <div class="card-header d-flex">
            <h4>DATA TRUCK</h4>
            <button
              type="button"
              class="btn btn-outline-primary ms-auto"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
              @click.prevent="isEdit = false"
            >
              <i class="pi pi-plus p-2"></i> Add Data
            </button>
          </div>

          <div class="card-body">
            <table class="table table-bordered table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Plat No</th>
                  <th scope="col">Tipe Truck</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in TruckStore.truck" :key="index">
                  <th scope="row">{{ item.no }}</th>
                  <td>{{ item.plat_no }}</td>
                  <td>{{ item.truck_type && item.truck_type.tipe_truck }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                      @click.prevent="keepCurrentId(item.no)"
                    >
                      <i class="pi pi-pen-to-square"></i>
                    </button>

                    <button class="btn btn-outline-danger" @click.prevent="removedItem(item.no)">
                      <i class="pi pi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
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
            @click.prevent="updatedItem(editItemId)"
            data-bs-dismiss="modal"
            v-if="isEdit"
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="addNewItem"
            data-bs-dismiss="modal"
            v-else
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.p-datatable-table th {
  border: 1px solid #dee2e6;
}
.p-datatable-table td {
  border: 1px solid #dee2e6;
}
</style>
