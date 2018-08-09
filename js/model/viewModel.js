var viewModel = function() {
  var self = this;

  //observable array for locations
  this.locations = ko.observableArray([]);
  this.filterText = ko.observable();

  myLocations.forEach(function(location) {
    self.locations.push(new Location(location));
  })

  /**
   * Iterates all locations and sets the location's visibility attribute to
   * false if the name does not include the filter string
   */
  this.filter = function() {
    var filterString = $('#filter-text').val().toLowerCase();

    this.locations().forEach(function(location) {
      if (!(location.name.toLowerCase().indexOf(filterString) != -1)) {
        location.visible(false);
        markers[location.id].setVisible(false);
      }
    });
  };

  /**
   * simply clears the filter text input field and sets the visible attribute
   * of all locations to true
   */
  this.clearFilter = function() {
    $('#filter-text').val("");
    this.locations().forEach(function(location) {
      location.visible(true);
    });
    markers.forEach(function(marker) {
      marker.setVisible(true);
    })
  };

  /**
   * Handles communication between list and map. A click on a list item toggles
   * the bounce effect of a marker and shows the info window
   */
  this.selectMarker = function() {
    toggleBounce(markers[$(this).attr("id")]);
    showInfoWindow(markers[$(this).attr("id")]);
  };

};

ko.applyBindings(new viewModel());
