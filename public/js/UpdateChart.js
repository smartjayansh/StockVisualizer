import { renderChart, myChart } from './ChartRender.js';
import StockData from './StockData.js';
// Get the submit button and input field
const submitBtn = document.getElementById('symbolSubmitBtn');

// Add an event listener to the submit button
submitBtn.addEventListener('click', () => {
  // Get the value of the input field
  const symbolInput = document.getElementById('symbolInput');
  const symbol = symbolInput.value;
  console.log('Symbol:', symbol);

  // Call the renderChart function with the symbol parameter
  renderChart(symbol);
});


const timeFrameBtns = document.querySelectorAll('.time-frame-btn');
// Attach event listener to each button
timeFrameBtns.forEach(function (button) {
  button.addEventListener('click', updateChartTimeFrame);
});

function updateChartTimeFrame(event) {
  const button = event.target;
  const chartSymbol = myChart.config.data.datasets[0].meta.chartSymbol;
  const timeFrame = button.dataset.timeframe;

  renderChart(chartSymbol, timeFrame);
}

let symbolSearchInput = document.getElementById('symbolInput');
var autocompleteDropdown = document.getElementById('autocompleteDropdown');

symbolSearchInput.addEventListener('keypress', async function (event) {
  if (event.key === 'Enter') {
    let searchResults = await StockData.searchStockSymbols();

    searchResults = searchResults.bestMatches.filter((item) => {
      return item['4. region'] === 'United States' || item['4. region'] === 'India/Bombay';
    });

    // Process the API response to obtain the autocomplete suggestions
    var autocompleteSuggestions = ['Option 1', 'Option 2', 'Option 3'];
    autocompleteSuggestions = searchResults.map((item) => {
      return item['1. symbol'];
    });

    // Generate the dropdown options based on the autocomplete suggestions
    var dropdownOptions = autocompleteSuggestions.map(function (suggestion) {
      // return '<div class="dropdown-option">' + suggestion + '</div>';
      return '<option value="' + suggestion + '"></option>';
    }).join('');

    // Display the dropdown options in the dropdown container
    autocompleteDropdown.innerHTML = dropdownOptions;
  }
});

autocompleteDropdown.addEventListener('click', function (event) {
  var selectedOption = event.target;
  if (selectedOption.classList.contains('dropdown-option')) {
    // Retrieve the selected option value
    var selectedValue = selectedOption.textContent;

    // Set the selected value in the search input
    symbolSearchInput.value = selectedValue;

    // Clear the dropdown options
    autocompleteDropdown.innerHTML = '';
  }
});


