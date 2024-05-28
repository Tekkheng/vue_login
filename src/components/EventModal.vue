<script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import { useDriverStore } from '@/stores/driverStore'
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

// khusus send mail dialog
import Dialog from 'primevue/dialog'
const isVisible = ref(false)

const props = defineProps({
  isOpen: Boolean,
  isAdd: Boolean,
  eventHandler: Object,
  truck: Object
})

const nama_driver = ref(null)
const tipe_truck = ref(null)
const plat_no = ref(null)
const schedulesStore = useScheduleStore()
const driverStore = useDriverStore()

let editStart = ref('')
let editEnd = ref('')

const emit = defineEmits(['modal-close'])
// const handleSubmit = () => {
//   emit('submit')
// }

// const target = ref(null)
function closeModal() {
  emit('modal-close')
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const updateEvent = () => {
  const clickInfo = props.eventHandler
  const idItem = clickInfo.event.id

  console.log(schedulesStore.schedule)
  console.log()
  for (let i in schedulesStore.schedule) {
    if (schedulesStore.schedule[i].driver_name.nama_driver === nama_driver.value) {
      nama_driver.value = schedulesStore.schedule[i].nama_driver
      tipe_truck.value = schedulesStore.schedule[i].tipe_truck
    }
  }
  for (let i in driverStore.driver) {
    if (nama_driver.value === driverStore.driver[i].nama_driver) {
      tipe_truck.value = driverStore.driver[i].tipe_driver_truck
      nama_driver.value = driverStore.driver[i].id
    }
  }

  // console.log(
  //   `check data:\nnama Driver:${nama_driver.value}\nplat No: ${plat_no.value}\ntipe Truck: ${tipe_truck.value}\ntgl berangkat: ${editStart.value}\ntgl sampai: ${editEnd.value}`
  // )
  const data = {
    nama_driver: nama_driver.value,
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value,
    tgl_berangkat: editStart.value,
    tgl_sampai: editEnd.value
  }
  schedulesStore.updateItemSchedule({ idItem, newEditData: data, clickInfo })
  closeModal()
  emit('clearValue')
  nama_driver.value = null
  tipe_truck.value = null
  plat_no.value = null
  editStart.value = null
  editEnd.value = null
}

const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
}

const saveSelectedDriverName = (event) => {
  nama_driver.value = event.target.value
}
// function deleteHandler() {
//   closeModal()
//   const clickInfo = props.eventHandler
//   const current_id = clickInfo.event.id
//   schedulesStore.deleteItemSchedule(current_id, clickInfo.event)
//   emit('clearValue')
// }

const submitHandler = () => {
  closeModal()
  const selectInfo = props.eventHandler
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect() // clear date selection

  // for (let i in props.truck) {
  //   if (plat_no.value === props.truck[i].plat_no) {
  //     tipe_truck.value = props.truck[i].truck_type.tipe_truck
  //   }
  // }
  for (let i in driverStore.driver) {
    if (nama_driver.value === driverStore.driver[i].nama_driver) {
      tipe_truck.value = driverStore.driver[i].tipe_driver_truck
      nama_driver.value = driverStore.driver[i].id
    }
  }
  console.log(`tipe: ${tipe_truck.value}, nama Driver: ${nama_driver.value}`)

  let endDate = new Date(selectInfo.endStr)
  endDate.setDate(endDate.getDate() - 1)
  endDate = formatDate(endDate)

  //// set local calendarApi
  //   calendarApi.addEvent({
  //     id: truck.id
  //     title: truck_type.value,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay,
  //     extendedProps: {
  //       truck: plat_no.value,
  //       status: 'done'
  //     }
  //   })

  const data = {
    nama_driver: nama_driver.value,
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value,
    tgl_berangkat: selectInfo.startStr,
    tgl_sampai: endDate
    // tgl_sampai: selectInfo.endStr
  }
  schedulesStore.addItemSchedule(data, selectInfo)
  //  set eventHandler.value && isAdd.value = null
  nama_driver.value = null
  tipe_truck.value = null
  plat_no.value = null
  emit('clearValue')
}

const email = ref('')
const id = ref('')

const mailModal = () => {
  closeModal()
  isVisible.value = true
}

