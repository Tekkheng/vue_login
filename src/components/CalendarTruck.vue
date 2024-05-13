<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useScheduleStore } from '@/stores/scheduleStore'
import NavbarComponent from './NavbarComponent.vue'
import useTruckStore from '@/stores/truckStore'
import EventModal from './EventModal.vue'
// import EventModal from './EventModal.vue'

const schedulesStore = useScheduleStore()
const truckStore = useTruckStore()

let eventHandler = ref(null)
let isAdd = ref(null)

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
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventResize: handlerEventDrop,
  eventDrop: handlerEventDrop
  // eventsSet: handleEvents
})

// const currentEvents = ref([])

// function handleEvents(events) {
//   currentEvents.value = events
//   console.log(events)
//   console.log(currentEvents)
// }

// const eventGuid = ref(0)
// function createEventId() {
//   return String(eventGuid.value++)
// }

function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends // update a property
}

// function handleEventClick(clickInfo) {
//   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//     schedulesStore.deleteItemSchedule(clickInfo.event._def.publicId, clickInfo.event)
//   }
// }

function deleteHandler() {
  closeModal()
  const clickInfo = eventHandler.value
  const current_id = clickInfo.event.id
  schedulesStore.deleteItemSchedule(current_id, clickInfo.event)
  isAdd.value = null
  eventHandler.value = null
}

// update ui calendar event
const isUpdate = ref(null)
function handlerEventDrop(clickInfo) {
  eventHandler.value = clickInfo
  isAdd.value = false
  isUpdate.value = true
  openModal()

  // console.log(clickInfo.event.title, clickInfo.event.startStr, clickInfo.event.endStr)
  // const event = clickInfo.event
  // const idItem = event.id
  // // console.log(event)
  // const data = {
  //   plat_no: event.extendedProps.truck,
  //   tipe_truck: event.title,
  //   tgl_berangkat: event.startStr,
  //   tgl_sampai: event.endStr
  // }
  // console.log(
  //   `seluruh data eventdrop, ${data.plat_no}, ${data.tipe_truck}, ${data.tgl_berangkat}, ${data.tgl_sampai}, ${idItem}`
  // )
  // console.log(event)
  // schedulesStore.updateItemSchedule({ idItem, newEditData: data, clickInfo })
}

function handleEventClick(clickInfo) {
  // set eventHandler && isAdd untuk kondisi if add atau show
  eventHandler.value = clickInfo
  isAdd.value = false
  // set isModalOpened = true
  openModal()
}

// handle add data
function handleDateSelect(selectInfo) {
  // set eventHandler && isAdd untuk kondisi if add atau show
  eventHandler.value = selectInfo
  isAdd.value = true

  // set isModalOpened = true
  openModal()
}
const isModalOpened = ref(false)
const openModal = () => {
  isModalOpened.value = true
}
const closeModal = () => {
  if (isUpdate.value) {
    eventHandler.value.revert()
  }
  isModalOpened.value = false
  isUpdate.value = null
}

const clearValue = () => {
  eventHandler.value = null
  isAdd.value = null
  isUpdate.value = null
}

watchEffect(() => {
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

onMounted(async () => {
  // let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
  await schedulesStore.fetchItemsSchedule()
  await truckStore.fetchItems()

  if (truckStore.truck && truckStore.truck.length > 0) {
    plat_no.value = truckStore.truck[0].plat_no
    console.log(plat_no.value)
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

  <EventModal
    :isOpen="isModalOpened"
    :isAdd="isAdd"
    :eventHandler="eventHandler"
    :truck="truckStore.truck"
    @clearValue="clearValue"
    @modal-close="closeModal"
    name="first-modal"
    @deleteHandler="deleteHandler"
  >
    <!-- <template #header>Custom header</template>
    <template #content>Custom content</template>
    <template #footer>Custom content</template> -->
  </EventModal>
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
