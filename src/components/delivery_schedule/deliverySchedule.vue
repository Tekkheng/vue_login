<script setup>
import { onMounted } from 'vue'
import { useDeliveryStore } from '@/stores/deliveryStore'

const deliveryStore = useDeliveryStore()

const removedItem = (noItem) => {
  deliveryStore.deleteItemDelivery(noItem)
}

onMounted(async () => {
  await deliveryStore.fetchItemsDelivery()
  // console.log(deliveryStore)
})
</script>

<template>
  <div class="container-fluid p-3">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="text-success">Delivery Schedules</h4>
            <RouterLink :to="{ name: 'addDelivery' }" class="nav-link">
              <button class="btn btn-outline-success ms-2">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Delivery
              </button>
            </RouterLink>
          </div>
          <DataTable
            :value="deliveryStore.delivery"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            stripedRows
            showGridlines
            tableStyle="min-width: 50rem"
          >
            <TableColumn
              field="id"
              header="No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="no_delivery"
              header="Nomor Delivery"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="plat_no.plat_no"
              header="Plat No"
              bodyStyle="overflow: visible"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="tgl_berangkat"
              header="Estimasi Tanggal Berangkat"
              bodyStyle="overflow: visible;"
              :headerStyle="{ backgroundColor: 'lightgreen', color: 'white' }"
            ></TableColumn>
            <TableColumn
              field="tgl_sampai"
              header="Estimasi Tanggal Sampai"
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
              <template #body="deliveryValue">
                <RouterLink
                  :to="{ name: 'editDelivery', params: { id: deliveryValue.data.id } }"
                  class="nav-link w-50"
                >
                  <button class="btn btn-outline-primary d-block me-2">
                    <i class="pi pi-pen-to-square"></i>
                  </button>
                </RouterLink>
                <button
                  class="btn btn-outline-danger d-block w-50 me-2"
                  @click.prevent="removedItem(deliveryValue.data.id)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </template>
            </TableColumn>
          </DataTable>
          <!-- <div class="card-header d-flex justify-content-between">
            <h4>Delivery Schedules</h4>
            <RouterLink :to="{ name: 'addDelivery' }" class="nav-link">
              <button class="btn btn-outline-primary ms-2">
                <i class="pi pi-plus p-2 fw-bold"></i>Add Delivery
              </button>
            </RouterLink>
          </div>
          <div class="card-body">
            <table class="table table-bordered table-hover">
              <thead>
                <tr class="text-center">
                  <th scope="col">No</th>
                  <th scope="col">No Delivery</th>
                  <th scope="col">Plat No</th>
                  <th scope="col">Estimasi Tanggal Berangkat</th>
                  <th scope="col">Estimasi Tanggal Sampai</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in deliveryStore.delivery"
                  :key="index"
                  class="text-center"
                >
                  <th scope="row">{{ item.id }}</th>
                  <td>{{ item.no_delivery }}</td>
                  <td>{{ item.plat_no }}</td>
                  <td>{{ item.tgl_berangkat }}</td>
                  <td>{{ item.tgl_sampai }}</td>
                  <td class="d-flex justify-content-center align-items-center">
                    <RouterLink
                      :to="{ name: 'editDelivery', params: { id: item.id } }"
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
