# 🌍 Country Explorer

**Country Explorer** is a simple and interactive web app where you can explore information about countries worldwide. Use the app to search for countries, filter them by region, and view detailed information about each country on a separate page.

## ✨ Features
- **🔍 Search**: Quickly find countries by typing in their names.
- **🌎 Region Filter**: Select a region (like Asia, Europe, etc.) to see countries from that part of the world.
- **⬇️ Load More**: Start with a few countries and load more as you scroll.
- **📄 Detailed View**: Click on a country’s "View Details" button to see additional information like population, region, and more.

## Functional Requirements

### Landing Page
- The main page displays a list of all countries, each represented as an interactive card showing the name and flag.
- The list is paginated with a custom page size, and users can load more countries with a “Show more” interaction.

### Search
- The main page features a search bar at the top for searching countries via the API.
- When typing a keyword in the search input, up to 5 results are displayed as suggestions in a dropdown.
- The dropdown includes a “View all” option to show all matching countries as cards on the same page.
- Search results update dynamically as the user types.

### Details Page
- Clicking a country card navigates to a details page with rich information, including:
  - Name, Top Level Domain, Capital, Region, Population, Area, Languages.
- The layout is intuitive, providing a visually appealing experience with a "Back" link to return to the search results page.

### Enhanced Filtering
- Users can filter results by Language and Region.
- Only one filter may be used at a time, and filters can be applied alongside keyword searches.

### Favorites
- A vertical strip on the right displays the user's favorite countries.
- Each detail page has an icon to mark a country as a favorite.
- Users can have up to 5 favorites, and the favorites section is only visible when there are favorites marked.
- Browser local storage is used to track favorites.

## Non-Functional Requirements

### Design and User Experience
- The web app is responsive and designed to look great on devices of all sizes.

### Code Structure
- The code is clean, modular, and structured for reusability, clarity, and maintainability.
- Meaningful comments are included to explain the thought process and implementation.
- The application handles and reports errors meaningfully.

### Quality and Testing Expectations
- The solution includes unit tests to verify the functionality of the JavaScript code, particularly for API interactions and dynamic updates.
- A testing framework such as Mocha or Jasmine is used, with instructions for running tests.
- Thorough tests handle various edge cases, including failed API requests and empty search queries.

## 🛠️ Technologies Used
- **HTML/CSS**: For page structure and styling
- **JavaScript**: For interactive functionality and API handling
- **REST Countries API**: Provides data for each country

## 🚀 How to Use
1. **Search for a Country**: Type in the name of a country in the search bar to find it quickly.
2. **Filter by Region**: Narrow down the list by selecting a specific region from the dropdown.
3. **Load More Countries**: Click the "Show More" button to load additional countries.
4. **View Detailed Information**: Click "View Details" on a country card to open a new page with extra information about that country.

## Acknowledgements
- [REST Countries API](https://restcountries.com/) for providing country data.

### Instructions
1. Replace `https://github.com/your-username/country-explorer.git` with the actual URL of your repository.
2. Feel free to adjust any sections as needed to fit your project's specific requirements and functionalities.
3. Add any additional sections for features or information relevant to users or contributors.