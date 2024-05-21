<script setup>
import { ref, onMounted } from 'vue'
import Calendar from 'primevue/calendar'
import useTruckStore from '@/stores/truckStore'
import { useDeliveryStore } from '@/stores/deliveryStore'
// dapatin params id
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

// dapatin data store
const truckStore = useTruckStore()
const deliveryStore = useDeliveryStore()

const no_delivery = ref('')
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

// editDelivery
const editNewItem = (idItem) => {
  const getIdtrucks = truckStore.truck.filter((truck) => truck.plat_no === plat_no.value)
  if (getIdtrucks.length > 0) {
    plat_no.value = getIdtrucks[0].no
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
    no_delivery: no_delivery.value,
    plat_no: plat_no.value,
    tgl_berangkat: frmt_tgl_berangkat,
    tgl_sampai: frmt_tgl_sampai
  }
  deliveryStore.updateItemDelivery({ idItem, newEditData: newData })
  no_delivery.value = ''
  plat_no.value = ''
  tgl_berangkat.value = ''
  tgl_sampai.value = ''
}

onMounted(async () => {
  await deliveryStore.fetchItemsDelivery()
  await truckStore.fetchItems()

  // set default value for plat_no,tgl_berangkat,tgl_sampai
  // console.log(truckStore.truck)
  if (deliveryStore.delivery && deliveryStore.delivery.length > 0) {
    for (let delivery of deliveryStore.delivery) {
      // console.log(delivery)
      if (delivery.id == id) {
        const truckPlat = truckStore.truck.filter((truck) => truck.no == delivery.plat_no.no)
        // console.log(truckPlat)
        if (delivery.plat_no.no == truckPlat[0].no) {
          plat_no.value = truckPlat[0].plat_no
        }
        // console.log(plat_no.value)
        no_delivery.value = delivery.no_delivery
        tgl_berangkat.value = delivery.tgl_berangkat
        tgl_sampai.value = delivery.tgl_sampai
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
        :to="{ name: 'deliverySchedule' }"
        ><span class="ms-3 fs-5">Back</span></RouterLink
      >
      <div class="col-md-6">
        <div class="mb-4 d-flex flex-column justify-content-center align-items-center">
          <h4 class="mb-5 text-center">Edit DELIVERY SCHEDULES</h4>
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
              <div class="col-sm-2 form-label">No Delivery</div>
              <div class="col-sm-8">
                <input
                  type="text"
                  placeholder="No Delivery"
                  v-model="no_delivery"
                  class="form-control"
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
