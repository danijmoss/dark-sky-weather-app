//Get the user's position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    //Dark Sky API key (unfortunately can't hide the api key)
    var apiKey = "82a8a7e5933363742600b2de987aece4";

    //Dark Sky URL 
    var weatherURL = "https://api.darksky.net/forecast/";

    //Cross-Origin URL to allow use on Chrome
    var corsURL = "https://cors-anywhere.herokuapp.com/";

    //Full Weather Forecast URL
    var fullURL = corsURL + weatherURL + apiKey + "/" + lat + "," + long + "?daily";
    //console.log(fullURL);
      
    
    //-------------------------------------// 
      

    //jQuery JSON call to pull in temperature and icon information
    $.getJSON(fullURL, function(json) {
      //console.log(json);
        
      //Display weather information
     for (i = 0; i < json.daily.data.length; i++) {
         
        var temp = json.daily.data[i].apparentTemperatureMax;
        //console.log(temp);
        $('.temp'+ i).html(temp);
     } 
        

    });
              
              
    //-------------------------------------//   
      
      
    //Variables to get user's location using Google Maps API 
    //Make sure to read Google Maps API Policies
    //https://developers.google.com/maps/documentation/geocoding/policies
    //Key
    var otherAPIKey = "AIzaSyBb4Ihnyr3I4WNRsiGMEdZBU1oJSi75IJM";
    //console.log(otherAPIKey);

    //Google Maps URL
    var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    //console.log(googleURL);

    //Full URL to query address using coordinates
    var addressURL = googleURL + lat + "," + long + "&key=" + otherAPIKey;
    //console.log(addressURL);

    //Holds location of user
    var location;

    //jQuery JSON call to pull in address information
    //Using "for" loop to go through object array
    $.getJSON(addressURL, function(json) {
      for (i = 0; i < json.results.length; i++) {
        location = json.results[1].formatted_address;
        //console.log(location);

        //Display User's location
        $('.location').html(location);
      }
    });

    //Display the current month using Moment.js
    var month = moment().format('M');
    $('#monthNum').html(month);

    //Display the year using Moment.js
    var year = moment().format('YYYY');
    $('#year').html(year);

    //Display current time using Moment.js
    var dateTimeString = moment().format("LT");
    $(".time").html(dateTimeString);

  });
}