document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('city-search-form');
    var cityInput = document.getElementById('city-input');
    var currentWeatherContainer = document.getElementById('current-weather');
    var forecastContainer = document.getElementById('forecast');
    var cityList = document.getElementById('city-list');

    var apiBaseUrl = 'https://api.openweathermap.org/data/2.5';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var cityName = cityInput.value.trim();

        if (cityName !== '') {
            // Make API requests for current weather and 5-day forecast
            getCurrentWeather(cityName);
            getForecast(cityName);

            // Add the city to the search history
            addToSearchHistory(cityName);

            // Clear the input field
            cityInput.value = '';
        }
    });

    function getCurrentWeather(cityName) {
        var currentWeatherUrl = `${apiBaseUrl}/weather?q=${cityName}&appid=${apiKey}`;

        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                // Handle and display current weather data
                // Example: Display city name, date, temperature, humidity, wind speed, etc.
                console.log('Current Weather Data:', data);
            })
            .catch(error => console.error('Error fetching current weather:', error));
    }

    function getForecast(cityName) {
        var forecastUrl = `${apiBaseUrl}/forecast?q=${cityName}&appid=${apiKey}`;

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                // Handle and display 5-day forecast data
                // Example: Display date, temperature, humidity, wind speed, etc.
                console.log('Forecast Data:', data);
            })
            .catch(error => console.error('Error fetching forecast:', error));
    }

    