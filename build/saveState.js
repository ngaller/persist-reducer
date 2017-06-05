"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveState;
function saveState(_ref, reducer) {
  var storageKey = _ref.storageKey,
      keysToSave = _ref.keysToSave;

  var oldState = {};

  return function (state, action) {
    var newState = reducer(state, action);
    if (newState !== state) {
      if (keysToSave) {
        var wasChanged = false;
        newState = keysToSave.reduce(function (acc, k) {
          acc[k] = newState[k];
          wasChanged = wasChanged || newState[k] !== state[k];
          return acc;
        }, {});
        if (!wasChanged) return newState;
      }
      window.localStorage[storageKey] = JSON.stringify(newState);
    }
    return newState;
  };
}