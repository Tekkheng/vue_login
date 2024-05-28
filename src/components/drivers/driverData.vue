<script setup>
import { onMounted } from 'vue'
import { useDriverStore } from '@/stores/driverStore'
import useTruckStore from '@/stores/truckStore'
const driverStore = useDriverStore()

// const activeTruck = ref(null)
const truckStore = useTruckStore()
// const tipe_driver_truck_string = ref('')
const removedItem = (noItem) => {
  driverStore.deleteItemDriver(noItem)
}
// const isActive = ref(true)

const toggleDriverStatus = (noItem, isActive) => {
  driverStore.updateDriverStatus(noItem, isActive)
  // isActive.value = !isActive.value
  // console.log(isActive.value)
}

// const getStatusLabel = (status) => {
//   console.log(status)
//   switch (status) {
//     case 1:
//       alert('1')
//       return 'success'

//     case 0:
//       alert('0')
//       return 'warning'

//     default:
//       return null
//   }
// }

onMounted(async () => {
  await truckStore.fetchItems()
  await driverStore.fetchItemsDriver()

  console.log(driverStore.driver)
  console.log(truckStore.truck[0].tipe_truck)

  const tipe_driver_truck_string = truckStore.truck.find(
    (truck) => truck.tipe_truck == driverStore.driver.tipe_driver_truck
  )
  console.log(tipe_driver_truck_string)

  // for (let driver of driverStore.driver) {
  //   console.log(driver)
  //   if (driver.isActive) {
  //     activeTruck.value = 'Available'
  //   } else {
  //     activeTruck.value = 'Suspended'
  //   }
  // }
  // console.log(driverStore)
})
</script>

<template>
  <div class="container-fluid p-3">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="text-success">Drivers Data</h4>
            <RouterLink :to="{ name: 'addDriver' }" class="nav-link">
              <button class="btn btn-outline-success">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Driver
              </button>
            </RouterLink>
          </div>
          <DataTable
            :value="driverStore.driver"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            stripedRows
            showGridlines
            tableStyle="min-width: 50rem"
          >
            <TableColumn
              field="id"
              header="No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="nama_driver"
              header="Nama Drivers"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="truck_type.tipe_truck"
              header="Tipe Truck"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>

            <TableColumn
              header="IsActive"
              bodyStyle="overflow: visible;"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            >
              <template #body="{ data }">
                <span
                  class="p p-2 rounded text-light d-block w-100 text-center"
                  :class="data.isActive ? 'bg bg-success' : 'bg bg-danger'"
                  >{{ data.isActive ? 'Available' : 'Suspended' }}</span
                >
              </template>
            </TableColumn>

            <TableColumn
              bodyStyle="overflow: visible"
              header="Action"
              class="d-flex"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            >
              <template #body="{ data }">
                <RouterLink
                  :to="{ name: 'editDriver', params: { id: data.id } }"
                  class="nav-link me-2"
                >
                  <button class="btn btn-outline-primary d-block">
                    <i class="pi pi-pen-to-square"></i>
                  </button>
                </RouterLink>
                <button
                  class="btn btn-outline-secondary d-block me-2"
                  @click.prevent="toggleDriverStatus(data.id, !data.isActive)"
                >
                  <i class="pi pi-exclamation-circle"></i>
                </button>
                <button
                  class="btn btn-outline-danger d-block me-2"
                  @click.prevent="removedItem(data.id)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </template>
            </TableColumn>
          </DataTable>

          <!-- <div class="card-header d-flex justify-content-between">
            <h4>Drivers Data</h4>
            <RouterLink :to="{ name: 'addDriver' }" class="nav-link">
              <button class="btn btn-outline-primary">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Driver
              </button>
            </RouterLink>
          </div>
          <table class="table table-bordered table-hover">
            <thead>
              <tr class="text-center">
                <th scope="col">No</th>
                <th scope="col">Nama Driver</th>
                <th scope="col">Tipe Driver Truck</th>
                <th scope="col">IsActive</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in driverStore.driver" :key="index" class="text-center">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.nama_driver }}</td>
                <td>{{ item.truck_type && item.truck_type.tipe_truck }}</td>
                <td class="text-light" v-if="item.isActive">
                  <h5 class="bg bg-success rounded text-light p-2">Available</h5>
                </td>
                <td class="text-light justify-content-center align-items-center" v-else>
                  <h5 class="bg bg-danger rounded text-light p-2">Suspended</h5>
                </td>

                <td class="d-flex justify-content-center align-items-center">
                  <RouterLink
                    :to="{ name: 'editDriver', params: { id: item.id } }"
                    class="nav-link me-2"
                  >
                    <button class="btn btn-outline-primary d-block">
                      <i class="pi pi-pen-to-square"></i>
                    </button>
                  </RouterLink>
                  <button
                    class="btn btn-outline-secondary d-block me-2"
                    @click.prevent="toggleDriverStatus(item.id, !item.isActive)"
                  >
                    <i class="pi pi-exclamation-circle"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger d-block me-2"
                    @click.prevent="removedItem(item.id)"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
