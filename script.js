const countryList = document.getElementById("country-list");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const nextPageButton = document.getElementById("next-page");
const prevPageButton = document.getElementById("prev-page");
const pageInfo = document.getElementById("page-info");

let countries = [];
let filteredCountries = [];
let currentPage = 1;
let countriesPerPage = 10; // Default value, will be updated for responsive behavior

// Function to dynamically set countriesPerPage based on screen size
function updateCountriesPerPage() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    countriesPerPage = 5; // Mobile view
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    countriesPerPage = 10; // Tablet view
  } else {
    countriesPerPage = 15; // Desktop view
  }
  displayCountries(); // Update display based on new setting
}

// Initial screen size check and listener for resizing
updateCountriesPerPage();
window.addEventListener("resize", updateCountriesPerPage);

async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    countries = await response.json();
    filteredCountries = countries; // Set filteredCountries to all countries by default
    displayCountries();
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

function displayCountries() {
  countryList.innerHTML = ""; // Clear previous results

  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

  countriesToDisplay.forEach(country => {
    const countryCard = document.createElement("div");
    countryCard.className = "country-card";
    countryCard.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common} flag" />
      <h2>${country.name.common}</h2>
      <button onclick="viewCountryDetails('${country.name.common}')"><b><i>Show more</i></b></button>
    `;
    countryList.appendChild(countryCard);
  });

  updatePaginationInfo();
  updatePaginationButtons();
}

function filterCountries() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedRegion = regionFilter.value;

  // Filter based on search and selected region
  filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchValue);
    const matchesRegion = selectedRegion === "all" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  currentPage = 1;
  displayCountries(); // Display filtered countries
}

function nextPage() {
  if (currentPage < Math.ceil(filteredCountries.length / countriesPerPage)) {
    currentPage++;
    displayCountries();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayCountries();
  }
}

function updatePaginationInfo() {
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function updatePaginationButtons() {
  prevPageButton.style.display = currentPage > 1 ? "inline-block" : "none";
  nextPageButton.style.display =
    currentPage < Math.ceil(filteredCountries.length / countriesPerPage) ? "inline-block" : "none";
}

function viewCountryDetails(countryName) {
  const country = countries.find(c => c.name.common === countryName);
  localStorage.setItem("selectedCountry", JSON.stringify(country));
  window.location.href = "country-details.html";
}

searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);
nextPageButton.addEventListener("click", nextPage);
prevPageButton.addEventListener("click", prevPage);

fetchCountries();