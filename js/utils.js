$('#menu-button').click(toggleMenu);

function toggleMenu() {

}

function createInfoContent(marker, infoWindow){

  var windowContent = '<h5>' + marker.title + '</h5>' +
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
      console.log(response);
      if(article != ""){
        var result = '<a href="https://www.wikipedia.org/wiki/' + article + '">\
          https://www.wikipedia.org/wiki/' + article + '</a>';
        infoWindow.setContent(windowContent + "<br>" + result);
      }
    }
  });
}
//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e5ea7cc48b031fedcd226be09f950a3a&text=
//https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=e5ea7cc48b031fedcd226be09f950a3a&photo_id=
