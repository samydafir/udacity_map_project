var viewModel = function() {
  var self = this;

  this.locations = ko.observableArray([]);
  this.filterText = ko.observable();

  myLocations.forEach(function(location) {
    self.locations.push(new Location(location));
  })

  this.filter = function() {
    var filterString = $('#filter-text').val().toLowerCase();

    this.locations().forEach(function(location) {
      if (!(location.name.toLowerCase().indexOf(filterString) != -1)) {
        location.visible(false);
        markers[location.id].setVisible(false);
      }
    });
  };

  this.clearFilter = function() {
    $('#filter-text').val("");
    this.locations().forEach(function(location) {
      location.visible(true);
    });
    markers.forEach(function(marker) {
      marker.setVisible(true);
    })

  };
};

ko.applyBindings(new viewModel());
