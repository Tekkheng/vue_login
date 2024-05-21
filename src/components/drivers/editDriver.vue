<script setup>
import { ref, onMounted } from 'vue'
import { useTypeStore } from '@/stores/typeTruckStore'
import { useDriverStore } from '@/stores/driverStore'
// dapatin params id
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

// dapatin data store
const typeStore = useTypeStore()
const driverStore = useDriverStore()

const nama_driver = ref('')
const tipe_driver_truck = ref('')
const isActive = ref('null')

// set tipe_driver_truck.value
const saveSelectedTipeTruck = (event) => {
  tipe_driver_truck.value = event.target.value
}

// editDriver
const editNewItem = (idItem) => {
  const getIdTypetrucks = typeStore.typeTruck.find(
    (typeTruck) => typeTruck.tipe_truck === tipe_driver_truck.value
  )
  if (getIdTypetrucks) {
    tipe_driver_truck.value = getIdTypetrucks.no
  }

  const newData = {
    nama_driver: nama_driver.value,
    tipe_driver_truck: tipe_driver_truck.value,
    isActive: isActive.value
  }
  driverStore.updateItemDriver({ idItem, newEditData: newData })
  nama_driver.value = ''
  tipe_driver_truck.value = ''
  isActive.value = null
}

onMounted(async () => {
  await driverStore.fetchItemsDriver()
  await typeStore.fetchItemsType()

  // set default value for tipe_driver_truck,tgl_berangkat,tgl_sampai
  if (driverStore.driver && driverStore.driver.length > 0) {
    for (let driver of driverStore.driver) {
      // console.log(typeStore.typeTruck)
      if (driver.id == id) {
        nama_driver.value = driver.nama_driver
        tipe_driver_truck.value = driver.truck_type.tipe_truck
        isActive.value = driver.isActive
      }
    }
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center bg bg-white p-3 m-3 rounded">
      <RouterLink
        class="pi pi-arrow-left text-decoration-none text-dark fw-bold me-3"
        :to="{ name: 'drivers' }"
        ><span class="ms-3 fs-5">Back</span></RouterLink
      >
      <div class="col-md-6">
        <div class="mb-4 d-flex flex-column justify-content-center align-items-center">
          <h4 class="mb-5 text-center">Edit DRIVER</h4>
          <form>
            <div class="mb-4 row">
              <label for="tipe_driver_truck" class="col-sm-2 col-form-label"
                >Tipe Driver Truck</label
              >
              <div class="col-sm-8">
                <select
                  class="form-select"
                  id="tipe_driver_truck"
                  v-model="tipe_driver_truck"
                  @change="saveSelectedTipeTruck"
                >
                  <option v-for="(item, index) in typeStore.typeTruck" :key="index">
                    {{ item.tipe_truck }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-2 form-label">Nama Driver</div>
              <div class="col-sm-8">
                <input
                  type="text"
                  placeholder="No Delivery"
                  v-model="nama_driver"
                  class="form-control"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-2 form-label">IsActive</div>
              <div class="col-sm-8">
                <input type="text" placeholder="isActive" v-model="isActive" class="form-control" />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-10 offset-sm-2">
                <button type="submit" class="btn btn-primary" @click.prevent="editNewItem(id)">
                  Edit Driver
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
