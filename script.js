//pull last search city and display weatehr data
var searchCity = localStorage.getItem("lastSearch");
var searchCityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=be3ec8db9db08c35a36bef393013c2cb"
var searchHistory = [];
var j = 0;

function writeStoredCities(){
    i=0;
    var storedSearchCities = localStorage.getItem("History");
    if (storedSearchCities !== null){
    searchedCities= JSON.parse(storedSearchCities);
    for (i=0; i<=searchedCities.length; i++){
    var newHistory = $("<p>").text(searchedCities[i]);
    newHistory.addClass("history");
    newHistory.attr("data-name", searchedCities[i])
    var historyCard = $("#citySearchHistory");
    historyCard.append(newHistory);
}}}


writeStoredCities();


//using the last searched city make the ajax call to the open weather API
$.ajax({
    url: searchCityURL,
    method: "GET"
}).then(function(response) {

    //for building, comment out later
    //console.log(response);

    //display the search city name for the current weather card
    $("#currentCityName").text(searchCity + ", " + moment().format('MMMM Do YYYY'));

    //convert temperature to celsius and post to current weather card
    var tempC = response.main.temp - 273.15;
    tempC = tempC.toFixed(1);
    $("#currentCityTemp").text("Temperature: "+ tempC +" °C");

    //write current city humidity to html
    $("#currentCityHumidity").text("Humidity: "+ response.main.humidity);

    //write current city Wind Speed to html
    var windSpeed = response.wind.speed*3.6;
    windSpeed = windSpeed.toFixed(1);
    $("#currentCityWindSpeed").text("Wind Speed: "+ windSpeed +" km/h");

    //write current city humidity to html
    $("#currentCityHumidity").text("Humidity: "+ response.main.humidity);

    //call for current UV index using current latitude and longitude
    currentLat = response.coord.lat
    currentLong = response.coord.lon
    var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=be3ec8db9db08c35a36bef393013c2cb&lat=" + currentLat + "&lon=" + currentLong;

    //Use the last ajax call's coordinates to call for the UV data for that city
    $.ajax({
        url: UVqueryURL,
        method: "GET"
    }).then(function(UVresponse) {

        //log the response for build
        //console.log(UVresponse);

        //write UV index to html
        $("#currentCityUV").text("UV index: "+ UVresponse.value);

        //change background colour of UV index to show how dangerous
        var currentCityUV = $("#currentCityUV");

        if (UVresponse.value >= 8){
            currentCityUV.attr("style", "color: red")
        }

        if (UVresponse.value < 8 && UVresponse.value >= 5 ){
            currentCityUV.attr("style", "color: yellow; background-color: grey")
        }

        if (UVresponse.value < 5 ){
            currentCityUV.attr("style", "color: green")
        }

    })
        
    //using the past searched city, call for the 5 day forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=be3ec8db9db08c35a36bef393013c2cb";

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response) {

        //console.log(response);
        //write the corresponding date and temp/humidity data 
        $("#dayOne").text(moment().add(1,'days').format("MMM Do"));
        $("#dayOneTemp").text("Temp: " + (response.list[0].main.temp - 273.15).toFixed(2) +" °C");
        $("#dayOneHumidity").text("Humidity: " + (response.list[0].main.humidity));
    
        $("#dayTwo").text(moment().add(2,'days').format("MMM Do"));
        $("#dayTwoTemp").text("Temp: " + (response.list[1].main.temp - 273.15).toFixed(2) +" °C");
        $("#dayTwoHumidity").text("Humidity: " + (response.list[1].main.humidity));
    
        $("#dayThree").text(moment().add(3,'days').format("MMM Do"));
        $("#dayThreeTemp").text("Temp: " + (response.list[2].main.temp - 273.15).toFixed(2) +" °C");
        $("#dayThreeHumidity").text("Humidity: " + (response.list[2].main.humidity));
    
        $("#dayFour").text(moment().add(4,'days').format("MMM Do"));
        $("#dayFourTemp").text("Temp: " + (response.list[3].main.temp - 273.15).toFixed(2) +" °C");
        $("#dayFourHumidity").text("Humidity: " + (response.list[3].main.humidity));
    
        $("#dayFive").text(moment().add(5,'days').format("MMM Do"));
        $("#dayFiveTemp").text("Temp: " + (response.list[4].main.temp - 273.15).toFixed(2) +" °C");
        $("#dayFiveHumidity").text("Humidity: " + (response.list[4].main.humidity));
        })
    })



