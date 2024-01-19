// Constants for URLs
var apiBaseUrl = 'https://api.openweathermap.org/data/2.5';
var geoUrl = 'https://api.openweathermap.org/geo/1.0';
var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// API key
var apiKey = '7278480015497fdde12934a5c1cce9f2';

// HTML element references
var citySearchForm = document.getElementById('city-search-form');
var searchInput = document.getElementById('city-input');
var searchBtn = document.getElementById('search-btn');
var searchTypeSelector = document.getElementById('search-type');
var currentDateEl = document.getElementById('current-date');

// Current Weather Display HTML elements
var currentWeatherDescEl = document.getElementById('current-weather-desc');
var currentTempEl = document.getElementById('current-temp');
var currentHumidityEl = document.getElementById('current-humidity');
var currentWindSpeedEl = document.getElementById('current-windspeed');

// 5-Day Forecast Display HTML elements
var forecastDay1El = document.getElementById('forecast-day-1');
var forecastDay2El = document.getElementById('forecast-day-2');
var forecastDay3El = document.getElementById('forecast-day-3');
var forecastDay4El = document.getElementById('forecast-day-4');
var forecastDay5El = document.getElementById('forecast-day-5');

// Event listeners
citySearchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    handleSearch();
    pushHistory();
});

searchBtn.addEventListener('click', function () {
    window.scrollTo(0, 0);
});

// Functions
function handleSearch() {
    var searchValue = searchInput.value.trim();
    if (searchValue !== '') {
        if (searchTypeSelector.value === 'City') {
            getCityForecast(searchValue);
        } else {
            getZipForecast(searchValue);
        }
        searchInput.value = '';
        if (currentDateEl) {
            currentDateEl.textContent = dayjs().format('M/D/YYYY');
        }
    } else {
        alert('Please enter a location');
    }
}

function pushHistory() {
    // Your code to push the search history
    console.log('Pushing to search history...');
}

function showRandomForecast() {
    var randomLat = getRandomLatitude();
    var randomLon = getRandomLongitude();
    showRandomForecastFromCoordinates(randomLat, randomLon);
}

function showRandomForecastFromCoordinates(lat, lon) {
    let latLonUrl = `${apiBaseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(latLonUrl)
        .then(handleApiResponse)
        .then(displayRandomForecast)
        .then(() => {
            let fiveDayUrl = `${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
            return fetch(fiveDayUrl);
        })
        .then(handleApiResponse)
        .then(display5DayForecast)
        .catch(handleError);
}

function displayRandomForecast(data) {
    // Your code to display the random forecast based on the data
    console.log("Displaying random forecast:", data);
}

function display5DayForecast(data) {
    const forecastList = data.list.slice(0, 5); // Take the first 5 days
    const forecastElements = [forecastDay1El, forecastDay2El, forecastDay3El, forecastDay4El, forecastDay5El];

    forecastList.forEach((forecast, index) => {
        forecastElements[index].textContent = `${dayjs(forecast.dt_txt).format('M/D/YYYY')}: ${forecast.weather[0].description}`;
    });
}

function getCityForecast(cityName) {
    let geoCityUrl = `${geoUrl}/direct?q=${cityName}&limit=5&appid=${apiKey}`;
    fetch(geoCityUrl)
        .then(handleApiResponse)
        .then(data => {
            if (data.length !== 0) {
                let lat = data[0].lat;
                let lon = data[0].lon;
                showRandomForecastFromCoordinates(lat, lon);
                displayCurrentCityForecast(data);
                showFiveDayForecast();
                hideHeroSection();
                showWeatherSection();
            } else {
                alert('Please enter a valid location');
            }
        })
        .catch(handleError);
}

function displayCurrentCityForecast(data) {
    currentWeatherDescEl.textContent = data[0].weather[0].description;
    currentTempEl.textContent = `${data[0].main.temp} °F`;
    currentHumidityEl.textContent = `Humidity: ${data[0].main.humidity}%`;
    currentWindSpeedEl.textContent = `Wind Speed: ${data[0].wind.speed} mph`;
}

function hideHeroSection() {
    // Placeholder for hiding the hero section
    console.log("Hiding hero section...");
}

function showFiveDayForecast() {
    console.log("Showing 5-day forecast...");
}

function showWeatherSection() {
    console.log("Showing weather section...");
}

function handleApiResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Error: ${response.status}`);
    }
}

function handleError(error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
}

// Initialize the application
function init() {
    // Initialization code goes here
}

// Call the init function after the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    init();
});
