const countryList = document.getElementById("country-list");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const languageFilter = document.getElementById("language-filter");
const nextPageButton = document.getElementById("next-page");
const prevPageButton = document.getElementById("prev-page");
const pageInfo = document.getElementById("page-info");

let countries = [];
let filteredCountries = [];
let currentPage = 1;
let countriesPerPage = 10;

// Function to dynamically set countriesPerPage based on screen size
function updateCountriesPerPage() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    countriesPerPage = 5; // Mobile view
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    countriesPerPage = 10; // Tablet view
  } else {
    countriesPerPage = 15; // Desktop view
  }
  displayCountries();
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
  const selectedLanguage = languageFilter.value;

  // Determine which filter to apply
  filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchValue);

    let matchesRegion = true; // Default to true
    if (selectedRegion !== "all") {
      matchesRegion = country.region === selectedRegion;
    }

    let matchesLanguage = true; // Default to true
    if (selectedLanguage !== "all") {
      matchesLanguage = country.languages && Object.values(country.languages).includes(selectedLanguage);
    }

    // Only apply one filter at a time
    if (selectedRegion !== "all" && selectedLanguage !== "all") {
      return matchesSearch && matchesRegion; // Only region filter applied
    } else if (selectedLanguage !== "all") {
      return matchesSearch && matchesLanguage; // Only language filter applied
    } else if (selectedRegion !== "all") {
      return matchesSearch && matchesRegion; // Only region filter applied
    } else {
      return matchesSearch; // No filter applied
    }
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

// Event listeners for filters and pagination
searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);
languageFilter.addEventListener("change", filterCountries); // Event listener for language filter
nextPageButton.addEventListener("click", nextPage);
prevPageButton.addEventListener("click", prevPage);

fetchCountries();

function toggleMenu() {
  const navContent = document.getElementById('nav-content');
  navContent.classList.toggle('active'); // Toggle the active class
}