const sendMail = async () => {
  // await console.log(props.eventHandler.event.id)
  id.value = props.eventHandler.event.id
  const data = {
    id: id.value,
    email: email.value
  }
  console.log(data)
  try {
    const res = await axios.post('send-email', data)
    if (res.status == 200) {
      Swal.fire({
        title: 'Success!',
        text: 'Add Data Success!',
        icon: 'success',
        confirmButtonText: 'Okay',
        timer: 1500
      })
      id.value = ''
      email.value = ''
    }
  } catch (err) {
    console.log(err)
    Swal.fire({
      title: 'Failed',
      text: err.response.data.message,
      icon: 'error',
      confirmButtonText: 'Okay',
      timer: 1500
    })
  }
  isVisible.value = false
}

watchEffect(async () => {
  // if (driverStore.driver.length > 0 && props.isAdd) {
  //   plat_no.value = props.truck[0].plat_no
  // }
  // tipe_truck.value = null

  // assign default tipe truck
  if (tipe_truck.value && props.isAdd) {
    tipe_truck.value = driverStore.driver[0].truck_type.tipe_truck
  }

  if (driverStore.driver.length > 0 && props.isAdd) {
    // jika nama driver berubah maka tipe truck menyesuaikan
    for (let driver of driverStore.driver) {
      if (nama_driver.value === driver.nama_driver) {
        tipe_truck.value = driver.truck_type.tipe_truck
      }
    }
    // assign default nama driver
    if (!nama_driver.value) {
      nama_driver.value = driverStore.driver[0].nama_driver
      console.log(nama_driver.value)
    }
  }
  // assign default plat no
  if (props.truck.length > 0 && props.isAdd) {
    plat_no.value = props.truck[0].plat_no
  }

  //// bermasalah
  if (!props.isAdd && props.isOpen) {
    nama_driver.value = await props.eventHandler.event.title
    tipe_truck.value = await props.eventHandler.event.extendedProps.tipe_truck
    plat_no.value = await props.eventHandler.event.extendedProps.plat_no
    editStart.value = await formatDate(props.eventHandler.event.start)
    editEnd.value = await formatDate(props.eventHandler.event.end)
  }
  if (!props.isAdd && props.isOpen) {
    for (let driver of driverStore.driver) {
      if (nama_driver.value == driver.nama_driver) {
        tipe_truck.value = driver.truck_type.tipe_truck
      }
    }
  }
  //////////////
})

