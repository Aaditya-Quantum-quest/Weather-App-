


// Selecting all Inputs
let search = document.querySelector("#search");
let city = document.querySelector("#city");
let temperature = document.querySelector("#temperature");
let clouds = document.querySelector("#clouds");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");

// Selecting form
let form = document.querySelector('form');

// API Key & Base URL
let api_key = '82f38e5372434316a9763031251906';
const baseURL = `https://api.weatherapi.com/v1/current.json`;

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload
    if (search.value !== '') {
        searchWeather(search.value);
        search.value = '';
    }
});

const searchWeather = (cityName) => {
    let url = `${baseURL}?key=${api_key}&q=${cityName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (!data.error) {
                city.querySelector('figcaption').innerText = data.location.name;

                temperature.querySelector('#span1').innerText = data.current.temp_c + " °C";

                document.querySelector('.description').innerText = data.current.condition.text;

                clouds.innerText = data.current.cloud + " %";

                humidity.innerText = data.current.humidity + " %";

                pressure.innerText = data.current.pressure_mb + " mb";
            } else {
                alert("City not found!");
            }
        })
        .catch(err => {
            console.error("Error fetching weather data:", err);
            alert("Something went wrong. Please try again.");
        });
};
