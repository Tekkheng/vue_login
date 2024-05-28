<script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import axios from 'axios'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// const email = ref('')
// const id = ref('')

// const tesEmail = async () => {
//   try {
//     const response = await axios.post('/send-email', {
//       email: email.value,
//       id: id.value
//     })
//     alert(response.data.message)
//   } catch (error) {
//     console.error(error)
//     alert('Failed to send email')
//   }
// }

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
  console.log(schedulesStore)
})
</script>

<template>
  <div class="container-fluid p-3">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="text-success">TRUCK SCHEDULES</h4>
            <RouterLink :to="{ name: 'add_schedules' }" class="nav-link">
              <button class="btn btn-outline-success ms-2">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Data
              </button>
            </RouterLink>
          </div>
          <DataTable
            :value="schedulesStore.schedule"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            stripedRows
            showGridlines
            tableStyle="min-width: 50rem;"
          >
            <TableColumn
              field="id"
              header="No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="driver_name.nama_driver"
              header="Nama Driver"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
              head
            ></TableColumn>
            <TableColumn
              field="plat_no"
              header="Plat No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="truck_type.tipe_truck"
              header="Tipe Truck"
              bodyStyle="overflow: visible;"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="tgl_berangkat"
              header="Tanggal Berangkat"
              bodyStyle="overflow: visible;"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="tgl_sampai"
              header="Tanggal Sampai"
              bodyStyle="overflow: visible;"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <!-- <TableColumn field="no" header="No" style="width: 25%"></TableColumn> -->

            <TableColumn
              bodyStyle="overflow: visible"
              header="Action"
              class="d-flex"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            >
              <template #body="scheduleValue">
                <RouterLink
                  :to="{ name: 'edit_schedules', params: { id: scheduleValue.data.id } }"
                  class="nav-link"
                >
                  <button class="btn btn-outline-primary me-2">
                    <i class="pi pi-pen-to-square"></i>
                  </button>
                </RouterLink>

                <button
                  class="btn btn-outline-danger me-2"
                  @click.prevent="removedItem(scheduleValue.data.id)"
                >
                  <i class="pi pi-trash"></i>
                </button>

                <button
                  class="btn btn-outline-success"
                  @click.prevent="printData(scheduleValue.data.id)"
                >
                  <i class="pi pi-print"></i>
                </button>
              </template>
            </TableColumn>
          </DataTable>
          <!-- <div class="card-header d-flex justify-content-between">
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
                  <th scope="col">Nama Driver</th>
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
                  <td>{{ item.nama_driver }}</td>
                  <td>{{ item.plat_no }}</td>
                  <td>{{ item.truck_type && item.truck_type.tipe_truck }}</td>
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    <input v-model="email" type="email" placeholder="Enter email" />
    <input v-model="id" type="number" placeholder="Enter Schedule ID" />
    <button @click="tesEmail">Send Email</button>
  </div> -->
</template>

<!-- <style>
@media print {
  .no-print {
    display: none;
  }
}
</style> -->
