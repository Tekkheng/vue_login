<!-- <template>
  <div class="card">
    <div class="card-header">
      <h1>Data List Users:</h1>
    </div>
    <div class="card-body">
      <h1>{{ user.title }}</h1>
      <h1>{{ user.id }}</h1>
    </div>
  </div>
</template>

<script setup>
const { user } = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style> -->

<script setup>
import { ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useScheduleStore } from '@/stores/scheduleStore'
import NavbarComponent from './NavbarComponent.vue'
import useTruckStore from '@/stores/truckStore'
// import EventModal from './EventModal.vue'
// import { formatDate } from '@fullcalendar/core'

const schedulesStore = useScheduleStore()
const truckStore = useTruckStore()
const truck_type = ref('')

const eventAdd = ref(null)
const isAdd = ref(null)

const saveSelectedPlatNo = (event) => {
  plat_no.value = event.target.value
}
const plat_no = ref('')

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev today next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  //// ubah language
  // locale: 'fr',

  //// ubah text button
  // buttonText: {
  //   today: 'hai',
  //   month: 'he',
  //   week: 'hi',
  //   day: 'ho'
  // },
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  events: [], // Initialize events array
  //   eventDidMount: function (info) {
  //     if (info.event.extendedProps.status === 'done') {
  //       // Change background color of row
  //       info.el.style.backgroundColor = 'red'

  //       // Change color of dot marker
  //       var dotEl = info.el.getElementsByClassName('fc-event-dot')[0]
  //       if (dotEl) {
  //         dotEl.style.backgroundColor = 'white'
  //       }
  //     }
  //   },
  select: handleDateSelect,
  eventClick: handleEventClick
  // eventsSet: handleEvents
})
// const currentEvents = ref([])

// const eventGuid = ref(0)
// function createEventId() {
//   return String(eventGuid.value++)
// }

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends // update a property
}

// function handleEventClick(clickInfo) {
//   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//     schedulesStore.deleteItemSchedule(clickInfo.event._def.publicId, clickInfo.event)
//   }
// }

function handleEventClick(clickInfo) {
  eventAdd.value = clickInfo
  isAdd.value = false
  openModal()
}

// handle add data
function handleDateSelect(selectInfo) {
  eventAdd.value = selectInfo
  isAdd.value = true
  openModal()
}
const isModalOpened = ref(false)
const openModal = () => {
  isModalOpened.value = true
}
const closeModal = () => {
  isModalOpened.value = false
}

const submitHandler = () => {
  closeModal()
  const selectInfo = eventAdd.value
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect() // clear date selection

  for (let truck of truckStore.truck) {
    if (plat_no.value === truck.plat_no) {
      truck_type.value = truck.truck_type.tipe_truck
    }
  }

  // if (!plat_no.value) {
  //   return 'tidak boleh kosong!'
  // }

  let endDate = new Date(selectInfo.endStr)
  endDate.setDate(endDate.getDate() - 1)
  endDate = formatDate(endDate)

  calendarApi.addEvent({
    title: truck_type.value,
    start: selectInfo.startStr,
    end: selectInfo.endStr,
    allDay: selectInfo.allDay,
    extendedProps: {
      truck: plat_no.value,
      status: 'done'
    }
  })

  const data = {
    plat_no: plat_no.value,
    tipe_truck: truck_type.value,
    tgl_berangkat: selectInfo.startStr,
    tgl_sampai: endDate
  }
  const isCalendar = true
  schedulesStore.addItemSchedule(data, isCalendar)
  eventAdd.value = null
  isAdd.value = null
  console.log(isAdd.value)
}

function deleteHandler() {
  closeModal()
  const clickInfo = eventAdd.value
  schedulesStore.deleteItemSchedule(clickInfo.event._def.publicId, clickInfo.event)
  eventAdd.value = null
  isAdd.value = null
  // console.log(isAdd.value)
}

// function handleEvents(events) {
//   currentEvents.value = events
//   console.log(events)
//   console.log(currentEvents)
// }

