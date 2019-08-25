const cityForm = document.querySelector("form");

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
  updateCity(city).then(data => {
    console.log(data);
  });
});
