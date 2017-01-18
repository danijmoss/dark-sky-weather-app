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
        
     //----Display weather information------------//
        
     //Set up the loop to go through the daily array    
     for (i = 0; i < json.daily.data.length; i++) {
         
        //Retrieve temp data and display on page 
        var temp = Math.round(json.daily.data[i].apparentTemperatureMax); 
        //console.log(Ctemp);  
        $('.temp' + i).html(temp + "&deg;F"); 
        //console.log(temp);
         
         tempChange = 0;
         
         $('#convertTemp').click(function() {
             for (i = 0; i < json.daily.data.length; i++) {
                
                 if (tempChange === 0) {
                    //Retrieve temp data and display on page 
                    var temp = Math.round(json.daily.data[i].apparentTemperatureMax); 
                    var Ctemp = Math.round((temp - 32) / 1.8);
                    //console.log(Ctemp);
                    $('.temp' + i).html(Ctemp + "&deg;C");    

                    tempChange = 1; 
                 }
                 else { 

                     $('.temp' + i).html(Ftemp + "&deg;F");    
                     
                 }
                 tempChange = 0;
                
             }
         });
         
        //Retrieve icon data and display on page  
        var icon = json.daily.data[i].icon;
        $('.icon' + i).html("<i class='wi wi-forecast-io-" + icon + "'></i>");
        
        //Retrieve summary data and display on page  
        var desc = json.daily.data[i].summary;
        $('.desc' + i).html(desc); 
         
        //Set up day name and display on page  
        var dayName = moment().add(i, "day").format("ddd");
        $('.day' + i).html(dayName);
         
        //Set up day date and display on page  
        var dayNum = moment().add(i, "day").format("D");
        $('.date' + i).html(dayNum);
            
     }   

    });
              
              
    //-------------------------------------//  
      
      
      
      
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