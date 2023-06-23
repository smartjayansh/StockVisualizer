//import stockPriceData from './StockData';
//import stockPriceData from './StockData';
let sampleData = "{\"MetaData\":{\"1.Information\":\"DailyTimeSerieswithSplitsandDividendEvents\",\"2.Symbol\":\"SHOP\",\"3.LastRefreshed\":\"2023-06-22\",\"4.OutputSize\":\"Compact\",\"5.TimeZone\":\"US/Eastern\"},\"TimeSeries(Daily)\":{\"2023-06-22\":{\"1.open\":\"62.65\",\"2.high\":\"64.0599\",\"3.low\":\"62.05\",\"4.close\":\"63.48\",\"5.adjustedclose\":\"63.48\",\"6.volume\":\"11143057\",\"7.dividendamount\":\"0.0000\",\"8.splitcoefficient\":\"1.0\"},\"2023-06-21\":{\"1.open\":\"64.16\",\"2.high\":\"64.85\",\"3.low\":\"61.85\",\"4.close\":\"63.17\",\"5.adjustedclose\":\"63.17\",\"6.volume\":\"12508578\",\"7.dividendamount\":\"0.0000\",\"8.splitcoefficient\":\"1.0\"}}}";
console.log(sampleData);


// setup 
const startingDate = luxon.DateTime.fromRFC2822('04 Jan 2021 00:00:00 GMT');
const date2 = luxon.DateTime.fromRFC2822('06 Jan 2021 00:00:00 GMT');

const data = {
    datasets: [{
        data: [
            {
                x: startingDate.valueOf(),
                o: 0.5,
                h: 1,
                l: 0.4,
                c: 0.7,
            },
            {
                x: date2.valueOf(),
                o: 0.7,
                h: 1.5,
                l: 0.2,
                c: 0.4,
            }
        ],
    }]
};

// config 
const config = {
    type: 'candlestick',
    data,
    options: {}
};

// render init block
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;