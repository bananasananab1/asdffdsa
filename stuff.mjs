// Import the ExpantaNum module
import ExpantaNum from './ExpantaNum.js';

// Initialize the counter
let counter = new ExpantaNum(2);

// Function to increment the counter
function incrementCounter() {
    counter = counter.pow(counter);
    document.getElementById("counterLabel").innerText = "Counter: " + counter.toString();
}
