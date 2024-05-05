let counts = 0;
let alltimehigh = 0;
let ch = 100;
function count() {
    let rnd = Math.random();
    if (counts>rnd*ch){
        counts = 0;
        document.getElementById("resetchance").innerText = 100;
    } else {
        counts = counts + 1;
        document.getElementById("resetchance").innerText = (1/counts).toFixed(3);
    }
    if (counts>alltimehigh) {
        alltimehigh = counts;
        document.getElementById("ath").innerText = alltimehigh;
    }
    document.getElementById("high").innerText = counts;
}
function opencloseupgs() {
    var div = document.getElementById("upgdiv");
    if (div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}
function lessenreset1() {
    if (counts>=20){
        counts = counts - 20;
        ch = ch-((ch+25)/100);
        document.getElementById("lessenupg").disabled = true;
        document.getElementById("lessenresetupg").innerText = "true";
    }
}