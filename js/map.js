var map;
var markers = [];
var infoWindow;

/**
 * Initialised the map by calling the google maps api. also sets markers,
 * bounds
 */
function initMap() {
  infoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 31.629472, lng: -7.981084},
    mapTypeId: 'hybrid'
  });

  /*bound are expanded after each marker is added, such that then map is
    perfectly aligned after insertion of the last marker */
  var bounds = new google.maps.LatLngBounds();

  // Loop locations and create a marker for each
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
    // initially all markers are visible
    marker.setVisible(true);
    // add listener with calls to bounce marker and show info window
    marker.addListener('click', function() {
      toggleBounce(this);
      showInfoWindow(this);
    });

    /*
     * insert markert into array containing all markers indexed by their id to
     * find them quickly. In a real-world application locations would be most
     * probably stored in a database with identifying ids.
     */
    markers[location.id] = marker;

  });
  map.fitBounds(bounds);
}

/**
 * Simply sets the bounce effect on the given marker
 */
function toggleBounce(marker) {
  if(marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

/**
 * Shows the info window for the specified marker. Also adds a listener with
 * functions to close the info window and stop the bounce effect.
 */
function showInfoWindow(marker) {
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

/**
 * Creates the info-window's content.
 * Error handling:
 * - Information is only displayed if the request succeeded. If no wikipedia
     article is found, a message is shown.
   - The first flickr search returns a photo id- If this request is not
     successful, the second request is not even triggered. An image is only
     displayed if both requests succeed. Otherwise no image is included.
 */
function createInfoContent(marker, infoWindow){

    // Default content taken from the marker. Always available.
    var windowContent = '<h5>' + marker.title + '</h5><br>' +
      marker.description + '<br><br>' +
      '<div>Latitude:' + marker.position.lat() + "<br>Longitude: " +
      marker.position.lng() + '<br></div>';

    // Sets the default content
    infoWindow.setContent(windowContent);
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=\
      ' + marker.title + '&format=json&callback=wikiCalback';
    var result;
    /* AJAX request to fetch the first article about the location
      from wikipedia */
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function(response) {
        var article = response[1];
        if(article != ""){
          var result = '<a href="https://www.wikipedia.org/wiki/' + article +
            '">More information from Wikipedia</a>';
          windowContent = windowContent + "<br>" + result;
          infoWindow.setContent(windowContent);
        } else {
          windowContent = windowContent + "<br><em>Unfortunately no" +
          " wikipedia articles could be found for this loation</em>";
          infoWindow.setContent(windowContent);
        }
      }
    });
    /*
     * Use flickr's image search API to find photos  for a location. The API
     * returns image ids. On success a second ajax request is created
     * retrieving the actual photo url for the correct site which is then used
     * in the img tag.
     * Error handling:
     * - If no image is found for a given search string or an image_id cannot
         be resolved to an actual image a message is included in the info
         window saying so.
     */
    var imagErrorText = "<br><br><em>Unfortunately no " +
      " image could be found for the this location</em>";
    $.ajax({
      url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search'+
        '&format=json&nojsoncallback=1&'+
        'api_key=e5ea7cc48b031fedcd226be09f950a3a&text=' + marker.title,
      success: function(response) {
        var image_id = (response["photos"]["photo"]);
        //check if any images found
        if(image_id.length > 0) {
          //second ajax call to get the actual images
          $.ajax({
            url: ('https://api.flickr.com/services/rest/?'+
              'method=flickr.photos.getSizes&format=json&nojsoncallback=1&'+
              'api_key=e5ea7cc48b031fedcd226be09f950a3a&photo_id='
              + image_id[0]["id"]),
            success: function(response){
              //only status "ok" is accepted
              if(response['stat'] === "ok") {
                //insert the image into the infoWindow
                var image_url = response["sizes"]["size"][3]["source"];
                windowContent = windowContent + "<br><br><img src='" +
                  image_url +"'><br>";
                infoWindow.setContent(windowContent);
              //handle different status codes
              }else {
                infoWindow.setContent(windowContent + " " + imagErrorText);
              }
            },
            //handle ajax errors
            error: function() {
              infoWindow.setContent(windowContent + " " + imagErrorText);
            }
          });
        //handle no images found
        } else {
          infoWindow.setContent(windowContent + " " + imagErrorText);
        }
      },
      //handle ajax errors
      error: function() {
        infoWindow.setContent(windowContent + " " + imagErrorText);
      }
    });
}
