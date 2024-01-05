document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('city-search-form');
    const cityInput = document.getElementById('city-input');
    const currentWeatherContainer = document.getElementById('current-weather');
    const forecastContainer = document.getElementById('forecast');
    const cityList = document.getElementById('city-list');

    const apiKey = '7278480015497fdde12934a5c1cce9f2'; // Replace with your OpenWeatherMap API key
    const apiBaseUrl = 'https://api.openweathermap.org/data/2.5';
