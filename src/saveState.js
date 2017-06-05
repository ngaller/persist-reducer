export default function saveState({storageKey, keysToSave}, reducer) {
  return (state, action) => {
    const newState = reducer(state, action)
    if(state && newState !== state) {
      let saveState = newState
      if(keysToSave) {
        let wasChanged = false
        saveState = keysToSave.reduce((acc, k) => {
          acc[k] = newState[k]
          wasChanged = wasChanged || newState[k] !== state[k]
          return acc
        }, {})
        if(!wasChanged)
          return newState
      }
      window.localStorage[storageKey] = JSON.stringify(saveState)
    }
    return newState
  }
}
