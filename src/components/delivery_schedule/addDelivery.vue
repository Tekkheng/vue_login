<script setup>
import { ref, onMounted } from 'vue'
import useTruckStore from '@/stores/truckStore'
import { useDeliveryStore } from '@/stores/deliveryStore'

import Calendar from 'primevue/calendar'

const truckStore = useTruckStore()
const deliveryStore = useDeliveryStore()

const no_delivery = ref('')
const plat_no = ref('')
const tgl_berangkat = ref('')
const tgl_sampai = ref('')

const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
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

  const getIdtrucks = truckStore.truck.filter((truck) => truck.plat_no === plat_no.value)
  if (getIdtrucks.length > 0) {
    plat_no.value = getIdtrucks[0].no
  }

  const newData = {
    no_delivery: no_delivery.value,
    plat_no: plat_no.value,
    tgl_berangkat: frmt_tgl_berangkat,
    tgl_sampai: frmt_tgl_sampai
  }
  deliveryStore.addItemDelivery(newData)
  plat_no.value = ''
  no_delivery.value = ''
  tgl_berangkat.value = ''
  tgl_sampai.value = ''
}

onMounted(async () => {
  await truckStore.fetchItems()
  if (truckStore.truck && truckStore.truck.length > 0) {
    plat_no.value = truckStore.truck[0].plat_no
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
      <h4 class="mb-5 text-center">ADD DELIVERY SCHEDULES</h4>
      <div class="col-md-6">
        <div class="mb-4 d-flex flex-column justify-content-center align-items-center">
          <form>
            <div class="mb-4 row">
              <label for="plat_no" class="col-sm-2 form-label">Plat No</label>
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
                <button type="submit" class="btn btn-primary" @click.prevent="addNewItem">
                  Add Delivery
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
