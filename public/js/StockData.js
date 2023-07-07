const apiKey = 'TM10CHSB541K0CYZ'; // Replace with your Alpha Vantage API key
const apiUrls = {
  daily: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED',
  weekly: 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED',
  monthly: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED'
};
// Function to fetch stock prices
async function fetchStockPrices(stockSymbol, timeFrame) {
  try {
    const apiUrl = `${apiUrls[timeFrame]}&symbol=${stockSymbol}&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    
    // Check if the API call was successful
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

// Call the function to fetch stock prices
export default {fetchStockPrices};


// Sample Response from Alpha Vantage API
// {
//     "Meta Data": {
//         "1. Information": "Daily Time Series with Splits and Dividend Events",
//         "2. Symbol": "SHOP",
//         "3. Last Refreshed": "2023-06-22",
//         "4. Output Size": "Compact",
//         "5. Time Zone": "US/Eastern"
//     },
//     "Time Series (Daily)": {
//         "2023-06-22": {
//             "1. open": "62.65",
//             "2. high": "64.0599",
//             "3. low": "62.05",
//             "4. close": "63.48",
//             "5. adjusted close": "63.48",
//             "6. volume": "11143057",
//             "7. dividend amount": "0.0000",
//             "8. split coefficient": "1.0"
//         }
//     }
// }