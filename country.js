function displayCountryDetails(country) {
  const countryDetailsContainer = document.getElementById("country-details");
  countryDetailsContainer.innerHTML = "";

  const flag = document.createElement("img");
  flag.src = country.flags.png;
  flag.alt = `${country.name.common} flag`;
  flag.width = 425;
  flag.height = 150;


  const countryName = document.createElement("h2");
  countryName.textContent = country.name.common;

  const region = document.createElement("p");
  region.textContent = `Region: ${country.region}`;

  const topLevelDomain = document.createElement("p");
  topLevelDomain.textContent = `Top Level Domain: ${country.tld[0]}`;

  const population = document.createElement("p");
  population.textContent = `Population: ${country.population.toLocaleString()}`;

  const capital = document.createElement("p");
  capital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;

  const area = document.createElement("p");
  area.textContent = `Area: ${country.area.toLocaleString()} km²`;

  const languages = document.createElement("p");
  languages.textContent = `Languages: ${Object.values(country.languages).join(', ')}`;

  // Append all elements to the container
  countryDetailsContainer.appendChild(flag);
  countryDetailsContainer.appendChild(countryName);
  countryDetailsContainer.appendChild(topLevelDomain);
  countryDetailsContainer.appendChild(capital);
  countryDetailsContainer.appendChild(region);
  countryDetailsContainer.appendChild(population);
  countryDetailsContainer.appendChild(area);
  countryDetailsContainer.appendChild(languages);
}

// Event listener for back button
document.getElementById("back-button").addEventListener("click", () => {
  window.history.back();
});

// Display details once the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const countryData = JSON.parse(localStorage.getItem("selectedCountry"));
  if (countryData) {
    displayCountryDetails(countryData);
  } else {
    console.error("No country data found in localStorage.");
  }
});
