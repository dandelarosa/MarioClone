function setStoredValue(key, value) {
  // Check for browser compatibility
  if (typeof(Storage) === "undefined") {
    return;
  }
  window.localStorage.setItem(key, value);
}

function getStoredValue(key, fallbackValue) {
  // Check for browser compatibility
  if (typeof(Storage) === "undefined") {
    return fallbackValue;
  }
  return window.localStorage.getItem(key);
}
