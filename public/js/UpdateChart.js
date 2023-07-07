import {renderChart, myChart} from './ChartRender.js';

// Get the submit button and input field
const submitBtn = document.getElementById('symbolSubmitBtn');
const symbolInput = document.getElementById('symbolInput');

// Add an event listener to the submit button
submitBtn.addEventListener('click', () => {
  // Get the value of the input field
  const symbol = symbolInput.value;
  console.log('Symbol:', symbol);
  console.log(myChart);

  // Call the renderChart function with the symbol parameter
  renderChart(symbol);
});


const timeFrameBtns = document.querySelectorAll('.time-frame-btn');
// Attach event listener to each button
timeFrameBtns.forEach(function(button) {
  button.addEventListener('click', updateChartTimeFrame);
});

function updateChartTimeFrame(event){
  const button = event.target;
  const chartSymbol = myChart.config.data.datasets[0].meta.chartSymbol;
  const timeFrame = button.dataset.timeframe;

  renderChart(chartSymbol, timeFrame);
}