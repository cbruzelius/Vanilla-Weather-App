  function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];


    var hours = date.getHours();
    var minutes= date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours%12;
    hours = hours ? hours : 12;
    minutes = minutes <10? "0"+ minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return `${day} ${strTime}`;
  
}

 function formatHours(timestamp){
     let date = new Date(timestamp);

    var hours = date.getHours();
    var minutes= date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours%12;
    hours = hours ? hours : 12;
    minutes = minutes <10? "0"+ minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
 } 


let celsiusTemperature=null;

//Display Default Temperature//
setTemperature();

function displayTemperature(response){
  console.log(response.data)
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
  let dateTimeElement=document.querySelector("#current-DT");
  
  temperatureElement.innerHTML=`${temperature}`;
  cityElement.innerHTML=`${city}`;
  descriptionElement.innerHTML=`${description}`;
  humidityElement.innerHTML=`${humidity}`;
  windElement.innerHTML=`${wind}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  iconElement.setAttribute("alt", `${icon}`);
  dateTimeElement.innerHTML= formatDate(response.data.dt*1000) 
}
function displayForecast(response){
  console.log (response.data.list[0]);
  let forecastElement=null;
  forecastElement = document.querySelector("#one-plus-day");

  let forecast=null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML = `
    <div class="row" id= "one-plus-day">
      <div class="col-sm-3">
        <div class="card w-2" id= "one-plus-day">
          <div class="weekday card-header text-center">
            ${formatHours(forecast.dt*1000)}
          </div>
            <div class="card-body text-center">
              <h2> 
                ${Math.round(forecast.main.temp)}°
              </h2>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" class="daily-symbol">
                  <p class="daily-temp">
                    ${forecast.weather[0].description}
                      </br>
                    <strong>
                      <span> H ${Math.round(forecast.main.temp_max)}</span>° |
                    </strong>
                    <span>L ${Math.round(forecast.main.temp_min)} </span>°
                  </p>
              </div>
            </div>
        </div>
      </div>` 
  }
}

function setTemperature(){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let city = "Sunnyvale";
  let units = "metric";
  let apiURL = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiURL).then(displayTemperature);

  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?";
  let apiURLForecast= `${apiEndpointForecast}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiURLForecast).then(displayForecast);
}



  //Search City//
function search (city){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let units = "metric";
  let apiURL = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiURL).then(displayTemperature);

  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?";
  let apiURLForecast= `${apiEndpointForecast}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiURLForecast).then(displayForecast);
}

function receivesCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", receivesCity)

//Get Current City//
function getLocalPosition(event){
  event.preventDefault();

  function displayTemperature(response){
    console.log(response.data)
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
    let dateTimeElement=document.querySelector("#current-DT");
    
    temperatureElement.innerHTML=`${temperature}`;
    cityElement.innerHTML=`${city}`;
    descriptionElement.innerHTML=`${description}`;
    humidityElement.innerHTML=`${humidity}`;
    windElement.innerHTML=`${wind}`;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    iconElement.setAttribute("alt", `${icon}`);
    dateTimeElement.innerHTML= formatDate(response.data.dt*1000) 
  }

  function displayForecast(response){
    console.log (response.data.list[0]);
    let forecastElement=null;
    forecastElement = document.querySelector("#one-plus-day");

    let forecast=null;

    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML = `
      <div class="row" id= "one-plus-day">
        <div class="col-sm-3">
          <div class="card w-2" id= "one-plus-day">
            <div class="weekday card-header text-center">
              ${formatHours(forecast.dt*1000)}
            </div>
              <div class="card-body text-center">
                <h2> 
                  ${Math.round(forecast.main.temp)}°
                </h2>
                  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" class="daily-symbol">
                    <p class="daily-temp">
                      ${forecast.weather[0].description}
                        </br>
                      <strong>
                        <span> H ${Math.round(forecast.main.temp_max)}</span>° |
                      </strong>
                      <span>L ${Math.round(forecast.main.temp_min)} </span>°
                    </p>
                </div>
              </div>
          </div>
        </div>` 
    }
  }

  function showPosition(position){
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
    let units = "metric";
    let latitude = position.coords.lat;
    let longitude = position.coords.lon;
    let localApiURL = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  
    axios.get(localApiURL).then(displayTemperature);

  let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?";
  let apiURLForecast= `${apiEndpointForecast}q=${city}&units${units}&appid=${apiKey}`;

  axios.get(apiURLForecast).then(displayForecast);
}

navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocalWeather = document.querySelector("#current-city");
currentLocalWeather.addEventListener("click", getLocalPosition)

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


