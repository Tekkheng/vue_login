export const SET_SCHEDULE = (state, data) => {
  state.schedules = data
}
export const ADD_SCHEDULE = (state, newItem) => {
  state.schedules.push(newItem)
}
export const UPDATE_SCHEDULE = (state, updatedItem) => {
  const index = state.schedules.findIndex((item) => item.id === updatedItem.no)
  if (index !== -1) {
    state.schedules.splice(index, 1, updatedItem)
  }
}
export const REMOVE_SCHEDULE = (state, noItem) => {
  state.schedules = state.schedules.filter((item) => item.id !== noItem)
}
