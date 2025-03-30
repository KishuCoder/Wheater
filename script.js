const apiKey = "321cf995d073f42256265f3595ac7f0a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherImage = document.querySelector(".weather img");
const temperatureElement = document.querySelector(".tempature");
const cityElement = document.querySelector(".conutry");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".Wind");

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid API key. Please check your API key.");
            } else {
                throw new Error("City not found");
            }
        }
        
        const data = await response.json();
        
        temperatureElement.innerHTML = `${Math.round(data.main.temp)}°C`;
        cityElement.innerHTML = `${data.name}, ${data.sys.country}`;
        humidityElement.innerHTML = `${data.main.humidity}%`;
        windElement.innerHTML = `${data.wind.speed} km/h`;

        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition.includes("cloud")) {
            weatherImage.src = "images/cloud.png";
        } else if (weatherCondition.includes("rain")) {
            weatherImage.src = "images/rain.png";
        } else if (weatherCondition.includes("clear")) {
            weatherImage.src = "images/clear.png";
        } else if (weatherCondition.includes("snow")) {
            weatherImage.src = "images/snow.png";
        } else {
            weatherImage.src = "images/default.png";
        }
    } catch (error) {
        alert(error.message);
    }
}

searchButton.addEventListener("click", () => {
    fetchWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchWeather(searchBox.value);
    }
});