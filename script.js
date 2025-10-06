
let search = document.querySelector("#search");
let city = document.querySelector("#city");
let temperature = document.querySelector("#temperature");
let visibility = document.querySelector("#visibility");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let feelsLike = document.querySelector("#feelsLike");
let uvIndex = document.querySelector("#uvIndex");
let pressure = document.querySelector("#pressure");
let description = document.querySelector("#description");
let weatherIcon = document.querySelector("#weatherIcon");
let weatherIconFont = document.querySelector("#weatherIconFont");
let form = document.querySelector('form');
let loading = document.querySelector('#loading');
let result = document.querySelector('#result');

let api_key = '82f38e5372434316a9763031251906';
const baseURL = `https://api.weatherapi.com/v1/current.json`;

// Weather condition to icon mapping
const weatherIcons = {
    // Sunny/Clear
    'sunny': 'https://openweathermap.org/img/wn/01d@2x.png',
    'clear': 'https://openweathermap.org/img/wn/01n@2x.png',
    // Partly Cloudy
    'partly cloudy': 'https://openweathermap.org/img/wn/02d@2x.png',
    // Cloudy
    'cloudy': 'https://openweathermap.org/img/wn/03d@2x.png',
    'overcast': 'https://openweathermap.org/img/wn/04d@2x.png',
    // Rain
    'patchy rain possible': 'https://openweathermap.org/img/wn/09d@2x.png',
    'light rain': 'https://openweathermap.org/img/wn/10d@2x.png',
    'moderate rain': 'https://openweathermap.org/img/wn/10d@2x.png',
    'heavy rain': 'https://openweathermap.org/img/wn/10d@2x.png',
    // Thunderstorm
    'thundery outbreaks possible': 'https://openweathermap.org/img/wn/11d@2x.png',
    // Snow
    'patchy snow possible': 'https://openweathermap.org/img/wn/13d@2x.png',
    'light snow': 'https://openweathermap.org/img/wn/13d@2x.png',
    // Mist/Fog
    'mist': 'https://openweathermap.org/img/wn/50d@2x.png',
    'fog': 'https://openweathermap.org/img/wn/50d@2x.png'
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (search.value !== '') {
        searchWeather(search.value);
        search.value = '';
    }
});

const getWeatherIcon = (condition, isDay) => {
    const conditionLower = condition.toLowerCase();

    // Check specific conditions first
    if (weatherIcons[conditionLower]) {
        return weatherIcons[conditionLower];
    }

    // Fallback logic based on keywords
    if (conditionLower.includes('rain')) {
        return 'https://openweathermap.org/img/wn/10d@2x.png';
    } else if (conditionLower.includes('cloud')) {
        return 'https://openweathermap.org/img/wn/04d@2x.png';
    } else if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
        return isDay ? 'https://openweathermap.org/img/wn/01d@2x.png' : 'https://openweathermap.org/img/wn/01n@2x.png';
    } else if (conditionLower.includes('snow')) {
        return 'https://openweathermap.org/img/wn/13d@2x.png';
    } else if (conditionLower.includes('thunder')) {
        return 'https://openweathermap.org/img/wn/11d@2x.png';
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
        return 'https://openweathermap.org/img/wn/50d@2x.png';
    }

    // Default fallback
    return 'https://openweathermap.org/img/wn/04d@2x.png';
};

const searchWeather = (cityName) => {
    loading.classList.add('active');
    result.style.opacity = '0.5';

    let url = `${baseURL}?key=${api_key}&q=${cityName}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            loading.classList.remove('active');
            result.style.opacity = '1';

            if (!data.error) {
                city.querySelector('figcaption').innerText = data.location.name.toUpperCase();
                temperature.querySelector('#span1').innerText = Math.round(data.current.temp_c);
                description.innerText = data.current.condition.text;

                // Enhanced weather data
                visibility.innerText = data.current.vis_km + " km";
                humidity.innerText = data.current.humidity + "%";
                windSpeed.innerText = data.current.wind_kph + " km/h";
                feelsLike.innerText = Math.round(data.current.feelslike_c) + "°C";
                uvIndex.innerText = data.current.uv;
                pressure.innerText = data.current.pressure_mb + " hPa";

                // Update weather icon with enhanced logic
                const isDay = data.current.is_day === 1;
                const iconUrl = getWeatherIcon(data.current.condition.text, isDay);
                weatherIcon.src = iconUrl;

                // Add animation
                result.style.animation = 'none';
                setTimeout(() => {
                    result.style.animation = 'fadeIn 0.6s ease-out';
                }, 10);
            } else {
                alert("City not found! Please try another city.");
            }
        })
        .catch(err => {
            loading.classList.remove('active');
            result.style.opacity = '1';
            console.error("Error fetching weather data:", err);
            alert("Something went wrong. Please try again.");
        });
};

// Initialize with default city
window.addEventListener('load', () => {
    searchWeather('London');
});