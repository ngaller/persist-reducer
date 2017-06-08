export default function restoreState({storageKey, keysToSave}, defaultState = {}) {
  const ser = typeof window !== 'undefined' && window.localStorage &&
    window.localStorage[storageKey]
  if(ser) {
    try {
      let state = JSON.parse(ser)
      if (state) {
        if (keysToSave) {
          state = keysToSave.reduce((acc, k) => {
            if(k in state)
              acc[k] = state[k]
            return acc
          }, {})
        }
        return Object.assign({}, defaultState, state)
      }
    } catch(e) {
    }
  }
  return defaultState
}
