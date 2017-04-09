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

function Persistence() {
  return {
    getValue: getValue,
    setValue: setValue,
  };

  function getValue(key, type, fallbackValue) {
    // This is a workaround for DOMException: Failed to read the 'localStorage'
    // property from 'Window': Access is denied for this document.
    try {
      var value = window.localStorage.getItem(key);
      if (value === undefined) {
        return fallbackValue;
      }
      if (value === null) {
        return fallbackValue;
      }
      if (type === 'int') {
        return parseInt(value);
      }
      return value;
    }
    catch(e) {
      return fallbackValue;
    }
  }

  // Returns true if the value was saved successfully
  function setValue(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    }
    catch(e) {
      return false;
    }
  }
}