onMounted(async () => {
  await schedulesStore.fetchItemsSchedule()
  await driverStore.fetchItemsDriver()

  console.log(schedulesStore.schedule)
  console.log(driverStore.driver)
})
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container p-3 w-50" style="height: 60vh" v-if="isAdd">
        <div class="text-end">
          <i @click.stop="closeModal" class="btn-transparent pi pi-times fs-5 close modalclose"></i>
        </div>
        <div class="modal-body d-flex align-items-center d-flex flex-column">
          <h3 class="mb-5">Add Truck Schedule</h3>
          <div class="col-sm-8 d-flex mb-3">
            <label for="nama_driver" class="col-sm-2 col-form-label">Driver Name</label>
            <select
              class="form-select"
              id="nama_driver"
              v-model="nama_driver"
              @change="saveSelectedDriverName"
            >
              <option v-for="(item, index) in driverStore.driver" :key="index">
                {{ item.nama_driver }}
              </option>
            </select>
          </div>
          <div class="col-sm-8 d-flex mb-3">
            <label for="plat_no" class="col-sm-2 col-form-label">Plat No:</label>
            <select class="form-select" id="plat_no" v-model="plat_no" @change="saveSelectedPlatNo">
              <option v-for="(item, index) in truck" :key="index">
                {{ item.plat_no }}
              </option>
            </select>
          </div>

          <div class="col-sm-8 d-flex mb-3">
            <label class="col-sm-2 form-label">Tipe Truck</label>
            <input
              type="text"
              placeholder="Tipe Truck"
              v-model="tipe_truck"
              class="form-control"
              disabled
            />
          </div>
        </div>

        <div class="modal-body"></div>
        <br />
        <div class="modal-footer d-flex justify-content-center mt-3">
          <div name="footer">
            <div>
              <button @click.stop="submitHandler" class="btn btn-outline-primary me-2">
                Submit
              </button>
              <button @click.stop="closeModal" class="btn btn-outline-danger">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-container d-flex w-50" v-else-if="!isAdd">
        <div class="modal-body pt-2">
          <legend>Data Truck Schedule</legend>
          <div class="modal-item mb-2">
            <span>Nama Driver: {{ eventHandler.event.title }}</span>
          </div>
          <div class="modal-item mb-2">
            <span>Plat No: {{ eventHandler.event.extendedProps.plat_no }}</span>
          </div>
          <div class="modal-item mb-2">
            <span>Tipe Truck: {{ eventHandler.event.extendedProps.tipe_truck }}</span>
          </div>
          <div class="modal-item mb-2">
            <span
              >Tanggal Berangkat:
              {{
                formatDate(eventHandler.event.start) + ' ' + formatTime(eventHandler.event.start)
              }}</span
            >
          </div>
          <div class="modal-item mb-2">
            <span
              >Tanggal Sampai:
              {{
                formatDate(eventHandler.event.end) + ' ' + formatTime(eventHandler.event.end)
              }}</span
            >
          </div>

          <div class="d-flex justify-content-start">
            <button @click="emit('deleteHandler')" class="btn btn-outline-primary me-2">
              Delete
            </button>
            <button @click="mailModal" class="btn btn-outline-primary me-2">Send Email</button>
          </div>
        </div>
        <br />
        <div class="modal-footer d-flex justify-content-center">
          <div name="footer">
            <div class="text-end">
              <i @click.stop="closeModal" class="btn-transparent pi pi-times fs-5 close"></i>
            </div>
            <legend>Edit event</legend>
            <div class="mb-2">
              <select
                class="form-select"
                id="nama_driver"
                v-model="nama_driver"
                @change="saveSelectedDriverName"
              >
                <option v-for="(item, index) in driverStore.driver" :key="index">
                  {{ item.nama_driver }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <select
                class="form-select"
                id="plat_no"
                v-model="plat_no"
                @change="saveSelectedPlatNo"
              >
                <option v-for="(item, index) in truck" :key="index">
                  {{ item.plat_no }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <input
                type="text"
                placeholder="Tipe Truck"
                v-model="tipe_truck"
                class="form-control"
                disabled
              />
            </div>
            <div class="mb-2">
              <input type="date" v-model="editStart" class="form-control" />
            </div>
            <div class="mb-2">
              <input type="date" v-model="editEnd" class="form-control" />
            </div>
            <div class="mt-2">
              <button class="btn btn-outline-primary me-2" @click="updateEvent">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card flex justify-content-center">
    <Dialog v-model:visible="isVisible" modal header="Input Email" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-5">Isi Alamat Email yang di Tuju!.</span>
      <div class="flex align-items-center gap-3 mb-5 mt-3">
        <label for="email" class="font-semibold w-6rem me-2">Email</label>
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="email"
          placeholder="Isi Email"
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="isVisible = false"
        ></Button>
        <Button type="button" label="Send" @click="sendMail"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
div.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

i.modalclose {
  color: rgb(120, 111, 111);
}

i.modalclose:hover {
  color: rgb(0, 0, 0);
}
</style>

<!-- <script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import { useDriverStore } from '@/stores/driverStore'

import { ref, onMounted, watchEffect } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  isAdd: Boolean,
  eventHandler: Object,
  truck: Object
})

const nama_driver = ref(null)
const tipe_truck = ref(null)
const plat_no = ref(null)
const schedulesStore = useScheduleStore()
const driverStore = useDriverStore()

let editStart = ref('')
let editEnd = ref('')

const emit = defineEmits(['modal-close'])

function closeModal() {
  emit('modal-close')
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const updateEvent = () => {
  const clickInfo = props.eventHandler
  const idItem = clickInfo.event.id

  for (let i in props.truck) {
    if (props.truck[i].plat_no === plat_no.value) {
      tipe_truck.value = props.truck[i].truck_type.tipe_truck
    }
  }
  const data = {
    plat_no: plat_no.value,
    tipe_truck: tipe_truck.value,
    tgl_berangkat: editStart.value,
    tgl_sampai: editEnd.value
  }
  schedulesStore.updateItemSchedule({ idItem, newEditData: data }, clickInfo)
  closeModal()
  emit('clearValue')
  plat_no.value = null
  editStart.value = null
  editEnd.value = null
}

const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
}

watchEffect(async () => {
  // Update tipe_truck based on nama_driver
  if (nama_driver.value) {
    const driver = driverStore.driver.find((d) => d.nama_driver === nama_driver.value)
    if (driver) {
      tipe_truck.value = driver.truck_type.tipe_truck
    } else {
      tipe_truck.value = null
    }
  }

  if (driverStore.driver.length > 0 && props.isAdd) {
    nama_driver.value = driverStore.driver[0].nama_driver
  }

  if (props.truck.length > 0 && props.isAdd) {
    plat_no.value = props.truck[0].plat_no
  }

  if (!props.isAdd && props.isOpen) {
    plat_no.value = await props.eventHandler.event.extendedProps.truck
    editStart.value = await formatDate(props.eventHandler.event.start)
    editEnd.value = await formatDate(props.eventHandler.event.end)
  }
})

