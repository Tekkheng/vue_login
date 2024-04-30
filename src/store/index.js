import { createStore } from 'vuex'
import { SET_ITEMS, ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM } from './truck/mutations'
import { fetchItems, addItem, updateItem, deleteItem } from './truck/actions'

import {
  SET_SCHEDULE,
  ADD_SCHEDULE,
  UPDATE_SCHEDULE,
  REMOVE_SCHEDULE
} from './truckSchedule/mutations'

import {
  fetchItemsSchedule,
  addItemSchedule,
  updateItemSchedule,
  deleteItemSchedule
} from './truckSchedule/actions'

const TruckStore = createStore({
  state: {
    items: [],
    schedules: []
  },
  mutations: {
    // truckItemsHandler
    SET_ITEMS,
    ADD_ITEM,
    UPDATE_ITEM,
    REMOVE_ITEM,

    // truckScheduleHandler
    SET_SCHEDULE,
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    REMOVE_SCHEDULE
  },
  actions: {
    // truckItemsHandler
    fetchItems,
    updateItem,
    deleteItem,
    addItem,

    // truckScheduleHandler
    fetchItemsSchedule,
    updateItemSchedule,
    deleteItemSchedule,
    addItemSchedule
  }
  // getters: {
  //   getAllItems: (state) => state.items,
  //   getItemById: (state) => (no) => state.items.find((item) => item.no === no)
  // }
})
export default TruckStore
