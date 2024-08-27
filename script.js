const apiKey = f5ce5ee4e44379c59b435b181c99ed5d ; // Replace with your OpenWeatherMap API key

document.getElementById('get-weather').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('city-input').value;
    if (city === '') return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayCurrentWeather(data);
            } else {
                document.getElementById('weather-info').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data</p>`;
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                displayForecast(data);
            }
        })
        .catch(error => {
            document.getElementById('forecast-cards').innerHTML = `<p>Error fetching forecast data</p>`;
        });
}

function displayCurrentWeather(data) {
    const weatherInfo = `
        <p>City: ${data.name}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    const weatherIcon = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
    document.getElementById('weather-info').innerHTML = weatherInfo;
    document.getElementById('weather-icon').innerHTML = weatherIcon;
}

function displayForecast(data) {
    let forecastHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const day = new Date(data.list[i].dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        forecastHTML += `
            <div class="forecast-card">
                <h3>${day}</h3>
                <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="${data.list[i].weather[0].description}">
                <p>Temp: ${data.list[i].main.temp}°C</p>
                <p>${data.list[i].weather[0].description}</p>
            </div>
        `;
    }
    document.getElementById('forecast-cards').innerHTML = forecastHTML;
}
