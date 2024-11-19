const countryList = document.getElementById("country-list");
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

    // Sort countries by name in ascending order
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    filteredCountries = countries;
    displayCountries();
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}
fetchCountries();

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
      <div class="btn-delete">
        <button onclick="viewCountryDetails('${country.name.common}')"><b><i>more details</i></b></button>
        <p class="favorite-btn" onclick="toggleFavorite('${country.name.common}')">❤️</p>
      </div>
    `;
    countryList.appendChild(countryCard);
  });

  updatePaginationInfo();
  updatePaginationButtons();
}

// Load favorites from localStorage and display them in the sidebar with delete icon
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesStrip = document.getElementById('favoritesStrip');
  const favoriteCountriesList = document.getElementById('favoriteCountriesList');

  favoriteCountriesList.innerHTML = ''; // Clear current list

  if (favorites.length > 0) {
    favoritesStrip.style.display = 'block'; // Make strip visible if there are favorites

    favorites.forEach(country => {
      const li = document.createElement('li');
      li.className = "favorite-item";
      li.innerHTML = `
              <span>${country}</span>
              <span onclick="removeFavorite('${country}')"><i class="fa-solid fa-trash-can"></i></span>
          `;
      favoriteCountriesList.appendChild(li);
    });
  } else {
    favoritesStrip.style.display = 'none'; // Hide if no favorites
  }
}

// Remove favorite country
function removeFavorite(country) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Filter out the country to be removed
  favorites = favorites.filter(fav => fav !== country);

  // Update localStorage and reload the favorites list
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites();
}

// Initial load of favorites when the page loads
window.onload = loadFavorites;

// Toggle favorite status of a country
function toggleFavorite(country) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.includes(country)) {
    // Remove from favorites if it already exists
    favorites = favorites.filter(fav => fav !== country);
  } else if (favorites.length < 5) {
    // Add to favorites if not already added and limit not exceeded
    favorites.push(country);
  } else {
    alert("You can only have up to 5 favorites.");
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites(); // Refresh the favorites list display
}

// ----------------------- Pagination Details
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
// ------------------------------------------ |

// view Country Details
function viewCountryDetails(countryName) {
  const country = countries.find(c => c.name.common === countryName);
  localStorage.setItem("selectedCountry", JSON.stringify(country));
  window.location.href = "country-details.html";
}

// Event listeners for filters and pagination
regionFilter.addEventListener("change", filterCountries);
languageFilter.addEventListener("change", filterCountries); // Event listener for language filter
nextPageButton.addEventListener("click", nextPage);
prevPageButton.addEventListener("click", prevPage);


// Function to filter countries based on region and language
function filterCountries() {
  const selectedRegion = regionFilter.value;
  const selectedLanguage = languageFilter.value;

  // Determine which filter to apply
  filteredCountries = countries.filter(country => {
    let matchesRegion = true; // Default to true
    if (selectedRegion !== "all") {
      matchesRegion = country.region === selectedRegion;
    }

    let matchesLanguage = true; // Default to true
    if (selectedLanguage !== "all") {
      matchesLanguage = country.languages && Object.values(country.languages).includes(selectedLanguage);
    }

    return matchesRegion && matchesLanguage; // Apply filters
  });

  currentPage = 1; // Reset to first page when filtering
  displayCountries(); // Display filtered countries
}

// ---------------------------- toggle Menu
function toggleMenu() {
  const navContent = document.getElementById('nav-content');
  navContent.classList.toggle('active'); // Toggle the active class
}
// ---------------------------------- |

// ----------------------------------------------------- Suggestion and search country 
const apiUrl = 'https://restcountries.com/v3.1/all';
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const suggestionsDropdown = document.getElementById('suggestions');

  searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.toLowerCase();
    if (query) {
      const countries = await fetchCountries();
      const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(query)
      ).slice(0, 5); // Get up to 5 results

      displaySuggestions(filteredCountries);
    } else {
      suggestionsDropdown.style.display = 'none'; 
    }
  });

  // Function to fetch countries from the API
  async function fetchCountries() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  // Function to display suggestions
  function displaySuggestions(countries) {
    suggestionsDropdown.innerHTML = ''; // Clear previous suggestions

    countries.forEach(country => {
      const item = document.createElement('div');
      item.classList.add('suggestion-item');

      // Create an image element for the country flag
      const flagImg = document.createElement('img');
      flagImg.src = country.flags.png;
      flagImg.alt = `${country.name.common} flag`;
      flagImg.classList.add('suggestion-flag'); 
      flagImg.style.width = '40px';  
      flagImg.style.height = '30px'; 

      // Create a span for the country name
      const countryName = document.createElement('span');
      countryName.textContent = country.name.common;
      countryName.style.marginLeft = '10px'; 

      item.onclick = () => {
        searchInput.value = country.name.common; // Set input to clicked suggestion
        suggestionsDropdown.style.display = 'none'; // Hide dropdown
        // Call a function to filter and display the selected country's details
        filterCountriesByName(country.name.common);
      };

      item.appendChild(flagImg); 
      item.appendChild(countryName); 
      suggestionsDropdown.appendChild(item); 
    });

    // filter countries by name and update the display
    function filterCountriesByName(countryName) {
      // Assuming you already have a way to reset currentPage and filteredCountries
      filteredCountries = countries.filter(country =>
        country.name.common === countryName
      );

      currentPage = 1; // Reset to the first page
      displayCountries(); 
    }

    // Add a "View all" option at the end of the suggestions
    const viewAllItem = document.createElement('div');
    viewAllItem.textContent = 'View all';
    viewAllItem.classList.add('suggestion-item','view-all'); // Add "suggestion-item" and "view-all" classes
    viewAllItem.onclick = () => {
      suggestionsDropdown.style.display = 'none'; 
      // Filter countries based on the current search input value
      const query = searchInput.value.toLowerCase();
      filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(query)
      );

      currentPage = 1; // Reset to the first page
      displayCountries(); 
    };

    suggestionsDropdown.appendChild(viewAllItem); // Add "View all" option
    suggestionsDropdown.style.display = countries.length ? 'block' : 'none'; // Show/hide dropdown

  }

  function displayAllCountries() {
    console.log('Display all countries'); 
  }

  // Clicking outside the dropdown should hide it
  document.addEventListener('click', (event) => {
    if (!suggestionsDropdown.contains(event.target) && event.target !== searchInput) {
      suggestionsDropdown.style.display = 'none';
    }
  });
});
// ---------------------------------------------------|