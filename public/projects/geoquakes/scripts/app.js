// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
var mapData = {
  center: {lat: 30.2682, lng: -97.74295},//defaults to Austin,
  zoom: 3,
  mapTypeId: "roadmap"//'roadmap','satellite'
};

var image = {
  url: "/projects/geoquakes/images/earthquake-512.png",
  size: new google.maps.Size(32, 32),
  scaledSize: new google.maps.Size(32, 32),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(0, 32)
};

//start when document is ready
$(function() {
  //create a new google map object using initial mapData and DOM #map
  map = new google.maps.Map(document.getElementById('map'), mapData);

  //make AJAX call to earthquake.usgs.gov service
  $.ajax({
    method: 'GET',
    url: weekly_quakes_endpoint,
    dataType: 'json',
    success: OnSuccess
    /*,error: OnError*/
  }) // end of AJAX request
});//end of document.ready()

//Executed OnSuccess of AJAX earthquake call
function OnSuccess(resp) {
  resp.features.forEach(function(element, index){
    var mag = element.properties.mag; //Magnitude: features[0].properties.mag
    var place = element.properties.place; //Place: features[0].properties.place
    var description = element.properties.title; //features[0].properties.title
    var url = element.properties.url; //info to more information at Earthquake.usgs.gov
    var pin = {lat: element.geometry.coordinates[1], lng: element.geometry.coordinates[0]};

    //isolate the actual place from a string like: "49km NNW of Lar, Iran"
    if (place.indexOf("km ") !== -1) {
      var num = place.indexOf("of ");
      place = place.substring(num + 3, place.length);
    } // end of if

    //adds a list of links. centers map on earthquake location. (very inefficient)
    $("#geoquakes .info").append(`${index+1}) <a id="location${index}" href="#">${description}</a><br/>`);
    $(`#location${index}`).click(function(e) {
      e.preventDefault();
      map.setCenter(pin);
      map.setZoom(7);
    });

    //content to display in the map info window
    var contentString = `<div id="content"><div id="siteNotice"> </div>`+
            `<h1 id="firstHeading" class="firstHeading">${place}</h1>`+
            `<div id="bodyContent">`+
            `<p><b>Latitude: </b>${pin.lat}</p>` +
            `<p><b>Longitude: </b>${pin.lng}</p>` +
            `<p><b>Links:</b> <a href="${url}">Earthquake.usgs.gov</a> </p>`+
            `</div></div>`;

    var marker = new google.maps.Marker({
                  position: pin,
                  icon: image,
                  map: map,
                  title: place
    });// end of marker variable

    //when user clicks on a marker, an info window pops up
    marker.addListener('click', function() {
          GetInfoWindow(contentString).open(map, marker);
    }); // end of marker event listener

  }); // end of resp.features forEach
}//end of OnSuccess()

//created a google maps InfoWindow object
function GetInfoWindow(text) {
  return new google.maps.InfoWindow({content: text});
} // end of GetInfoWindow
