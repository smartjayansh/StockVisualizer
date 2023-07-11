const apiKey = 'TM10CHSB541K0CYZ'; // Replace with your Alpha Vantage API key

const stockDataApiUrls = {
  daily: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED',
  weekly: 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED',
  monthly: 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED'
};

const stockSearchApiUrl = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH';

export { apiKey, stockDataApiUrls, stockSearchApiUrl };