let counts = 0;
let alltimehigh = 0;
function count() {
    let rnd = Math.random();
    if (counts/100>=rnd){
        counts = 0;
    } else {
        counts = counts + 1;
    }
    if (counts>alltimehigh) {
        alltimehigh = counts;
        document.getElementById("ath").innerText = alltimehigh;
    }
    document.getElementById("high").innerText = counts;
}