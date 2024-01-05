document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('city-search-form');
    var cityInput = document.getElementById('city-input');
    var currentWeatherContainer = document.getElementById('current-weather');
    var forecastContainer = document.getElementById('forecast');
    var cityList = document.getElementById('city-list');

    var apiBaseUrl = 'https://api.openweathermap.org/data/2.5';
