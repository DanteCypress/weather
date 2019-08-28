const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
// const button = document.querySelector(".fButton");
const button1 = document.querySelector("button:nth-child(2)");
const forecast = new Forecast();

const updateUI = data => {
  const { cityDetails, weather } = data;

  //update details template
  details.innerHTML = ` 
    <button id="fButton" type="button" class="btn btn-secondary">F</button>
    <button id="cButton" type="button" class="btn btn-secondary">C</button>
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;</span>
    </div>`;
  console.log(data);
  console.log(weather.IsDayTime);
  console.log(button1);

  button1.addEventListener("click", () => {
    console.log("hello");
    details.innerHTML = `<button id="fButton" type="button" class="btn btn-secondary">F</button>
      <button id="cButton" type="button" class="btn btn-secondary">C</button>
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;</span>
    </div>`;
  });

  fButton.addEventListener("click", () => {
    // newFloat = weather.Temperature.Metric.Value * 1.8 + 32;
    // console.log(newFloat);
    // finalFloat = newFloat.toFixed(1);

    details.innerHTML = `<button id="fButton" type="button" class="btn btn-secondary">F</button>
      <button id="cButton" type="button" class="btn btn-secondary">C</button>
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
      <span>${weather.Temperature.Imperial.Value}</span>
      <span>&deg;</span>
    </div>`;
  });

  // day or night cycle
  const iconScr = `images/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconScr);

  let timeSrc = weather.IsDayTime
    ? "images/pictures/day.jpg"
    : "images/pictures/night.jpg";
  // if (weather.IsDayTime) {
  //   timeSrc = "images/pictures/day.jpg";
  // } else {
  //   timeSrc = "images/pictures/night.jpg";
  // }
  time.setAttribute("src", timeSrc);
  //remove d-none if present

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//convert C to F

cityForm.addEventListener("submit", e => {
  e.preventDefault();
  //getting city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  //set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data));
}
