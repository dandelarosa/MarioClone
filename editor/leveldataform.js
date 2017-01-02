function createLevelDataForm() {
  var elements = [
    '<input id="levelData.data" type="text" value=""/>',
    '<input type="submit" value="Update grid"/>',
  ]
  document.getElementById('levelData').innerHTML = elements.join('');
}
