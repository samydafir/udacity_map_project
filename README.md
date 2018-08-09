# README

## Requirements
+ Clone or download this repository
+ Insert Google maps API key into the url at the bottom of `index.html`
+ Insert own flickr API key into the ajax request url in `map.js`
+ All required libraries and frameworks already included
+ Open `index.html` in any web browser
+ done

## Used technologies and APIs
+ Knockout.js 3.4.2
+ Jquery 3.3.1
+ Bootstrap 4.1.3
+ Google maps javascript API v3
+ Wikipedia API
+ Flickr API
+ Font Awesone for menu button icon

## Features
+ Shows interesting places / places to visit in Marrakech, Morocco
+ Clear, 2 part interface (sidebar, map)
+ Sidebar is collapsible for maximum map-space
+ Locations can be filtered using a text-input field
+ Possibility to clear filter and display all locations
+ Responsive design. Built small and scaled up
+ Locations can be set as favourite by clicking the star icon
+ Clicking a location in the list or a marker on the map displays an
  info window above the corresponding marker and adds a bounce animation to
  the marker.
+ Clicking the location or marker again removes the bounce effect.
+ Info windows are closed by clicking the x icon in their top right corner
+ Info windows provide a link to a wikipedia page about the location. The link
  is only included if an article can be found by the API.
+ Info windows also contain a photo of the location. Photos are found using the
  flickr API and also only included if a photo is found

## Disclaimner
+ Used code-parts of previous projects implemented in this course
