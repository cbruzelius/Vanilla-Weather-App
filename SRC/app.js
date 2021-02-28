 function formatDate(timestamp){
    let now= new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let months =[
      "January", 
      "February", 
      "March", 
      "April", 
      "May", 
      "June", 
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
    ];
    let month = months[now.getMonth()];
    let date = now.getDate();
    let year = now.getFullYear();
    let day = days[now.getDay()];

    var hours = now.getHours();
    var minutes= now.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours%12;
    hours = hours ? hours : 12;
    minutes = minutes <10? "0"+ minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return `${day}, ${month} ${date}, ${year}  ${strTime}`;
  }

 function formatHours(timestamp){
     let now = new Date(timestamp);

    var hours = now.getHours();
    var minutes= now.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours%12;
    hours = hours ? hours : 12;
    minutes = minutes <10? "0"+ minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
 } 

let celsiusTemperature=null;

//Display Default Temperature//
function displayTemperature(response){
  celsiusTemperature=response.data.main.temp;

  document.querySelector("#temperature").innerHTML=Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#description").innerHTML=response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML= response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon").setAttribute("alt", `${response.data.weather[0].icon}`)
  document.querySelector("#current-DT").innerHTML=formatDate(response.data.dt*1000);
}

function displayForecast(response){
  let forecastElement = document.querySelector("#one-plus-day");
  let forecast=null;
  forecastElement.innerHTML=null;
  
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="d-flex flex-row gap-3" id= "one-plus-day">
          <div class="col-12">
              <div class="weekday card-header text-center">
                <p>${formatHours(forecast.dt*1000)}</p>
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
        </div>` 
  }
}

//Search City//
let cityElement=null;

function search(city){
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;  
    axios.get(apiURL).then(displayTemperature);

  let apiURLForecast= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiURLForecast).then(displayForecast);
}
function reset(){
  cityElement.innerHTML=null;
}

function receiveCity(event){
 event.preventDefault();
 cityElement=document.querySelector("#city-input");

 search(cityElement.value); 
 
 cityElement.innerHTML=reset(event);
}

var form = document.querySelector("#search-form");
form.addEventListener("submit",receiveCity)
 
//Get Current City//
function showPosition(position){
  let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
  let localApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  let apiURLForecast= `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(localApiURL).then(displayTemperature);
  axios.get(apiURLForecast).then(displayForecast);
}

function getPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton= document.querySelector("#current-city");
currentButton.addEventListener("click", getPosition)

//Change Units with Link//
function displayFahrenheit(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  document.querySelector("#temperature").innerHTML=Math.round (((celsiusTemperature) * 1.8) + 32);
}

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit)

function displayCelsius(event){
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  document.querySelector("#temperature").innerHTML= Math.round(celsiusTemperature);
}

let celsiusLink =document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius)

search("Sunnyvale");