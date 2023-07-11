import stockData from './StockData.js';
// let sampleData = "{\"MetaData\":{\"1.Information\":\"DailyTimeSerieswithSplitsandDividendEvents\",\"2.Symbol\":\"SHOP\",\"3.LastRefreshed\":\"2023-06-22\",\"4.OutputSize\":\"Compact\",\"5.TimeZone\":\"US/Eastern\"},\"TimeSeries(Daily)\":{\"2023-06-22\":{\"1.open\":\"62.65\",\"2.high\":\"64.0599\",\"3.low\":\"62.05\",\"4.close\":\"63.48\",\"5.adjustedclose\":\"63.48\",\"6.volume\":\"11143057\",\"7.dividendamount\":\"0.0000\",\"8.splitcoefficient\":\"1.0\"},\"2023-06-21\":{\"1.open\":\"64.16\",\"2.high\":\"64.85\",\"3.low\":\"61.85\",\"4.close\":\"63.17\",\"5.adjustedclose\":\"63.17\",\"6.volume\":\"12508578\",\"7.dividendamount\":\"0.0000\",\"8.splitcoefficient\":\"1.0\"}}}";
// sampleData = JSON.parse(sampleData);

let stockPriceData;
let myChart;
const stockPriceDataKey = {
  daily: 'Time Series (Daily)',
  weekly: 'Weekly Adjusted Time Series',
  monthly: 'Monthly Adjusted Time Series'
};

function calculateAdjustedPrices(open, high, low, close, adjustedClose) {
  let adjustedOpen = (open / close) * adjustedClose;
  let adjustedHigh = (high / close) * adjustedClose;
  let adjustedLow = (low / close) * adjustedClose;
  let adjustedClosePrice = parseFloat(adjustedClose.toFixed(2));

  return [
    parseFloat(adjustedOpen.toFixed(2)),
    parseFloat(adjustedHigh.toFixed(2)),
    parseFloat(adjustedLow.toFixed(2)),
    adjustedClosePrice
  ];
}

// Function to get stock price data
async function getStockPriceData(symbol, timeFrame = 'daily') {

  // Call the fetchStockPrices method to get the stock price data
  stockPriceData = await stockData.fetchStockPrices(symbol, timeFrame);
}
// Call the getStockPriceData function to get the stock price data
function renderChart(symbol, timeFrame = 'daily') {
  getStockPriceData(symbol, timeFrame).then(() => {
    const data = {
      datasets: [{
        label: 'Symbol ' + symbol,
        data: [
        ],
        meta: {
          chartSymbol: symbol,
        }
      }]
    };

    const timeSeries = stockPriceData[stockPriceDataKey[timeFrame]];
    for (const date in timeSeries) {
      const dataPoint = timeSeries[date];
      const dateTime = luxon.DateTime.fromFormat(date, 'yyyy-MM-dd');
      let [adjustedOpen, adjustedHigh, adjustedLow, adjustedClose] = calculateAdjustedPrices(parseFloat(dataPoint['1. open']),
        parseFloat(dataPoint['2. high']), parseFloat(dataPoint['3. low']), parseFloat(dataPoint['4. close']), parseFloat(dataPoint['5. adjusted close']));


      const chartDataPoint = {
        x: dateTime.valueOf(),
        o: adjustedOpen,
        h: adjustedHigh,
        l: adjustedLow,
        c: adjustedClose
      };

      data.datasets[0].data.push(chartDataPoint);
    }

    var options = {
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true // Enable zooming with mouse wheel
            },
            // drag: {
            //   enabled: true // Enable zooming by dragging
            // },
            pinch: {
              enabled: true // Enable zooming with pinch gesture
            },
            mode: 'x' // Enable zooming only in the x-direction
          }
        },
        tooltip: {
          enabled: true, // Enable tooltips
          mode: 'nearest', // Show tooltip for the nearest data point
          intersect: false, // Allow hovering over multiple candles
        },
      },
      scales: {
        x: {
          type: 'time', // Assuming x-axis is a time scale
          time: {
            unit: 'day' // Adjust the time scale unit as needed
          }
        },
        y: {
          // Configure the y-axis scale as needed
        }
      }
    };

    // config 
    const config = {
      type: 'candlestick',
      data,
      options: options
    };

    if (typeof myChart !== 'undefined') {
      // Destroy the chart
      myChart.destroy();
      console.log("Destroying chart");
    }

    // render init block
    myChart = new Chart(
      document.getElementById('chartCanvas'),
      config
    );
    console.log(myChart);

    const chartVersion = document.getElementById('chartVersion');
    chartVersion.innerText = Chart.version;

  }).catch((error) => {
    console.log('Error rendering chart:', error.message);
  });

}
renderChart("AMZN");
export { renderChart, myChart };

