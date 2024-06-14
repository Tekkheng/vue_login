<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import Calendar from 'primevue/calendar'
import useTruckStore from '@/stores/truckStore'
import { useScheduleStore } from '@/stores/scheduleStore'
import { useDriverStore } from '@/stores/driverStore'
// dapatin params id
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

// dapatin data store
const truckStore = useTruckStore()
const scheduleStore = useScheduleStore()
const driverStore = useDriverStore()

const nama_driver = ref('')
const tipe_truck = ref('')
const plat_no = ref('')
let tgl_berangkat = ref('')
let tgl_sampai = ref('')

// set plat_no.value
const saveSelectedNamaDriver = (event) => {
  nama_driver.value = event.target.value
}
const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
}

const clearValue = () => {
  nama_driver.value = ''
  plat_no.value = ''
  tgl_berangkat.value = ''
  tgl_sampai.value = ''
  tipe_truck.value = ''
}
// format date
const formatDate = (tgl) => {
  const tahun = tgl.getFullYear()
  const bulan = (tgl.getMonth() + 1).toString().padStart(2, '0')
  const tanggalBulan = tgl.getDate().toString().padStart(2, '0')
  const stringTanggal = `${tahun}-${bulan}-${tanggalBulan}`
  return stringTanggal
}

// editschedule
const editNewItem = (idItem) => {
  // date default yyyy-mm-dd tapi ketika di input menjadi objek

  // Ubah string tanggal menjadi objek Date, memastikan date selalu objek, sehingga ketika di formatDate aman
  const date_berangkat = new Date(tgl_berangkat.value)
  const date_sampai = new Date(tgl_sampai.value)
  // console.log(date_berangkat, date_sampai)

  // format objek date jadi yyyy-mm-dd
  const frmt_tgl_berangkat = formatDate(date_berangkat)
  const frmt_tgl_sampai = formatDate(date_sampai)

  // console.log(frmt_tgl_berangkat, frmt_tgl_sampai)

  // const filterDriver = driverStore.driver.find(
  //   (driver) => driver.truck_type.tipe_truck === tipe_truck.value
  // )
  const filterDriverTipe = driverStore.driver.find(
    (driver) => driver.truck_type.tipe_truck === tipe_truck.value
  )
  const filterDriverNama = driverStore.driver.find(
    (driver) => driver.nama_driver === nama_driver.value
  )

  nama_driver.value = filterDriverNama.id
  tipe_truck.value = filterDriverTipe.tipe_driver_truck

  console.log(tipe_truck.value)
  const newData = {
    nama_driver: nama_driver.value,
    plat_no: plat_no.value,
    tgl_berangkat: frmt_tgl_berangkat,
    tgl_sampai: frmt_tgl_sampai,
    tipe_truck: tipe_truck.value
  }
  console.log(tipe_truck.value)
  const clickInfo = false
  scheduleStore.updateItemSchedule({ idItem, newEditData: newData, clickInfo })
  clearValue()
}

watchEffect(() => {
  for (let driver of driverStore.driver) {
    if (nama_driver.value === driver.nama_driver) {
      tipe_truck.value = driver.truck_type.tipe_truck
    }
  }
  console.log(tipe_truck.value)
})

onMounted(async () => {
  await scheduleStore.fetchItemsSchedule()
  await truckStore.fetchItems()
  await driverStore.fetchItemsDriver()
  console.log(scheduleStore)

  // set default value for plat_no,tgl_berangkat,tgl_sampai
  if (scheduleStore.schedule && scheduleStore.schedule.length > 0) {
    //   for (let i in truckItemsSchedule.value) {
    //     if (truckItemsSchedule.value[i].id == id) {
    //       tgl_berangkat.value = truckItemsSchedule.value[i].tgl_berangkat
    //       tgl_sampai.value = truckItemsSchedule.value[i].tgl_sampai
    //     }
    //   }
    for (let schedule of scheduleStore.schedule) {
      if (schedule.id == id) {
        nama_driver.value = schedule.driver_name.nama_driver
        plat_no.value = schedule.plat_no
        tipe_truck.value = schedule.truck_type.tipe_truck
        tgl_berangkat.value = schedule.tgl_berangkat
        tgl_sampai.value = schedule.tgl_sampai
      }
    }
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center bg bg-white p-3 m-3 rounded">
      <RouterLink class="pi pi-arrow-left text-decoration-none text-dark fw-bold me-3" :to="{ name: 'schedules' }"><span
          class="ms-3 fs-5">Back</span></RouterLink>
      <div class="col-md-6">
        <div class="mb-4 d-flex flex-column justify-content-center align-items-center">
          <h4 class="mb-5 text-center mt-5">Edit TRUCK SCHEDULES</h4>
          <form>
            <div class="mb-4 row">
              <label for="nama_driver" class="col-sm-2 col-form-label">Nama Driver</label>
              <div class="col-sm-8">
                <select class="form-select" id="nama_driver" v-model="nama_driver" @change="saveSelectedNamaDriver">
                  <option v-for="(item, index) in driverStore.driver" :key="index">
                    {{ item.nama_driver }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="plat_no" class="col-sm-2 col-form-label">Plat No</label>
              <div class="col-sm-8">
                <select class="form-select" id="plat_no" v-model="plat_no" @change="saveSelectedPlatNo">
                  <option v-for="(item, index) in truckStore.truck" :key="index">
                    {{ item.plat_no }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-2 form-label">Tipe Truck</div>
              <div class="col-sm-8">
                <input type="text" placeholder="Tipe Truck" v-model="tipe_truck" class="form-control" disabled />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="tgl_berangkat" class="col-sm-2 col-form-label pe-5">Tanggal Berangkat</label>
              <div class="col-sm-10">
                <Calendar v-model="tgl_berangkat" showIcon :showOnFocus="true" id="tgl_berangkat"
                  dateFormat="yy-mm-dd" />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="tgl_sampai" class="col-sm-2 col-form-label">Tanggal Sampai</label>
              <div class="col-sm-10">
                <Calendar v-model="tgl_sampai" showIcon :showOnFocus="true" id="tgl_sampai" dateFormat="yy-mm-dd" />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-10 offset-sm-2">
                <button type="submit" class="btn btn-primary" @click.prevent="editNewItem(id)">
                  Edit Schedule
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
