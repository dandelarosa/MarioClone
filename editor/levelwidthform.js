function createLevelWidthForm() {
  var elements = [
    '<input id="levelWidth.numCols" type="text" value="" readonly/>',
    '<input type="button" onclick="addColumns(16);" value="Add 16 columns"/>',
    '<input type="button" onclick="deleteLastColumn();" value="Remove last column"/>',
  ]
  document.getElementById('levelWidth').innerHTML = elements.join('');
}