onMounted(async () => {
  await schedulesStore.fetchItemsSchedule()
  await driverStore.fetchItemsDriver()
})
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container p-3 w-50" style="height: 60vh" v-if="isAdd">
        <div class="text-end">
          <i @click.stop="closeModal" class="btn-transparent pi pi-times fs-5 close modalclose"></i>
        </div>
        <div class="modal-body d-flex align-items-center d-flex flex-column">
          <h3 class="mb-5">Add Truck Schedule</h3>
          <div class="col-sm-8 d-flex mb-3">
            <label for="nama_driver" class="col-sm-2 col-form-label">Driver Name</label>
            <select class="form-select" id="nama_driver" v-model="nama_driver">
              <option
                v-for="(item, index) in driverStore.driver"
                :key="index"
                :value="item.nama_driver"
              >
                {{ item.nama_driver }}
              </option>
            </select>
          </div>
          <div class="col-sm-8 d-flex mb-3">
            <label for="plat_no" class="col-sm-2 col-form-label">Plat No:</label>
            <select class="form-select" id="plat_no" v-model="plat_no" @change="saveSelectedPlatNo">
              <option v-for="(item, index) in truck" :key="index" :value="item.plat_no">
                {{ item.plat_no }}
              </option>
            </select>
          </div>
          <div class="col-sm-8 d-flex mb-3">
            <label class="col-sm-2 form-label">Tipe Truck</label>
            <input
              type="text"
              placeholder="Tipe Truck"
              v-model="tipe_truck"
              class="form-control"
              disabled
            />
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center mt-3">
          <div name="footer">
            <div>
              <button @click.stop="submitHandler" class="btn btn-outline-primary me-2">
                Submit
              </button>
              <button @click.stop="closeModal" class="btn btn-outline-danger">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-container d-flex w-50" v-else-if="!isAdd">
        <div class="modal-body pt-2">
          <legend>Data Truck Schedule</legend>
          <div class="modal-item mb-2">
            <span>Tipe Truck: {{ eventHandler.event.title }}</span>
          </div>
          <div class="modal-item mb-2">
            <span>Plat No: {{ eventHandler.event.extendedProps.truck }}</span>
          </div>
          <div class="modal-item mb-2">
            <span
              >Tanggal Berangkat:
              {{
                formatDate(eventHandler.event.start) + ' ' + formatTime(eventHandler.event.start)
              }}</span
            >
          </div>
          <div class="modal-item mb-2">
            <span
              >Tanggal Sampai:
              {{
                formatDate(eventHandler.event.end) + ' ' + formatTime(eventHandler.event.end)
              }}</span
            >
          </div>
          <div class="d-flex justify-content-start">
            <button @click="emit('deleteHandler')" class="btn btn-outline-primary me-2">
              Delete
            </button>
          </div>
        </div>
        <br />
        <div class="modal-footer d-flex justify-content-center">
          <div name="footer">
            <div class="text-end">
              <i @click.stop="closeModal" class="btn-transparent pi pi-times fs-5 close"></i>
            </div>
            <legend>Edit event</legend>
            <div class="mb-2">
              <select
                class="form-select"
                id="plat_no"
                v-model="plat_no"
                @change="saveSelectedPlatNo"
              >
                <option v-for="(item, index) in truck" :key="index" :value="item.plat_no">
                  {{ item.plat_no }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <input type="date" v-model="editStart" class="form-control" />
            </div>
            <div class="mb-2">
              <input type="date" v-model="editEnd" class="form-control" />
            </div>
            <div class="mt-2">
              <button class="btn btn-outline-primary me-2" @click="updateEvent">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
div.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

i.modalclose {
  color: rgb(120, 111, 111);
}

i.modalclose:hover {
  color: rgb(0, 0);
}
</style> -->

<!-- <Button label="Show" @click="isVisible = true" />
  <Dialog v-model:visible="isVisible" modal header="Edit Profile" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Update your information.</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="closeModal"></Button>
      <Button type="button" label="Save" @click="closeModal"></Button>
    </div>
  </Dialog> -->
