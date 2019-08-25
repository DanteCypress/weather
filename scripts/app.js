const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = data => {
  const cityDets = data.cityDetails;
  const weather = data.weather;

  //update details template
  details.innerHTML = ` 
    <button id="fButton" type="button" class="btn btn-secondary">F</button>
    <button id="cButton" type="button" class="btn btn-secondary">C</button>
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;</span>
    </div>`;

  // details.addEventListener("click", e => {
  //   e.preventDefault();
  //   newFloat = weather.Temperature.Metric.Value * 1.8 + 32;
  //   console.log(newFloat);
  //   finalFloat = newFloat.toFixed(1);

  //   details.innerHTML = `<button id="fButton" type="button" class="btn btn-secondary">F</button>
  //   <button id="cButton" type="button" class="btn btn-secondary">C</button>
  //   <h5 class="my-3">${cityDets.EnglishName}</h5>
  //   <div class="my-3">${weather.WeatherText}</div>
  //   <div class="display-4 my-4">`;
  //   if (details.classList.contains("fButton")) {
  //     `<span>${finalFloat}</span>`;
  //   }
  //   console.log("hello");
  // });

  //remove d-none if present

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//convert C to F

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weather: weather
  };
};
cityForm.addEventListener("submit", e => {
  e.preventDefault();
  //getting city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
