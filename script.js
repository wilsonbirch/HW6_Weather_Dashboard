

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: "api.openweathermap.org/data/2.5/weather?q=Ottawa&api_key=07271f26d162d3364a0ceebb18e7b9eb",
        method: "GET"
      }).then(function(response) {
          console.log(response);
      })