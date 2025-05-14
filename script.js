async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = "Loading...";

  try {
    const geocodeRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geocodeData = await geocodeRes.json();
    if (!geocodeData.results || geocodeData.results.length === 0) {
      resultDiv.innerHTML = "City not found.";
      return;
    }

    const { latitude, longitude, name, country } = geocodeData.results[0];

    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherRes.json();

    const { temperature, windspeed, weathercode } = weatherData.current_weather;

    resultDiv.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>Temperature: ${temperature}°C</p>
      <p>Wind Speed: ${windspeed} km/h</p>
      <p>Weather Code: ${weathercode}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error fetching weather data.";
    console.error(error);
  }
}
