import objectPath from 'object-path'

export default function saveState({storageKey, keysToSave}, reducer) {
  return (state, action) => {
    const newState = reducer(state, action)
    if(state && typeof window !== 'undefined' &&
      window.localStorage && newState !== state) {
      let saveState = newState
      if(keysToSave) {
        let wasChanged = false
        saveState = keysToSave.reduce((acc, k) => {
          const val = objectPath.get(newState, k)
          acc[k] = val
          wasChanged = wasChanged || val !== objectPath.get(state, k)
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
