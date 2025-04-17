icons_weather = {
  Clear: ["fa-solid", "fa-sun"],
  Clouds: ["fa-solid", "fa-cloud-sun"],
  Drizzle: ["fa-solid", "fa-cloud-rain"],
  Mist: ["fa-brands", "fa-cloudflare"],
  Rain: ["fa-solid", "fa-cloud-showers-heavy"],
  Snow: ["fa-solid", "fa-snowflake"],
  Wind: ["fa-solid", "fa-wind"],
};

const api_url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const api_key = "fd3039323cb7cf5f744a58b07f5bb46c";

const display = document.getElementById("display");
const search_button = document.querySelector(".search-icon");
const icon_img = document.querySelector(".logo i");

async function check_weather(city) {
  const response = await fetch(api_url + city + `&appid=${api_key}`);

  // if input invalid we will get bad response
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";

    console.log("---", document.querySelector(".error").style.display);
  } else {
    let data = await response.json();

    console.log(data);

    // update info
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.getElementById("place").innerHTML = data.name;
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

    //  update img with icons_weather arr

    // Remove the old classes
    icon_img.classList.forEach((className) => {
      icon_img.classList.remove(className);
    });

    // Add the new classes
    let new_c = icons_weather[data.weather[0].main];
    icon_img.classList.add(new_c[0], new_c[1], "weather_condition");

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

search_button.addEventListener("click", () => {
  check_weather(display.value);
});
