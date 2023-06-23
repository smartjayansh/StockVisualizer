const apiKey = 'TM10CHSB541K0CYZ'; // Replace with your Alpha Vantage API key
const symbol = 'AAPL'; // Replace with the desired stock symbol
let stockPriceData = "Empty Data";
// Function to fetch stock prices
async function fetchStockPrices() {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`);
    stockPriceData = await response.json();
    
    // Check if the API call was successful
    if (response.ok) {
      // const price = data['Global Quote']['05. price'];
      console.log(data);
      // console.log(`Stock Price for ${symbol}: ${price}`);
    } else {
      console.log('Error fetching stock prices:', data['Error Message']);
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

// Call the function to fetch stock prices
//fetchStockPrices();
export default {stockPriceData};


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