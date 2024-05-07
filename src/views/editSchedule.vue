<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { ref, onMounted } from 'vue'
import Calendar from 'primevue/calendar'
import useTruckStore from '@/stores/truckStore'
import { useScheduleStore } from '@/stores/scheduleStore'
// dapatin params id
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

// dapatin data store
const truckStore = useTruckStore()
const scheduleStore = useScheduleStore()

const truck_type = ref('')
const plat_no = ref('')
let tgl_berangkat = ref('')
let tgl_sampai = ref('')

// set plat_no.value
const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
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
  for (let truck of truckStore.truck) {
    if (truck.plat_no === plat_no.value) {
      truck_type.value = truck.truck_type.tipe_truck
    }
  }
  // date default yyyy-mm-dd tapi ketika di input menjadi objek

  // Ubah string tanggal menjadi objek Date, memastikan date selalu objek, sehingga ketika di formatDate aman
  const date_berangkat = new Date(tgl_berangkat.value)
  const date_sampai = new Date(tgl_sampai.value)
  // console.log(date_berangkat, date_sampai)

  // format objek date jadi yyyy-mm-dd
  const frmt_tgl_berangkat = formatDate(date_berangkat)
  const frmt_tgl_sampai = formatDate(date_sampai)

  // console.log(frmt_tgl_berangkat, frmt_tgl_sampai)

  const newData = {
    plat_no: plat_no.value,
    tgl_berangkat: frmt_tgl_berangkat,
    tgl_sampai: frmt_tgl_sampai,
    tipe_truck: truck_type.value
  }
  console.log(truck_type.value)
  scheduleStore.updateItemSchedule({ idItem, newEditData: newData })
  plat_no.value = ''
  tgl_berangkat.value = ''
  tgl_sampai.value = ''
  truck_type.value = ''
}

onMounted(async () => {
  await scheduleStore.fetchItemsSchedule()
  await truckStore.fetchItems()

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
        plat_no.value = schedule.plat_no
        tgl_berangkat.value = schedule.tgl_berangkat
        tgl_sampai.value = schedule.tgl_sampai
      }
    }
  }
})
</script>

<template>
  <NavbarComponent />

  <div class="container-fluid p-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="mb-4 d-flex flex-column justify-content-center align-items-center">
          <h4 class="mb-5 text-center">Edit TRUCK SCHEDULES</h4>
          <form>
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
