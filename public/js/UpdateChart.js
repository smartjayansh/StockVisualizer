import ChartRender from './ChartRender.js';

// Get the submit button and input field
const submitBtn = document.getElementById('symbolSubmitBtn');
const symbolInput = document.getElementById('symbolInput');

// Add an event listener to the submit button
submitBtn.addEventListener('click', () => {
  // Get the value of the input field
  const symbol = symbolInput.value;
  console.log('Symbol:', symbol);

  // Call the renderChart function with the symbol parameter
  ChartRender.renderChart(symbol);
});