import ExpantaNum from './ExpantaNum.js';
document.addEventListener("DOMContentLoaded", function () {
    // Define counter variable here
    let counter = new ExpantaNum(2);

    // Define the incrementCounter function
    function incrementCounter() {
        console.log("Initial counter value:", counter.toString());
        counter = counter.pow(counter);
        console.log("Updated counter value:", counter.toString());
        document.getElementById("counterLabel").innerText = "Counter: " + counter.toString();
    }
});
