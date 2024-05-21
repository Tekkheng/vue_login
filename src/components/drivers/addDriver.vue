<script setup>
import { ref, onMounted } from 'vue'
import { useTypeStore } from '@/stores/typeTruckStore'
import { useDriverStore } from '@/stores/driverStore'

const typeStore = useTypeStore()
const driverStore = useDriverStore()

const nama_driver = ref('')
const tipe_driver_truck = ref('')

const saveSelectedTipeTruck = (event) => {
  tipe_driver_truck.value = event.target.value
}

// const formatDate = (tgl) => {
//   const tahun = tgl.getFullYear()
//   const bulan = (tgl.getMonth() + 1).toString().padStart(2, '0')
//   const tanggalBulan = tgl.getDate().toString().padStart(2, '0')
//   const stringTanggal = `${tahun}-${bulan}-${tanggalBulan}`
//   return stringTanggal
// }

const addNewItem = () => {
  // const frmt_tgl_berangkat = formatDate(tgl_berangkat.value)
  // const frmt_tgl_sampai = formatDate(tgl_sampai.value)
  console.log(typeStore.typeTruck)

  const getIdTypetrucks = typeStore.typeTruck.find(
    (typeTruck) => typeTruck.tipe_truck === tipe_driver_truck.value
  )
  if (getIdTypetrucks) {
    tipe_driver_truck.value = getIdTypetrucks.no
  }

  const newData = {
    nama_driver: nama_driver.value,
    tipe_driver_truck: tipe_driver_truck.value
  }
  driverStore.addItemDriver(newData)
  tipe_driver_truck.value = ''
  nama_driver.value = ''
}

onMounted(async () => {
  await typeStore.fetchItemsType()
  console.log(typeStore.typeTruck[0].tipe_truck)
  console.log(driverStore)
  if (typeStore.typeTruck && typeStore.typeTruck.length > 0) {
    tipe_driver_truck.value = typeStore.typeTruck[0].tipe_truck
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
      <h4 class="mb-5 text-center">ADD DRIVER</h4>

      <div class="col-md-6">
        <div class="mb-4 d-flex flex-column justify-content-center align-items-center">
          <form>
            <div class="mb-4 row">
              <label for="tipe_driver_truck" class="col-sm-2 form-label">Tipe Driver Truck</label>
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
                  placeholder="Nama Driver"
                  v-model="nama_driver"
                  class="form-control"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-10 offset-sm-2">
                <button type="submit" class="btn btn-primary" @click.prevent="addNewItem">
                  Add Driver
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
