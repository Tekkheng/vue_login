<script setup>
import { onMounted } from 'vue'
import NavbarComponent from '../NavbarComponent.vue'
import { useDriverStore } from '@/stores/driverStore'
import useTruckStore from '@/stores/truckStore'
const driverStore = useDriverStore()

// const activeTruck = ref(null)
const truckStore = useTruckStore()
// const tipe_driver_truck_string = ref('')
const removedItem = (noItem) => {
  driverStore.deleteItemDriver(noItem)
}

const toggleDriverStatus = (noItem, isActive) => {
  driverStore.updateDriverStatus(noItem, isActive)
}

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
  <NavbarComponent />
  <div class="container-fluid p-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4>Drivers Data</h4>
            <RouterLink :to="{ name: 'addDriver' }" class="nav-link">
              <button class="btn btn-outline-primary ms-2">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Driver
              </button>
            </RouterLink>
          </div>
          <div class="card-body">
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
                <tr
                  v-for="(item, index) in driverStore.driver"
                  :key="index"
                  class="text-center bg bg-warning"
                >
                  <th scope="row">{{ item.id }}</th>
                  <td>{{ item.nama_driver }}</td>
                  <td>{{ item.truck_type && item.truck_type.tipe_truck }}</td>
                  <td class="text-light bg bg-success" v-if="item.isActive">Available</td>
                  <td class="text-light bg bg-danger" v-else>Suspended</td>

                  <td class="d-flex justify-content-center align-items-center">
                    <RouterLink
                      :to="{ name: 'editDriver', params: { id: item.id } }"
                      class="nav-link w-50"
                    >
                      <button class="btn btn-outline-primary d-block me-2">
                        <i class="pi pi-pen-to-square"></i>
                      </button>
                    </RouterLink>
                    <button
                      class="btn btn-outline-secondary d-block w-50 me-2"
                      @click.prevent="toggleDriverStatus(item.id, !item.isActive)"
                    >
                      <i class="pi pi-exclamation-circle"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger d-block w-50 me-2"
                      @click.prevent="removedItem(item.id)"
                    >
                      <i class="pi pi-trash"></i>
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
</template>

<style lang="scss" scoped></style>
