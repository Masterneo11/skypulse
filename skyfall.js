"use strict";
// this is referencing to the button below for get current weather :)
document.addEventListener('DOMContentLoaded', async function (event) {
  const data = await getTwentyFourHourInfo();
  console.log(data);
  // Assuming data is an array of objects with a temperature property
  const weatherElement = document.createElement("div");
  weatherElement.classList.add("WeatherElement");

  let weatherText = `<h2>${data[0].temperature}</h2> <p>${data[0].shortForecast}`;
  weatherElement.innerHTML = weatherText;
  document.body.appendChild(weatherElement); // Append to the body or any other container
  document.getElementById("current").appendChild(weatherElement);
});
// this function gets 24 hour info for weather forecast
const getTwentyFourHourInfo = async () => {
  const response = await fetch("https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly");
  const data = await response.json();
  const twentyFourHourInfos = data.properties.periods.slice(0, 25).map(period => ({
    time: convertDateTime(period.startTime),
    shortForecast: period.shortForecast,
    temperature: period.temperature,
  }));
  return twentyFourHourInfos;
};
// this is referenccing to the button below for get 24 hour weather
// document.getElementById("24hour").addEventListener("click", async () => {
document.addEventListener('DOMContentLoaded', async function () {
  const data = await getTwentyFourHourInfo();
  console.log(data[0]);
  new Chart(
    document.getElementById('twochart'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.time),
        datasets: [
          {
            label: `temperatures`,
            data: data.map(row => row.temperature),
          }
        ]
      }
    }
  );
});

// this is referencing to the button below for get alerts
document.addEventListener('DOMContentLoaded', async function (event) {
  const data = await getAlerts();
  console.log(data);
  let text = `${data.description} <br> Instruction: ${data.instruction}`;
  document.getElementById("alert").innerHTML = text;
});
// below function gets alert info 
const getAlerts = async () => {
  const response = await fetch("https://api.weather.gov/alerts/active?area=UT");
  const data = await response.json();
  console.log(data.title);
  return data.title;
};
//  converting dateTime function. 
function convertDateTime(datetime) {
  const date = new Date(datetime);
  return date.getHours() + `:00`
}

