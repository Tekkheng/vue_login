// import TruckStore from '@/store'
// import { computed, onMounted } from 'vue'

// let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// const truckSchedule = computed(() => TruckStore.state.schedules)
// console.log(truckSchedule.value)

// onMounted(() => {
//   console.log(truckSchedule.value)
//   TruckStore.dispatch('fetchItemsSchedule')
//   console.log('goblok')
// })

// export const truk = [
//   {
//     title: 'truk',
//     plat_no: '238sdd',
//     tgl_berangkat: '2024-05-02',
//     tgl_sampai: '2024-05-08'
//   },
//   {
//     title: 'truk',
//     plat_no: '3fd8sdd',
//     tgl_berangkat: '2024-05-03',
//     tgl_sampai: '2024-05-05'
//   },
//   {
//     title: 'truk',
//     plat_no: '2sadsdd',
//     tgl_berangkat: '2024-05-05',
//     tgl_sampai: '2024-05-11'
//   },
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: '2024-05-07' + 'T12:00:00',
//     end: '2024-05-09' + 'T12:00:00'
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: todayStr + 'T12:00:00'
//   },
//   {
//     id: createEventId(),
//     title: 'truk A',
//     start: todayStr + 'T12:00:00'
//   }
// ]

// function addTruckEvents(events) {
//   truk.forEach((truck) => {
//     events.push({
//       id: createEventId(),
//       title: truck.title,
//       start: truck.tgl_berangkat,
//       end: truck.tgl_sampai,
//       extendedProps: {
//         plat_no: truck.plat_no
//       }
//     })
//   })
// }

// export const INITIAL_EVENTS = []

// // Function to create event ID
// export function createEventId() {
//   return String(eventGuid++)
// }

// // Add truck events to the initial events
// addTruckEvents(INITIAL_EVENTS)

// import TruckStore from '@/store'
// import { computed, onMounted } from 'vue'

// let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// const truckSchedule = computed(() => TruckStore.state.schedules)
// console.log(truckSchedule.value)

// onMounted(() => {
//   console.log(truckSchedule.value)
//   TruckStore.dispatch('fetchItemsSchedule')
//   console.log('goblok')
// })

// export const truk = [
//   {
//     title: 'truk',
//     plat_no: '238sdd',
//     tgl_berangkat: '2024-05-02',
//     tgl_sampai: '2024-05-08'
//   },
//   {
//     title: 'truk',
//     plat_no: '3fd8sdd',
//     tgl_berangkat: '2024-05-03',
//     tgl_sampai: '2024-05-05'
//   },
//   {
//     title: 'truk',
//     plat_no: '2sadsdd',
//     tgl_berangkat: '2024-05-05',
//     tgl_sampai: '2024-05-11'
//   },
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: '2024-05-07' + 'T12:00:00',
//     end: '2024-05-09' + 'T12:00:00'
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: todayStr + 'T12:00:00'
//   },
//   {
//     id: createEventId(),
//     title: 'truk A',
//     start: todayStr + 'T12:00:00'
//   }
// ]

// function addTruckEvents(events) {
//   truk.forEach((truck) => {
//     events.push({
//       id: createEventId(),
//       title: truck.title,
//       start: truck.tgl_berangkat,
//       end: truck.tgl_sampai,
//       extendedProps: {
//         plat_no: truck.plat_no
//       }
//     })
//   })
// }

// export const INITIAL_EVENTS = [
//   {
//     id: 'dd',
//     title: 'Truck',
//     start: '2024-05-02',
//     end: '2024-05-05',
//     extendedProps: {
//       plat_no: 'sauyuDs2'
//     }
//   },
//   {
//     id: 'asd',
//     title: 'Trucks',
//     start: '2024-05-08',
//     end: '2024-05-11',
//     extendedProps: {
//       plat_no: 'adduDs2'
//     }
//   }
// ]

// // Function to create event ID
// export function createEventId() {
//   return String(eventGuid++)
// }

// // Add truck events to the initial events
// addTruckEvents(INITIAL_EVENTS)
