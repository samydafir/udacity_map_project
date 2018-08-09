/**
 * The location class represents the model and contains general information
 * about the location, as well as providing a method to toggle a location'
 * favourite status
 */
var Location = function(object) {
  this.id = object.id;
  this.name = object.name;
  this.description = object.description;
  this.lat = object.lat;
  this.lng = object.lng;
  this.favourite = ko.observable(object.favourite);
  this.visible = ko.observable(object.visible);

  this.toggleFavourite = function() {
    this.favourite(!this.favourite());
  };
};
