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