// Performing an AJAX request with the queryURL to receive the current weather report for a new searched city
$("#searchcityform").on("submit", function(event){

    event.preventDefault();
    var searchCity = $("#searchcityform input").val();
    console.log(searchCity)
    var searchCityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=be3ec8db9db08c35a36bef393013c2cb"

    $.ajax({
        url: searchCityURL,
        method: "GET"
    }).then(function(response) {

        //for building, comment out later
        //console.log(response);

        //display the search city name for the current weather card
        $("#currentCityName").text(searchCity + ", " + moment().format('MMMM Do YYYY'));

        //convert temperature to celsius and post to current weather card
        var tempC = response.main.temp - 273.15;
        tempC = tempC.toFixed(1);
        $("#currentCityTemp").text("Temperature: "+ tempC +" °C");

        //write current city humidity to html
        $("#currentCityHumidity").text("Humidity: "+ response.main.humidity);

        //write current city Wind Speed to html
        var windSpeed = response.wind.speed*3.6;
        windSpeed = windSpeed.toFixed(1);
        $("#currentCityWindSpeed").text("Wind Speed: "+ windSpeed +" km/h");

        //write current city humidity to html
        $("#currentCityHumidity").text("Humidity: "+ response.main.humidity);

        //call for current UV index using current latitude and longitude
        currentLat = response.coord.lat
        currentLong = response.coord.lon
        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=be3ec8db9db08c35a36bef393013c2cb&lat=" + currentLat + "&lon=" + currentLong;
 
        $.ajax({
            url: UVqueryURL,
            method: "GET"
        }).then(function(UVresponse) {

            //log the response for build
            //console.log(UVresponse);

            //write UV index to html
            $("#currentCityUV").text("UV index: "+ UVresponse.value);

            //change background colour of UV index to show how dangerous
            var currentCityUV = $("#currentCityUV");

            if (UVresponse.value >= 8){
                currentCityUV.attr("style", "color: red")
            }

            if (UVresponse.value < 8 && UVresponse.value >= 5 ){
                currentCityUV.attr("style", "color: yellow; background-color: grey")
            }

            if (UVresponse.value < 5 ){
                currentCityUV.attr("style", "color: green")
            }

        })
        
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=be3ec8db9db08c35a36bef393013c2cb";

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            //console.log(response);
        
            //write the corresponding date and temp/humidity data 
            $("#dayOne").text(moment().add(1,'days').format("MMM Do"));
            $("#dayOneTemp").text("Temp: " + (response.list[0].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayOneHumidity").text("Humidity: " + (response.list[0].main.humidity));
        
            $("#dayTwo").text(moment().add(2,'days').format("MMM Do"));
            $("#dayTwoTemp").text("Temp: " + (response.list[1].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayTwoHumidity").text("Humidity: " + (response.list[1].main.humidity));
        
            $("#dayThree").text(moment().add(3,'days').format("MMM Do"));
            $("#dayThreeTemp").text("Temp: " + (response.list[2].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayThreeHumidity").text("Humidity: " + (response.list[2].main.humidity));
        
            $("#dayFour").text(moment().add(4,'days').format("MMM Do"));
            $("#dayFourTemp").text("Temp: " + (response.list[3].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayFourHumidity").text("Humidity: " + (response.list[3].main.humidity));
        
            $("#dayFive").text(moment().add(5,'days').format("MMM Do"));
            $("#dayFiveTemp").text("Temp: " + (response.list[4].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayFiveHumidity").text("Humidity: " + (response.list[4].main.humidity));
        })


        var newHistory = $("<p>");
        newHistory.text(searchCity);
        newHistory.addClass("history");
        newHistory.attr("data-name", searchCity)
        var historyCard = $("#citySearchHistory");
        historyCard.append(newHistory);
        localStorage.setItem ("lastSearch", searchCity)

        searchHistory[j] = searchCity;
        console.log(searchHistory)
        j++;
        localStorage.setItem("History", JSON.stringify(searchHistory))

      })
})

$(".history").on("click", function(){

    var searchCity = $(this).attr("data-name");
    console.log(searchCity);
    var searchCityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=be3ec8db9db08c35a36bef393013c2cb"

    $.ajax({
        url: searchCityURL,
        method: "GET"
    }).then(function(response) {

        //for building, comment out later
        //console.log(response);

        //display the search city name for the current weather card
        $("#currentCityName").text(searchCity + ", " + moment().format('MMMM Do YYYY'));

        //convert temperature to celsius and post to current weather card
        var tempC = response.main.temp - 273.15;
        tempC = tempC.toFixed(1);
        $("#currentCityTemp").text("Temperature: "+ tempC +" °C");

        //write current city humidity to html
        $("#currentCityHumidity").text("Humidity: "+ response.main.humidity);

        //write current city Wind Speed to html
        var windSpeed = response.wind.speed*3.6;
        windSpeed = windSpeed.toFixed(1);
        $("#currentCityWindSpeed").text("Wind Speed: "+ windSpeed +" km/h");

        //write current city humidity to html
        $("#currentCityHumidity").text("Humidity: "+ response.main.humidity);

        //call for current UV index using current latitude and longitude
        currentLat = response.coord.lat
        currentLong = response.coord.lon
        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=be3ec8db9db08c35a36bef393013c2cb&lat=" + currentLat + "&lon=" + currentLong;
 
        $.ajax({
            url: UVqueryURL,
            method: "GET"
        }).then(function(UVresponse) {

            //log the response for build
            //console.log(UVresponse);

            //write UV index to html
            $("#currentCityUV").text("UV index: "+ UVresponse.value);

            //change background colour of UV index to show how dangerous
            var currentCityUV = $("#currentCityUV");

            if (UVresponse.value >= 8){
                currentCityUV.attr("style", "color: red")
            }

            if (UVresponse.value < 8 && UVresponse.value >= 5 ){
                currentCityUV.attr("style", "color: yellow; background-color: grey")
            }

            if (UVresponse.value < 5 ){
                currentCityUV.attr("style", "color: green")
            }

        })
        
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=be3ec8db9db08c35a36bef393013c2cb";

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            //console.log(response);
        
            //write the corresponding date and temp/humidity data 
            $("#dayOne").text(moment().add(1,'days').format("MMM Do"));
            $("#dayOneTemp").text("Temp: " + (response.list[0].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayOneHumidity").text("Humidity: " + (response.list[0].main.humidity));
        
            $("#dayTwo").text(moment().add(2,'days').format("MMM Do"));
            $("#dayTwoTemp").text("Temp: " + (response.list[1].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayTwoHumidity").text("Humidity: " + (response.list[1].main.humidity));
        
            $("#dayThree").text(moment().add(3,'days').format("MMM Do"));
            $("#dayThreeTemp").text("Temp: " + (response.list[2].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayThreeHumidity").text("Humidity: " + (response.list[2].main.humidity));
        
            $("#dayFour").text(moment().add(4,'days').format("MMM Do"));
            $("#dayFourTemp").text("Temp: " + (response.list[3].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayFourHumidity").text("Humidity: " + (response.list[3].main.humidity));
        
            $("#dayFive").text(moment().add(5,'days').format("MMM Do"));
            $("#dayFiveTemp").text("Temp: " + (response.list[4].main.temp - 273.15).toFixed(2) +" °C");
            $("#dayFiveHumidity").text("Humidity: " + (response.list[4].main.humidity));
        })
})

})
     
     // Performing an AJAX request with the queryURL to receive the 5 day forecast report
      