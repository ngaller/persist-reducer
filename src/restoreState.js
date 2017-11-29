import objectPath from 'object-path'

export default function restoreState({storageKey, keysToSave}, defaultState = {}) {
  const ser = typeof window !== 'undefined' && window.localStorage &&
    window.localStorage[storageKey]
  if(ser) {
    try {
      const savedValue = JSON.parse(ser)
      if (savedValue) {
        return (keysToSave || Object.keys(savedValue)).reduce((acc, k) => {
          if(k in savedValue)
            objectPath.set(acc, k, savedValue[k])
          return acc
        }, Object.assign({}, defaultState))
      }
    } catch(e) {
    }
  }
  return defaultState
}
