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


//Display Temperature//
function displayTemperature(response){
  let defaultTemp= Math.round(response.data.main.temp);
  let defaultCity= response.data.name
  let defaultDescription= response.data.weather[0].description;
  let defaultHumidity= response.data.main.humidity;
  let defaultWind= Math.round(response.data.wind.speed);
  let defaultIcon=response.data.weather[0].icon;
 
 
  let temperatureElement=document.querySelector("#temperature");
  let cityElement=document.querySelector("#city");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let iconElement=document.querySelector("#weather-icon");
  
  temperatureElement.innerHTML=`${defaultTemp}`;
  cityElement.innerHTML=`${defaultCity}`;
  descriptionElement.innerHTML=`${defaultDescription}`;
  humidityElement.innerHTML=`${defaultHumidity}`;
  windElement.innerHTML=`${defaultWind}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${defaultIcon}@2x.png`);
  iconElement.setAttribute("alt", `${defaultIcon}`);

}

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let city = "Sunnyvale";
  let units = "metric";
  let apiURL = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiURL).then(displayTemperature);

  //Search City//
function search (city){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let units = "metric";
  let apiURL = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiURL).then(displayTemperature);
}

function recievesCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  search(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", recievesCity)

//Current City//
function getCurrentWeather(event){
  event.preventDefault();

  function displayPosition(response){
  let localTemp= Math.round(response.data.main.temp);
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
}

navigator.geolocation.getCurrentPosition(showPosition);
}


let currentLocalWeather = document.querySelector("#current-city");
currentLocalWeather.addEventListener("click", getCurrentWeather);

