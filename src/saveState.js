export default function saveState({storageKey, keysToSave}, reducer) {
  let oldState = {}

  return (state, action) => {
    let newState = reducer(state, action)
    if(newState !== state) {
      if(keysToSave) {
        let wasChanged = false
        newState = keysToSave.reduce((acc, k) => {
          acc[k] = newState[k]
          wasChanged = wasChanged || newState[k] !== state[k]
          return acc
        }, {})
        if(!wasChanged)
          return newState
      }
      window.localStorage[storageKey] = JSON.stringify(newState)
    }
    return newState
  }
}
