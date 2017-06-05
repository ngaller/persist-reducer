"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restoreState;
function restoreState(_ref) {
  var storageKey = _ref.storageKey,
      keysToSave = _ref.keysToSave;
  var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var ser = window.localStorage[storageKey];
  if (ser) {
    try {
      var state = JSON.parse(ser);
      if (state) {
        if (keysToSave) {
          state = keysToSave.reduce(function (acc, k) {
            acc[k] = state[k];
            return acc;
          }, {});
        }
        return Object.assign({}, defaultState, state);
      }
    } catch (e) {}
  }
  return defaultState;
}