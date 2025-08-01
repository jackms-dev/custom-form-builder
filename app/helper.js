// Helpers.js
// Collection of helper functions

export function isValidString(str) {
  return typeof str === "string" && str.length > 0;
}

export function normalizeToArray(obj) {
  return Array.isArray(obj) ? obj : [obj];
}
