let counts = 0;
let attempts = 0;
let reb = 0;
let buyables = {
    1: { current: 0, max: 25, cost: 25, change: 1, id: "Buyable1v"},
    2: { current: 0, max: 1,  cost: 20, change: 25,id: "lessenresetupg" }
};
let rebbuyables = {
    1: {current: 0, max: 9999999999, cost: 1, change: 1, costscale: 2, cscalemode: "^", changescale: 2, chscalemode: "^", changing: "ch",  id: "RB1v"},
    2: {current: 0, max: 9999999999, cost: 1, change: 1, costscale: 2, cscalemode: "^", changescale: 2, chscalemode: "^", changing: "reb", id: "RB2v"},
};
let divs = ["rebirthsdiv","upgsdiv"];
let alltimehigh = 0;
let ch = 100;
let basech = 100;
let countmulti = 1;
let rebmulti = 1;
let bulk = 1;
let saveddata = localStorage.getItem("savedata");
if (saveddata) {
    let loadeddata = JSON.parse(saveddata);
    console.log(loadeddata);
    counts = loadeddata[0];
    attempts = loadeddata[1];
    reb = loadeddata[2];
    buyables = loadeddata[3];
    alltimehigh = loadeddata[4];
    ch = loadeddata[5];
    countmulti = loadeddata[6];
    rebmulti = loadeddata[7];
    bulk = loadeddata[8];
    //upd data;
    document.getElementById("rebpts").innerText = reb+" Rebirth Points";
    document.getElementById("resetchance").innerText = (ch/counts).toFixed(3)+"%";
    document.getElementById("attemptshtml").innerText = attempts;
    document.getElementById("ath").innerText = alltimehigh;
    document.getElementById("high").innerText = counts;
}
function count() {
    attempts += 1;
    document.getElementById("attemptshtml").innerText = attempts;
    let rnd = Math.random();
    if (counts>rnd*ch){
        counts = 0;
        document.getElementById("resetchance").innerText = 100;
    } else {
        counts += countmulti;
        document.getElementById("resetchance").innerText = (ch/counts).toFixed(3)+"%";
    }
    if (counts>alltimehigh) {
        alltimehigh = counts;
        document.getElementById("ath").innerText = alltimehigh;
    }
    document.getElementById("high").innerText = counts;
}
function openclose(elementId) {
    let ele = elementId+"div";
    divs.forEach((v) => {
        document.getElementById(v).style.display = 'none';
    });
    var element = document.getElementById(ele);
    if (element) {
        element.style.display = (element.style.display === 'none') ? 'block' : 'none';
    } else {
        console.error('Element with ID ' + elementId + ' not found.');
    }
}
function rebirth(){
    if (alltimehigh>=30) {
        counts = 0;
        reb += Math.floor(alltimehigh/30)*rebmulti;
        alltimehigh = 0;
        ch = basech;
        Object.keys(buyables).forEach(key => {
            const v = buyables[key];
            v.current = 0;
            const element = document.getElementById(v.id);
            if (element) {
                element.disabled = false;
            } else {
                console.warn(`Element with ID '${v.id}' not found.`);
            }
        });
        
        document.getElementById("lessenupg").disabled = false;
        document.getElementById("ath").innerText = alltimehigh;
        document.getElementById("high").innerText = counts;
        document.getElementById("resetchance").innerText = (ch/counts).toFixed(3)+"%";
        document.getElementById("rebpts").innerText = reb+" Rebirth Points";
    }
}
function RebBuyable(upg){
    let upgnum = rebbuyables[upg];
    let currentcost = upgnum.cost;
    let currentgain = upgnum.change;
    if (upgnum.cscalemode == "^") {
        currentcost = upgnum.changescale ** upgnum.current;
    }
    if (upgnum.chscalemode == "^") {
        currentgain = upgnum.changescale ** upgnum.current;
    }
    if (upgnum.current != upgnum.max) {
        if (reb>= currentcost&& upgnum.changing != "ch") {
            upgnum.current += 1;
            ch += currentgain;
            basech += currentgain;
            reb -= currentcost;
        } else if(reb>= currentcost&& upgnum.changing != "reb"){
            upgnum.current += 1;
            rebmulti += currentgain;
            reb -= currentcost;
        }
    } else {
        document.getElementById(upgnum.id).disabled = true;
    }
    document.getElementById(upgnum.id).innerText = " Cost:"+ currentcost + ", Bought: "+upgnum.current+"/"+upgnum.max;  
    document.getElementById("rebpts").innerText = reb+" Rebirth Points"; 
}
function Buyable(upg){
    if (buyables[upg].current != buyables[upg].max) {
        if (alltimehigh>= buyables[upg].cost) { 
            buyables[upg].current += bulk;
            ch += buyables[upg].change;
            alltimehigh -= buyables[upg].cost;
            document.getElementById(buyables[upg].id).innerText = buyables[upg].current+"/"+buyables[upg].max;    
        }
    } else {
        document.getElementById(buyables[upg].id).disabled = true;
    }
    document.getElementById(buyables[upg].id).innerText = buyables[upg].current+"/"+buyables[upg].max;
    document.getElementById("ath").innerText = alltimehigh;
}
function save(){
    let data = [counts,attempts,reb,buyables,alltimehigh,ch,countmulti,rebmulti,bulk,rebbuyables];
    let jsondata = JSON.stringify(data);
    console.log("Saved Data");
    console.log(jsondata)
    localStorage.setItem('savedata',jsondata);
}
function resetdata(){
    let data = [0,0,0,{1: { current: 0, max: 25, cost: 25, change: 1, id: "Buyable1v"},2: { current: 0, max: 1,  cost: 20, change: 25,id: "lessenresetupg" }},0,100,1,1,1];
    let jsondata = JSON.stringify(data);
    console.log("Reset Data");
    console.log(jsondata)
    localStorage.setItem('savedata',jsondata);
}