export const SET_ITEMS = (state, data) => {
  state.items = data
}
export const ADD_ITEM = (state, newItem) => {
  state.items.push(newItem)
}
export const UPDATE_ITEM = (state, updatedItem) => {
  const index = state.items.findIndex((item) => item.no === updatedItem.no)
  if (index !== -1) {
    state.items.splice(index, 1, updatedItem)
  }
}
export const REMOVE_ITEM = (state, noItem) => {
  state.items = state.items.filter((item) => item.no !== noItem)
}
