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

let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "7810de17cb3e4ad4b94e69a98fbe80a0";
let units = "metric";
let apiURL = `${apiEndpoint}q=Sunnyvale&units=${units}&appid=${apiKey}`;

axios.get(apiURL).then(showDefaultTemp);

function showDefaultTemp(response){
  let defaultTemp= Math.round(response.data.main.temp);
  let temperature=document.querySelector("#temperature");
  temperature.innerHTML=`${defaultTemp}`;
}

