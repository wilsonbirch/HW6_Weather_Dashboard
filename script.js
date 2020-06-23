

      // Performing an AJAX request with the queryURL to receive the current weather report
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=be3ec8db9db08c35a36bef393013c2cb",
        method: "GET"
      }).then(function(response) {
          console.log(response);
          $("#currentCityName").text("Toronto");
          var tempC = response.main.temp - 273.15;
          tempC = tempC.toFixed(1);
          $("#currentCityTemp").text("Temperature: "+ tempC +" °C");

      })

      // Performing an AJAX request with the queryURL to receive the 5 day forecast report
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=be3ec8db9db08c35a36bef393013c2cb",
        method: "GET"
      }).then(function(response) {
          console.log(response);
      })