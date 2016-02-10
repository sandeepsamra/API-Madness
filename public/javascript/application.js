
$(document).ready(function() {

var API_KEY = "MDowMGVhNWJjZS1kMDNkLTExZTUtOWYyYS1kMzIwMWQ3ZDVhZjc6RUFMVVpUMTlPRkNtVHNRaXZjQUgxclp1T2dVQ3l3NXZIWEJ3";

var beerTemplate = _.template($('#beer-template').html());

function getBeerList(name) {
  $.ajax({
    url: 'https://lcboapi.com/products',
    data: {q: name},
    method: 'GET',
    headers: { 'Authorization': "TOKEN " + API_KEY }
  }).then(function(data) {    // Parse result into the webpage
    for(var i = 0; i < data.result.length; i++) {
      var beer = data.result[i];
      var output = beerTemplate({
        name: beer.name,
        origin: beer.origin,
        image: beer.image_thumb_url
      });
      console.log(output);
      // console.log(beerTemplate);
      $('#beer-table-results tbody').append(output);
    }
  });
}

  $('#searchInput').on('keyup', _.debounce(function(event) {
    var input = $(event.target).val();

    if (input.length < 3) return;
    $('#beer-table-results tbody').html('');
    getBeerList(input);
  }, 1000));
  // Get results
});