onMounted(async () => {
  // let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
  await schedulesStore.fetchItemsSchedule()
  await truckStore.fetchItems()

  if (truckStore.truck && truckStore.truck.length > 0) {
    plat_no.value = truckStore.truck[0].plat_no
  }

  if (schedulesStore.schedule) {
    const events = schedulesStore.schedule.map((truck) => ({
      id: truck.id,
      title: truck.tipe_truck,
      // start: new Date(truck.tgl_berangkat + 'T12:00:00'),
      // end: new Date(truck.tgl_sampai + 'T16:00:00'),
      start: new Date(truck.tgl_berangkat + 'T09:00:00'),
      end: new Date(truck.tgl_sampai + 'T16:00:00'),
      //   backgroundColor: 'green',
      extendedProps: {
        truck: truck.plat_no,
        status: 'done'
      }
    }))
    calendarOptions.value.events = events
    // console.log('Calendar Events:', events)
  }
})
</script>

<template>
  <NavbarComponent />
  <div class="demo-app">
    <div class="demo-app-main">
      <label class="ms-5">
        <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle" />
        toggle weekends
      </label>
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <div class="fc-content">
            <!-- <b>{{ arg.timeText }}</b> -->
            <i>{{ arg.event.title }}</i>
            <span v-if="arg.event.extendedProps && arg.event.extendedProps.truck">
              - Plat {{ arg.event.extendedProps.truck }}</span
            >
            <!-- <i> - {{ arg.event.extendedProps.status }}</i> -->
            <!-- Menampilkan jam berangkat dan jam sampai -->
            <!-- <br /> -->
            <!-- <i>{{ formatTime(arg.event.start) }} - {{ formatTime(arg.event.end) }}</i> -->
          </div>
        </template>
      </FullCalendar>
    </div>
  </div>

  <div v-if="isModalOpened" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target" v-if="isAdd">
        <h4>Add Truck Schedule</h4>
        <br />
        <div class="modal-header">
          <label for="plat_no" class="col-sm-2 col-form-label">Plat No</label>
          <div class="col-sm-8">
            <select class="form-select" id="plat_no" v-model="plat_no" @change="saveSelectedPlatNo">
              <option v-for="(item, index) in truckStore.truck" :key="index">
                {{ item.plat_no }}
              </option>
            </select>
          </div>
        </div>

        <div class="modal-body"></div>
        <br />
        <div class="modal-footer d-flex justify-content-center">
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

      <div class="modal-container" ref="target" v-else-if="!isAdd">
        <h4>Data Truck Schedule</h4>
        <br />
        <div class="modal-header"></div>

        <div class="modal-body">
          <div class="modal-item mb-2">
            <span>Tipe Truck: {{ eventAdd.event.title }}</span>
          </div>
          <div class="modal-item mb-2">
            <span>Plat No: {{ eventAdd.event.extendedProps.truck }}</span>
          </div>
          <div class="modal-item mb-2">
            <span
              >Tanggal Berangkat:
              {{ formatDate(eventAdd.event.start) + ' ' + formatTime(eventAdd.event.start) }}</span
            >
          </div>
          <div class="modal-item mb-2">
            <span
              >Tanggal Sampai:
              {{ formatDate(eventAdd.event.end) + ' ' + formatTime(eventAdd.event.end) }}</span
            >
          </div>
        </div>
        <br />
        <div class="modal-footer d-flex justify-content-center">
          <div name="footer">
            <div>
              <button @click.stop="deleteHandler" class="btn btn-outline-primary me-2">
                Delete
              </button>
              <button @click.stop="closeModal" class="btn btn-outline-danger">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family:
    Arial,
    Helvetica Neue,
    Helvetica,
    sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  max-width: 1100px;
  margin: 0 auto;
}

/* style warna calendar*/
.fc-event {
  /* background-color: rgb(255, 179, 0) !important; */
  border: 1px solid transparent;
}
.fc-daygrid-day-number {
  color: black !important;
  text-decoration: none !important;
}

/* .fc-daygrid-day.fc-day-today {
  background-color: red !important;
} */

.fc-col-header-cell-cushion {
  color: black;
  text-decoration: none;
}

/* for modal */
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
