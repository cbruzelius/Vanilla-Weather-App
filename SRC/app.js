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
  console.log(response.data);
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
let city = "Sunnyvale"
let units = "metric";
let apiURL = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;

axios.get(apiURL).then(displayTemperature);



