// const ExpantaNum = require("./technical/ExpantaNum");

let counts = new ExpantaNum(0);
let attempts = new ExpantaNum(0);
let reb = new ExpantaNum(0);
let autotps = ExpantaNum(0);
let buyables = {
    1: { current: ExpantaNum(0), max: ExpantaNum(25), cost: ExpantaNum(25), change: ExpantaNum(1), id: "Buyable1v"},
    2: { current: ExpantaNum(0), max: ExpantaNum(1),  cost: ExpantaNum(20), change: ExpantaNum(25),id: "lessenresetupg" }
};
let rebbuyables = {
    1: {current: ExpantaNum(0), max: ExpantaNum(1e303), cost: ExpantaNum(1), change: ExpantaNum(1), costscale: ExpantaNum(2), cscalemode: "^", changescale: ExpantaNum(2), chscalemode: "^", changing: "ch",  id: "RB1v"},
    2: {current: ExpantaNum(0), max: ExpantaNum(1e303), cost: ExpantaNum(1), change: ExpantaNum(1), costscale: ExpantaNum(2), cscalemode: "^", changescale: ExpantaNum(2), chscalemode: "^", changing: "reb", id: "RB2v"},
    3: {current: ExpantaNum(0), max: ExpantaNum(1e303), cost: ExpantaNum(1), costscale: ExpantaNum(10), cscalemode: "^", changing: "auto", id: "RB3v"},
};
let divs = ["rebirthsdiv","upgsdiv"];
let alltimehigh = new ExpantaNum(0);
let ch = new ExpantaNum(100);
let basech = new ExpantaNum(100);
let countmulti = new ExpantaNum(1);
let rebmulti = new ExpantaNum(1);
let bulk = new ExpantaNum(1);
const base = [counts,attempts,reb,buyables,alltimehigh,ch,countmulti,rebmulti,bulk,rebbuyables];
let saveddata = localStorage.getItem("savedata");
if (saveddata) {
    let loadeddata = JSON.parse(saveddata);
    console.log(loadeddata);
    counts = ExpantaNum(loadeddata[0]);
    attempts = ExpantaNum(loadeddata[1]);
    reb = ExpantaNum(loadeddata[2]);
    buyables = (loadeddata[3]);
    alltimehigh = ExpantaNum(loadeddata[4]);
    ch = ExpantaNum(loadeddata[5]);
    countmulti = ExpantaNum(loadeddata[6]);
    rebmulti = ExpantaNum(loadeddata[7]);
    bulk = ExpantaNum(loadeddata[8]);
    rebbuyables = loadeddata[9];
    //upd data;
    const asdf = ch.div(counts)
    document.getElementById("rebpts").innerText = reb+" Rebirth Points";  
    document.getElementById("resetchance").innerText = asdf.toString();
    document.getElementById("attemptshtml").innerText = attempts;
    document.getElementById("ath").innerText = alltimehigh;
    document.getElementById("high").innerText = counts;
}
function count() {
    attempts = attempts.add("1");
    document.getElementById("attemptshtml").innerText = attempts.toString();
    let rnd = Math.random();
    if (counts.gt(ch.mul(rnd))){
        counts = ExpantaNum(0);
        document.getElementById("resetchance").innerText = ExpantaNum(100);
    } else {
        counts = counts.add(countmulti);
        document.getElementById("resetchance").innerText = ch.div(counts).toString();
    }
    if (counts.gte(alltimehigh)) {
        alltimehigh = counts;
        document.getElementById("ath").innerText = alltimehigh.toString();
    }
    document.getElementById("high").innerText = counts.toString();
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
    if (alltimehigh.gte(30)) {
        counts = ExpantaNum(0);
        reb = reb.add(alltimehigh.div(30).mul(rebmulti).floor());
        alltimehigh = ExpantaNum(0);
        ch = basech;
        Object.keys(buyables).forEach(key => {
            const v = buyables[key];
            v.current = ExpantaNum(0);
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
        document.getElementById("resetchance").innerText = ch.div(counts).toString();
        document.getElementById("rebpts").innerText = reb+" Rebirth Points";
    }
}
function RebBuyable(upg){
    const upgnum = rebbuyables[upg];
    let currentcost = upgnum.cost;
    let currentgain = upgnum.change;
    if (upgnum.cscalemode == "^") {
        currentcost = ExpantaNum(upgnum.costscale).pow(upgnum.current);
    }
    if (upgnum.chscalemode == "^") {
        currentgain = ExpantaNum(upgnum.changescale).pow(upgnum.current);
    }
    if (upgnum.current != upgnum.max) {
        if (reb.gte(currentcost)&& upgnum.changing == "ch") {
            upgnum.current = ExpantaNum(upgnum.current).add(ExpantaNum(1));
            ch = ch.add(currentgain);
            basech = basech.add(currentgain);
            reb = reb.sub(currentcost);
        } else if(reb.gte(currentcost)&& upgnum.changing == "reb"){
            upgnum.current = ExpantaNum(upgnum.current).add(ExpantaNum(1));
            rebmulti = rebmulti.add(currentgain);
            reb = reb.sub(currentcost);
        } else if(reb.gte(currentcost)&& upgnum.changing == "auto" ){
            upgnum.current = ExpantaNum(upgnum.current).add(ExpantaNum(1));
            autotps = autotps.mul(1.5);
            reb = reb.sub(currentcost);
            document.getElementById(upgnum.id).innerText = "Cost: "+currentcost.toString()+" Current Auto Gain: "+(1).div(autotps).toString(); 
        };
    } else {
        document.getElementById(upgnum.id).disabled = true;
    }
    document.getElementById("rebpts").innerText = reb.toString()+" Rebirth Points"; 
}
function Buyable(upg){
    if (buyables[upg].current != buyables[upg].max) {
        if (alltimehigh>= buyables[upg].cost) { 
            buyables[upg].current = buyables[upg].current.add(bulk);
            ch = ch.add(buyables[upg].change);
            alltimehigh = alltimehigh.sub(buyables[upg].cost);
            document.getElementById(buyables[upg].id).innerText = buyables[upg].current.toString()+"/"+buyables[upg].max.toString();    
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
    let data = base;
    let jsondata = JSON.stringify(data);
    console.log("Reset Data");
    console.log(jsondata)
    localStorage.setItem('savedata',jsondata);
}
while (true) {
    if(autotps>0){
        setTimeout(count(),1/autotps)
    }
}