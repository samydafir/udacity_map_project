var map;
var markers = [];
var infoWindow;

function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  infoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 31.629472, lng: -7.981084},
    mapTypeId: 'hybrid'
  });

  var bounds = new google.maps.LatLngBounds();
  myLocations.forEach(function(location){
    var position = {lat: location.lat, lng: location.lng};
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: location.name,
      animation: google.maps.Animation.DROP,
      description: location.description
      });

    bounds.extend(marker.position);
    marker.setVisible(true);
    marker.addListener('click', function() {
      toggleBounce(this);
      toggleInfoWindow(this);
    });

    markers[location.id] = marker;

  });
  map.fitBounds(bounds);
}

function toggleBounce(marker) {
  if(marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function toggleInfoWindow(marker) {
    if (infoWindow.marker != marker) {
      infoWindow.marker = marker;
      createInfoContent(marker, infoWindow);
      infoWindow.open(map, marker);
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
        marker.setAnimation(null);
      });
    }
  }


function createInfoContent(marker, infoWindow){

    var windowContent = '<h5>' + marker.title + '</h5><br>' +
      marker.description + '<br><br>' +
      '<div>Latitude:' + marker.position.lat() + "<br>Longitude: " +
      marker.position.lng() + '<br></div>';

    infoWindow.setContent(windowContent);
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=\
      ' + marker.title + '&format=json&callback=wikiCalback';
    var result;
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function(response) {
        var article = response[1];
        if(article != ""){
          var result = '<a href="https://www.wikipedia.org/wiki/' + article + '">\
            https://www.wikipedia.org/wiki/' + article + '</a>';
          windowContent = windowContent + "<br>" + result;
          infoWindow.setContent(windowContent);

        }
      }
    });

    $.ajax({
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=e5ea7cc48b031fedcd226be09f950a3a&text=" + marker.title,
      success: function(response) {
        var image_id = (response["photos"]["photo"][0]["id"]);
        $.ajax({
          url: "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=e5ea7cc48b031fedcd226be09f950a3a&photo_id=" + image_id,
          success: function(response){
            var image_url = response["sizes"]["size"][3]["source"];
            windowContent = windowContent + "<br><br><img src='" +
              image_url +"'><br>";
            infoWindow.setContent(windowContent);
          }
        });
      }
    });
}
