let counts = 0;
let alltimehigh = 0;
let ch = 100;
let buyables = {
    1: { current: 0, max: 25, cost: 25, change: 1, id: "Buyable1v"}
};
let bulk = 1
function count() {
    let rnd = Math.random();
    if (counts>rnd*ch){
        counts = 0;
        document.getElementById("resetchance").innerText = 100;
    } else {
        counts = counts + 1;
        document.getElementById("resetchance").innerText = (ch/counts).toFixed(3)+"%";
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
    if (alltimehigh>=20){
        alltimehigh = alltimehigh - 20;
        ch = ch-25;
        document.getElementById("lessenupg").disabled = true;
        document.getElementById("lessenresetupg").innerText = "true";
        document.getElementById("ath").innerText = alltimehigh;
    }
}
function Buyable(upg){
    if (buyables[upg].current != buyables[upg].max) {
        if (alltimehigh>= buyables[upg].cost) { 
            buyables[upg].current += bulk;
            ch -= buyables[upg].change;
            alltimehigh -= buyables[upg].cost;
            document.getElementById(buyables[upg].id).innerText = buyables[upg].current+"/"+buyables[upg].max;    
        }
    } else {
        document.getElementById(buyables[upg].id).disabled = true;
    }
}