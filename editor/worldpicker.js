function createWorldPicker() {
  var worlds = [
    '1-1',
    '1-2',
    '1-3',
    '1-4',
    '2-1',
    '2-2',
    '2-3',
    '2-4',
    '3-1',
    '3-2',
    '3-3',
    '3-4',
    '4-1',
    '4-2',
    '4-3',
    '4-4',
    '5-1',
    '5-2',
    '5-3',
    '5-4',
    '6-1',
    '6-2',
    '6-3',
    '6-4',
    '7-1',
    '7-2',
    '7-3',
    '7-4',
    '8-1',
    '8-2',
    '8-3',
    '8-4',
  ];

  var elements = [];
  elements.push('Select a World:');
  elements.push('<select id="worldSelect" onchange="selectWorld();">');
  worlds.forEach(function(element) {
    option = '<option id="select' + element + '" value="' + element
      + '">World ' + element + '</option>';
    elements.push(option);
  });

  var innerHTML = elements.join('');
  document.getElementById('worldPicker').innerHTML = innerHTML;
}
