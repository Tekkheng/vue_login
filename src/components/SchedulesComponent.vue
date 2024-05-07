<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useScheduleStore } from '@/stores/scheduleStore'
import axios from 'axios'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// import print from 'vue3-print-nb'

// {
//   print
// }

// const dataPrint = ref({})
// const isPrint = ref(false)

// const printData = (id) => {
//   isPrint.value = true
//   const dataFilter = truckSchedule.value.filter((item) => item.id === id)
//   dataPrint.value = dataFilter

//   setTimeout(() => {
//     isPrint.value = false
//   }, 10)
// }

const schedulesStore = useScheduleStore()
const printData = async (id) => {
  try {
    const response = await axios({
      url: `generate-pdf/${id}`,
      method: 'GET',
      responseType: 'blob'
    })
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.pdf')
      document.body.appendChild(link)
      link.click()
    }
    // axios({
    //   url: `generate-pdf/${id}`,
    //   method: 'GET',
    //   responseType: 'blob' // important
    // }).then((response) => {
    //   const url = window.URL.createObjectURL(new Blob([response.data]))
    //   const link = document.createElement('a')
    //   link.href = url
    //   link.setAttribute('download', 'file.pdf')
    //   document.body.appendChild(link)
    //   link.click()
    // })
  } catch (err) {
    console.log(err)
  }
}

const removedItem = (noItem) => {
  schedulesStore.deleteItemSchedule(noItem)
}

onMounted(async () => {
  await schedulesStore.fetchItemsSchedule()
})
</script>

<template>
  <NavbarComponent />
  <div class="container-fluid p-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4>TRUCK SCHEDULES</h4>
            <RouterLink :to="{ name: 'add_schedules' }" class="nav-link">
              <button class="btn btn-outline-primary ms-2">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Data
              </button>
            </RouterLink>
          </div>
          <div class="card-body">
            <table class="table table-bordered table-hover">
              <thead>
                <tr class="text-center">
                  <th scope="col">No</th>
                  <th scope="col">Plat No</th>
                  <th scope="col">Truck Tipe</th>
                  <th scope="col">Tanggal Berangkat</th>
                  <th scope="col">Tanggal Sampai</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in schedulesStore.schedule"
                  :key="index"
                  class="text-center"
                >
                  <th scope="row">{{ item.id }}</th>
                  <td>{{ item.plat_no }}</td>
                  <td>{{ item.tipe_truck }}</td>
                  <td>{{ item.tgl_berangkat }}</td>
                  <td>{{ item.tgl_sampai }}</td>
                  <td class="d-flex justify-content-center align-items-center">
                    <RouterLink
                      :to="{ name: 'edit_schedules', params: { id: item.id } }"
                      class="nav-link w-50"
                    >
                      <button class="btn btn-outline-primary d-block me-2">
                        <i class="pi pi-pen-to-square"></i>
                      </button>
                    </RouterLink>
                    <button
                      class="btn btn-outline-danger d-block w-50 me-2"
                      @click.prevent="removedItem(item.id)"
                    >
                      <i class="pi pi-trash"></i>
                    </button>

                    <button
                      class="btn btn-outline-success d-block w-50"
                      @click.prevent="printData(item.id)"
                    >
                      <i class="pi pi-print"></i>
                    </button>

                    <!-- <button
                      class="btn btn-outline-success d-block w-50"
                      @click.prevent="printData(item.id)"
                      v-print="'#printMe'"
                    >
                      <i class="pi pi-print"></i>
                    </button> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div
            class="modal fade"
            id="exampleModal "
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body" id="printMe">
                  <div class="card-body" :hidden="!isPrint">
                    <h4 class="text-center">Data Truck Schedule Print</h4>
                    <br />
                    <table class="table table-bordered table-hover">
                      <thead>
                        <tr class="text-center">
                          <th scope="col">No</th>
                          <th scope="col">Plat No</th>
                          <th scope="col">Tanggal Berangkat</th>
                          <th scope="col">Tanggal Sampai</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in dataPrint" :key="index" class="text-center">
                          <th scope="row">{{ item.id }}</th>
                          <td>{{ item.plat_no }}</td>
                          <td>{{ item.tgl_berangkat }}</td>
                          <td>{{ item.tgl_sampai }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style>
@media print {
  .no-print {
    display: none;
  }
}
</style> -->
