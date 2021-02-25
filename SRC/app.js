//current date//
let now = new Date();
now.getDay();
now.getHours();
now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

//current time//
function formatAMPM(now) {
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hour + ":" + minutes + " " + ampm;
  return strTime;
}
//show local time//
let localTime = formatAMPM(now);
let currentDT=document.querySelector("#current-DT");
currentDT.innerHTML= `${day} ${localTime}`;

let celsiusTemperature=null;

//Display Default Temperature//
setTemperature();

function displayTemperature(response){
  
  celsiusTemperature=response.data.main.temp;

  let temperature= Math.round(celsiusTemperature);
  let city= response.data.name
  let description= response.data.weather[0].description;
  let humidity= response.data.main.humidity;
  let wind= Math.round(response.data.wind.speed);
  let icon=response.data.weather[0].icon;

  let temperatureElement=document.querySelector("#temperature");
  let cityElement=document.querySelector("#city");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let iconElement=document.querySelector("#weather-icon");
  
  temperatureElement.innerHTML=`${temperature}`;
  cityElement.innerHTML=`${city}`;
  descriptionElement.innerHTML=`${description}`;
  humidityElement.innerHTML=`${humidity}`;
  windElement.innerHTML=`${wind}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  iconElement.setAttribute("alt", `${icon}`);   
}


function setTemperature(){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let city = "Sunnyvale";
  let units = "metric";
  let apiURL = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiURL).then(displayTemperature);

  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?";
  let apiURLForecast= `${apiEndpointForecast}q=${city}&units${units}&appid=${apiKey}`;

  axios.get(apiURLForecast).then(displayForecast);
}

  function displayForecast(response){
    console.log (response.data.list[0]);
    let forecastElement = document.querySelector("#one-plus-day");
    let forecast = response.data.list[0];
    forecastElement.innerHTML=`
    <div class="card w-2" id= "one-plus-day">
      <div class="weekday card-header text-center">
        
      </div>
      <div class="card-body text-center">
        <h5> 
          ${Math.round(forecast.main.temp)}°
        </h5>
          <p class="daily-temp">
            <strong>
              <span> H 17</span>° |
            </strong>
            <span>L 7</span>°
          </p>
        <img src="" alt="" class="daily-symbol">
      </div>
    </div>
    `

  }

  //Search City//
function search (city){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let units = "metric";
  let apiURL = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiURL).then(displayTemperature);

  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?";
  let apiURLForecast= `${apiEndpointForecast}q=${city}&units${units}&appid=${apiKey}`;

  axios.get(apiURLForecast).then(displayForecast);
}

function receivesCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", receivesCity)

//Current City//
function getCurrentWeather(event){
  event.preventDefault();
  
  function displayPosition(response){
  celsiusTemperature=response.data.main.temp;
  
  let localTemp= Math.round(celsiusTemperature);
  let localCity=response.data.name;
  let localDescription= response.data.weather[0].description;
  let localHumidity= response.data.main.humidity;
  let localWind= Math.round(response.data.wind.speed);
  let localIcon=response.data.weather[0].icon;

  let temperatureElement=document.querySelector("#temperature");
  let cityElement=document.querySelector("#city");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let iconElement=document.querySelector("#weather-icon");
  
  temperatureElement.innerHTML=`${localTemp}`;
  cityElement.innerHTML=`${localCity}`;
  descriptionElement.innerHTML=`${localDescription}`;
  humidityElement.innerHTML=`${localHumidity}`;
  windElement.innerHTML=`${localWind}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${localIcon}@2x.png`);
  iconElement.setAttribute("alt", `${localIcon}`);
}

function showPosition(position){
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
    let units = "metric";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let localApiURL = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  
    axios.get(localApiURL).then(displayPosition);

  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?";
  let apiURLForecast= `${apiEndpointForecast}q=${city}&units${units}&appid=${apiKey}`;

  axios.get(apiURLForecast).then(displayForecast);
}

navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocalWeather = document.querySelector("#current-city");
currentLocalWeather.addEventListener("click", getCurrentWeather)

//Change Units with Link//
function displayFahrenheit(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement=document.querySelector("#temperature")
  temperatureElement.innerHTML=Math.round (((celsiusTemperature) * 1.8) + 32);
}

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit)

function displayCelsius(event){
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let temperatureElement=document.querySelector("#temperature")
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
}

let celsiusLink =document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius)


