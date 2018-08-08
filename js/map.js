var map;
var markers = [];
var infoWindow;

function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  infoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 31.629472, lng: -7.981084},
    zoom: 14
  });

  myLocations.forEach(function(location){
    var position = {lat: location.lat, lng: location.lng};
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: location.name,
      animation: google.maps.Animation.DROP
      });

    marker.setVisible(true);
    marker.addListener('click', function() {
      toggleBounce(this);
      toggleInfoWindow(this);
    });

    markers[location.id] = marker;
  });
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
