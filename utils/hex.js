function twoDigitHexString(decimalValue) {
  if (decimalValue < 16) {
    return '0x0' + decimalValue.toString(16);
  }
  else {
    return '0x' + decimalValue.toString(16);
  }
}

function twoDigitHexArray(decimalArray) {
  var result = [];
  decimalArray.forEach(function (element) {
    var valueToAdd = twoDigitHexString(element);
    result.push(valueToAdd);
  });
  return result;
}
