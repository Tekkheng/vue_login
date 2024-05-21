<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import useTruckStore from '@/stores/truckStore'
import { useScheduleStore } from '@/stores/scheduleStore'
import { useDriverStore } from '@/stores/driverStore'
import { RouterLink } from 'vue-router'

import Calendar from 'primevue/calendar'

const truckStore = useTruckStore()
const scheduleStore = useScheduleStore()
const driverStore = useDriverStore()

const nama_driver = ref('')
const tipe_truck = ref('')
const plat_no = ref('')
const tgl_berangkat = ref('')
const tgl_sampai = ref('')

const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
}

const saveSelectedNamaDriver = (event) => {
  nama_driver.value = event.target.value
}

const clearValue = () => {
  nama_driver.value = ''
  plat_no.value = ''
  tgl_berangkat.value = ''
  tgl_sampai.value = ''
  tipe_truck.value = ''
}

const formatDate = (tgl) => {
  const tahun = tgl.getFullYear()
  const bulan = (tgl.getMonth() + 1).toString().padStart(2, '0')
  const tanggalBulan = tgl.getDate().toString().padStart(2, '0')
  const stringTanggal = `${tahun}-${bulan}-${tanggalBulan}`
  return stringTanggal
}

const addNewItem = () => {
  const frmt_tgl_berangkat = formatDate(tgl_berangkat.value)
  const frmt_tgl_sampai = formatDate(tgl_sampai.value)

  const filterDriverTipe = driverStore.driver.find(
    (driver) => driver.truck_type.tipe_truck === tipe_truck.value
  )
  const filterDriverNama = driverStore.driver.find(
    (driver) => driver.nama_driver === nama_driver.value
  )
  console.log(filterDriverNama)
  tipe_truck.value = filterDriverTipe.tipe_driver_truck
  nama_driver.value = filterDriverNama.id
  console.log(filterDriverTipe)

  const newData = {
    nama_driver: nama_driver.value,
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value,
    tgl_berangkat: frmt_tgl_berangkat,
    tgl_sampai: frmt_tgl_sampai
  }
  console.log(tipe_truck.value)
  scheduleStore.addItemSchedule(newData)
  clearValue()
}

watchEffect(() => {
  for (let driver of driverStore.driver) {
    if (nama_driver.value === driver.nama_driver) {
      tipe_truck.value = driver.truck_type.tipe_truck
    }
  }
})

onMounted(async () => {
  await truckStore.fetchItems()
  await driverStore.fetchItemsDriver()

  await scheduleStore.fetchItemsSchedule()
  if (truckStore.truck && truckStore.truck.length > 0) {
    plat_no.value = truckStore.truck[0].plat_no
  }
  if (driverStore.driver && driverStore.driver.length > 0) {
    nama_driver.value = driverStore.driver[0].nama_driver
    tipe_truck.value = driverStore.driver[0].truck_type.tipe_truck
  }
  // for (let driver of driverStore.driver) {
  //   if (nama_driver.value === driver.nama_driver) {
  //     tipe_truck.value = driver.tipe_truck.tipe_truck
  //   }
  // }
  console.log(driverStore.driver)
  console.log(scheduleStore.schedule)
})
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center bg bg-white p-3 m-3 rounded">
      <RouterLink
        class="pi pi-arrow-left text-decoration-none text-dark fw-bold me-3"
        :to="{ name: 'schedules' }"
        ><span class="ms-3 fs-5">Back</span></RouterLink
      >
      <div class="col-md-8">
        <h4 class="mb-5 text-center mt-5">ADD TRUCK SCHEDULES</h4>

        <form>
          <div class="mb-4 row">
            <label for="plat_no" class="col-sm-2 col-form-label">Nama Driver</label>
            <div class="col-sm-8">
              <select
                class="form-select"
                id="plat_no"
                v-model="nama_driver"
                @change="saveSelectedNamaDriver"
              >
                <option v-for="(item, index) in driverStore.driver" :key="index">
                  {{ item.nama_driver }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-4 row">
            <label for="plat_no" class="col-sm-2 col-form-label">Plat No</label>
            <div class="col-sm-8">
              <select
                class="form-select"
                id="plat_no"
                v-model="plat_no"
                @change="saveSelectedPlatNo"
              >
                <option v-for="(item, index) in truckStore.truck" :key="index">
                  {{ item.plat_no }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-2 form-label">Tipe Truck</div>
            <div class="col-sm-8">
              <input
                type="text"
                placeholder="Tipe Truck"
                v-model="tipe_truck"
                class="form-control"
                disabled
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="tgl_berangkat" class="col-sm-2 col-form-label pe-5"
              >Tanggal Berangkat</label
            >
            <div class="col-sm-10">
              <Calendar
                v-model="tgl_berangkat"
                showIcon
                :showOnFocus="true"
                id="tgl_berangkat"
                dateFormat="yy-mm-dd"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="tgl_sampai" class="col-sm-2 col-form-label">Tanggal Sampai</label>
            <div class="col-sm-10">
              <Calendar
                v-model="tgl_sampai"
                showIcon
                :showOnFocus="true"
                id="tgl_sampai"
                dateFormat="yy-mm-dd"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-10 offset-sm-2">
              <button type="submit" class="btn btn-primary" @click.prevent="addNewItem">
                Add Schedule
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
