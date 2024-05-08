<script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import { ref, onMounted, watchEffect } from 'vue'
// import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  isOpen: Boolean,
  isAdd: Boolean,
  eventHandler: Object,
  truck: Object
})

const emit = defineEmits(['modal-close'])
// const handleSubmit = () => {
//   emit('submit')
// }

// const target = ref(null)
function closeModal() {
  emit('modal-close')
  console.log(props.isOpen)
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

const truck_type = ref(null)
const plat_no = ref(null)
const schedulesStore = useScheduleStore()

let editStart = ref('')
let editEnd = ref('')

const updateEvent = () => {
  const clickInfo = props.eventHandler
  const idItem = clickInfo.event.id

  for (let i in props.truck) {
    if (props.truck[i].plat_no === plat_no.value) {
      truck_type.value = props.truck[i].truck_type.tipe_truck
    }
  }
  const data = {
    plat_no: plat_no.value,
    tipe_truck: truck_type.value,
    tgl_berangkat: editStart.value,
    tgl_sampai: editEnd.value
  }
  schedulesStore.updateItemSchedule({ idItem, newEditData: data, clickInfo })
}

const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
}

const submitHandler = () => {
  closeModal()
  const selectInfo = props.eventHandler
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect() // clear date selection

  for (let i in props.truck) {
    if (plat_no.value === props.truck[i].plat_no) {
      truck_type.value = props.truck[i].truck_type.tipe_truck
    }
  }

  // if (!plat_no.value) {
  //   return 'tidak boleh kosong!'
  // }

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
  console.log(calendarApi)

  const data = {
    plat_no: plat_no.value,
    tipe_truck: truck_type.value,
    tgl_berangkat: selectInfo.startStr,
    tgl_sampai: endDate
    // tgl_sampai: selectInfo.endStr
  }
  schedulesStore.addItemSchedule(data, selectInfo)
  //  set eventHandler.value && isAdd.value = null
  truck_type.value = null
  emit('clearValue')
}

watchEffect(async () => {
  if (props.truck.length > 0) {
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
})
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container p-4 w-50" style="height: 40vh" v-if="isAdd">
        <legend class="mb-5">Add Truck Schedule</legend>
        <div class="modal-body d-flex align-items-center">
          <label for="plat_no" class="col-sm-2 col-form-label">Plat No</label>
          <div class="col-sm-8">
            <select class="form-select" id="plat_no" v-model="plat_no" @change="saveSelectedPlatNo">
              <option v-for="(item, index) in truck" :key="index">
                {{ item.plat_no }}
              </option>
            </select>
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
                <option v-for="(item, index) in truck" :key="index">
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
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
