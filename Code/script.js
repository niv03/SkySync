let map;

function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");
    const chartCanvas = document.getElementById("chart");

    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    const city = cityInput.value;

    if (city.trim() !== "") {
        fetchWeather(city, apiKey, weatherInfo, chartCanvas);
    }
}

function fetchWeather(city, apiKey, weatherInfo, chartCanvas) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            const data = response.data;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            const details = `
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            `;

            weatherInfo.innerHTML = details;

            const historicalData = [
                { date: '2022-01-01', temp: 20 },
                { date: '2022-01-02', temp: 22 },
                { date: '2022-01-03', temp: 18 },
                { date: '2022-01-04', temp: 15 },
                { date: '2022-01-05', temp: 25 }
            ];

            drawTemperatureChart(chartCanvas, historicalData);

            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`)
                .then(response => {
                    const detailedData = response.data;
                    const uvIndex = detailedData.current.uvi;
                    const windSpeed = detailedData.current.wind_speed;

                    const additionalDetails = `
                        <p>UV Index: ${uvIndex}</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;

                    weatherInfo.innerHTML += additionalDetails;
                })
                .catch(error => {
                    console.error("Error fetching detailed weather data:", error);
                });

            displayMap(data.coord.lat, data.coord.lon);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.innerHTML = "Unable to fetch weather data. Please try again.";
        });
}

function drawTemperatureChart(canvas, data) {
    const dates = data.map(entry => entry.date);
    const temperatures = data.map(entry => entry.temp);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    labels: dates
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function suggestCities() {
    const cityInput = document.getElementById("cityInput");
    const suggestedCities = document.getElementById("suggestedCities");

    const googlePlacesApiKey = "YOUR_GOOGLE_PLACES_API_KEY";

    if (cityInput.value.trim() !== "") {
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityInput.value}&types=(cities)&key=${googlePlacesApiKey}`)
            .then(response => {
                const cities = response.data.predictions;
                suggestedCities.innerHTML = "";

                cities.forEach(city => {
                    const listItem = document.createElement("li");
                    listItem.className = "list-group-item";
                    listItem.textContent = city.description;
                    listItem.addEventListener("click", () => {
                        cityInput.value = city.description;
                        suggestedCities.innerHTML = "";
                        fetchWeather(city.description, "YOUR_OPENWEATHERMAP_API_KEY", document.getElementById("weatherInfo"), document.getElementById("chart"));
                    });

                    suggestedCities.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Error fetching suggested cities:", error);
            });
    } else {
        suggestedCities.innerHTML = "";
    }
}

function displayMap(lat, lon) {
    map = L.map('map').setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('City Location')
        .openPopup();
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}
