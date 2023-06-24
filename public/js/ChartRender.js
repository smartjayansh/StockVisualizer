import stockData from './StockData.js';
// let sampleData = "{\"MetaData\":{\"1.Information\":\"DailyTimeSerieswithSplitsandDividendEvents\",\"2.Symbol\":\"SHOP\",\"3.LastRefreshed\":\"2023-06-22\",\"4.OutputSize\":\"Compact\",\"5.TimeZone\":\"US/Eastern\"},\"TimeSeries(Daily)\":{\"2023-06-22\":{\"1.open\":\"62.65\",\"2.high\":\"64.0599\",\"3.low\":\"62.05\",\"4.close\":\"63.48\",\"5.adjustedclose\":\"63.48\",\"6.volume\":\"11143057\",\"7.dividendamount\":\"0.0000\",\"8.splitcoefficient\":\"1.0\"},\"2023-06-21\":{\"1.open\":\"64.16\",\"2.high\":\"64.85\",\"3.low\":\"61.85\",\"4.close\":\"63.17\",\"5.adjustedclose\":\"63.17\",\"6.volume\":\"12508578\",\"7.dividendamount\":\"0.0000\",\"8.splitcoefficient\":\"1.0\"}}}";
// sampleData = JSON.parse(sampleData);

let stockPriceData;
let myChart;
// Function to get stock price data
async function getStockPriceData(symbol) {

    // Call the fetchStockPrices method to get the stock price data
    stockPriceData = await stockData.fetchStockPrices(symbol);
}
// Call the getStockPriceData function to get the stock price data
function renderChart(symbol) {
    getStockPriceData(symbol).then(() => {
        const data = {
            datasets: [{
                label: 'Symbol ' + symbol,
                data: [
                ],
            }]
        };

        const timeSeries = stockPriceData['Time Series (Daily)'];
        for (const date in timeSeries) {
            const dataPoint = timeSeries[date];
            const dateTime = luxon.DateTime.fromFormat(date, 'yyyy-MM-dd');

            const chartDataPoint = {
                x: dateTime.valueOf(),
                o: parseFloat(dataPoint['1. open']),
                h: parseFloat(dataPoint['2. high']),
                l: parseFloat(dataPoint['3. low']),
                c: parseFloat(dataPoint['4. close'])
            };

            data.datasets[0].data.push(chartDataPoint);
        }

        // config 
        const config = {
            type: 'candlestick',
            data,
            options: {}
        };

        if (typeof myChart !== 'undefined') {
            // Destroy the chart
            myChart.destroy();
            console.log("Destroying chart");
        }

        // render init block
        myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
        
        const chartVersion = document.getElementById('chartVersion');
        chartVersion.innerText = Chart.version;

    }).catch((error) => {
        console.log('Error rendering chart:', error.message);
    });

}
renderChart("AMZN");
export default {renderChart};

