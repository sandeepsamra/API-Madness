
$(document).ready(function() {

var API_KEY = "MDowMGVhNWJjZS1kMDNkLTExZTUtOWYyYS1kMzIwMWQ3ZDVhZjc6RUFMVVpUMTlPRkNtVHNRaXZjQUgxclp1T2dVQ3l3NXZIWEJ3";

var drinkTemplate = _.template($('#drink-template').html());

function getDrinkList(name) {
  $.ajax({
    url: 'https://lcboapi.com/products',
    data: {q: name},
    method: 'GET',
    headers: { 'Authorization': "TOKEN " + API_KEY }
  }).then(function(data) {
    for(var i = 0; i < data.result.length; i++) {
      var drink = data.result[i];
      var output = drinkTemplate({
        name: drink.name,
        origin: drink.origin,
        image: drink.image_thumb_url
      });

      $('#drink-table-results tbody').append(output);
    }
  });
}

  $('#searchInput').on('keyup', _.debounce(function(event) {
    var input = $(event.target).val();

    if (input.length < 3) return;
    $('#drink-table-results tbody').html('');
    getDrinkList(input);
  }, 1000));

});
