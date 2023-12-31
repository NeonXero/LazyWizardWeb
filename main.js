// https://github.com/IvarK/IvarK.github.io/tree/master/javascripts

// DOM
const currencyHeading = document.querySelector("#currency-heading");
const motPerSecondHeading = document.querySelector("#motPerSecond");

const buyNoviceButton = document.querySelector("#buy-novice-button");
const noviceCounter = document.querySelector("#novice-count");
const noviceCost = document.querySelector("#novice-cost");

const buyAmateurButton = document.querySelector("#buy-amateur-button");
const amateurCounter = document.querySelector("#amateur-count");
const amateurCost = document.querySelector("#amateur-cost");

const convertNoviceButton = document.querySelector("#convert-novice-button");
const elementalCounter = document.querySelector("#elemental-count");
const elementalCost = document.querySelector("#elemental-cost");

const earthCurrency = document.querySelector("#earth-count");
const fireCurrency = document.querySelector("#fire-count");
const natureCurrency = document.querySelector("#nature-count");
const chaosCurrency = document.querySelector("#chaos-count");


const hireEarthButton = document.querySelector("#hire-earth-button");
const hireFireButton = document.querySelector("#hire-fire-button");
const hireNatureButton = document.querySelector("#hire-nature-button");
const hireChaosButton = document.querySelector("#hire-chaos-button");

//Ele owns and costs TODO 921 a.m.
const earthCounter = document.querySelector("#earth-own");
const earthCost = document.querySelector("#earth-cost"); //on button how much cost
const fireCounter = document.querySelector("#fire-own");
const fireCost = document.querySelector("#fire-cost");
const natureCounter = document.querySelector("#nature-own");
const natureCost = document.querySelector("#nature-cost");
const chaosCounter = document.querySelector("#chaos-own");
const chaosCost = document.querySelector("#chaos-cost");


const earthRealm = document.querySelector("#earthRealm");
const natureRealm = document.querySelector("#natureRealm");
const fireRealm = document.querySelector("#fireRealm");
const chaosRealm = document.querySelector("#chaosRealm");


//Nature Zone
const natZoneAvailable = document.querySelector("#natureZoneAvailable");









/*
const castHeading = document.querySelector("#casters-heading");
const spellButton = document.querySelector("#spell-button");
const castButton = document.querySelector("#cast-button");
*/

// Game Variables
let motivation = 10;
let mps = 0;

let buyNoviceCost = 10;
let novices = 0;
let novicesPerSecond = 0;

let buyAmateurCost = 100;
let amateurs = 0;

let convertCost = 5;
let elementals = 0;

let earth = 0;
let fire = 0;
let nature = 0;
let chaos = 0;

let earthCostC = 1;
let fireCostC = 1;
let natureCostC = 1;
let chaosCostC = 1;

let earthMages = 0;
let fireMages = 0;
let natureMages = 0;
let chaosMages = 0;

//Nature Zone
let gatherers = 0;
let planters = 0;


//FOR FASTER DEBUGGING
motivation = 10000;
novices = 20;
elementals = 20;
earthMages = 10;
fireMages = 10;
natureMages = 10;
chaosMages = 10;

/*let spells = 0;
let casters = 0;
let castCost = 20;*/

$(document).ready(function () {
    console.log("ready!");
    updateUI();
    move();
});

// Event Listeners
buyNoviceButton.addEventListener("click", function () {
    if (canAfford(motivation, buyNoviceCost)) {
        novices += 1
        motivation -= buyNoviceCost;
        //cost up
    }

    updateUI();
});

buyAmateurButton.addEventListener("click", function () {
    if (canAfford(motivation, buyAmateurCost)) {
        amateurs += 1;
        novicesPerSecond += 1;
        motivation -= buyAmateurCost;
        //cost up
    }

    updateUI();
});

convertNoviceButton.addEventListener("click", function () {
    if (canAfford(novices, convertCost)) {
        elementals += 1;
        //ps
        novices -= convertCost;
    }

    updateUI();
});

hireEarthButton.addEventListener("click", function () {
    if (canAfford(earth, earthCostC)) {
        earth -= earthCostC;
        earthRealm.classList.remove("hideMe");
        earthMages += 1;
    }

    updateUI();
});

hireFireButton.addEventListener("click", function () {
    if (canAfford(fire, fireCostC)) {
        fire -= fireCostC;
        fireRealm.classList.remove("hideMe");
        fireMages += 1;
    }

    updateUI();
});

hireNatureButton.addEventListener("click", function () {
    if (canAfford(nature, natureCostC)) {
        nature -= natureCostC;
        natureRealm.classList.remove("hideMe");
        natureMages += 1;
    }

    updateUI();
});

hireChaosButton.addEventListener("click", function () {
    if (canAfford(chaos, chaosCostC)) {
        chaos -= chaosCostC;
        chaosRealm.classList.remove("hideMe");
        chaosMages += 1;
    }

    updateUI();
});

resetbtn.addEventListener("click", function () {
    motivation = 10;
    mps = 0;

    buyNoviceCost = 1; //TODO put to 10, this is just for testing
    novices = 0;
    novicesPerSecond = 0;

    buyAmateurCost = 100;
    amateurs = 0;

    convertCost = 5;
    elementals = 0;

    earth = 0;
    fire = 0;
    nature = 0;
    chaos = 0;

    updateUI();
});

/*

spellButton.addEventListener("click", function() {
    spells += 1;
    updateUI();
});

castButton.addEventListener("click", function() {
    if (canAfford(spells, castCost)) {
        casters += 1;
        spells -= castCost;
        castCost *= 1.5; 
    } else {
        //alert('nope');
    }
    updateUI();
});*/


// Game Loop and handling
setInterval(function () {
    motivation += (mps);
    updateUI();
}, 1000);

function updateUI() {
    //TODO thing with no triggering of more stats
    calculateNovices();

    calculateMPS();
    calculateElementalGain();


    currencyHeading.innerHTML = `Motivation: ${motivation}`;
    motPerSecondHeading.innerHTML = `Motivation per Second: ${mps}`;

    noviceCounter.innerHTML = `Own: ${novices} P/S ${novicesPerSecond}`;
    noviceCost.innerHTML = `Cost: ${buyNoviceCost}`;

    amateurCounter.innerHTML = `Own: ${amateurs}`;
    amateurCost.innerHTML = `Cost: ${buyAmateurCost}`;

    elementalCounter.innerHTML = `Own: ${elementals}`;
    elementalCost.innerHTML = `Cost: ${convertCost}`;

    earthCurrency.innerHTML = `Earth: ${Number(earth).toFixed(2)}`;
    fireCurrency.innerHTML = `Fire: ${Number(fire).toFixed(2)}`;
    natureCurrency.innerHTML = `Nature: ${Number(nature).toFixed(2)}`;
    chaosCurrency.innerHTML = `Chaos: ${Number(chaos).toFixed(2)}`;

    earthCounter.innerHTML = `Own: ${earthMages}`; //TODO don't have any of these counts yet....
    fireCounter.innerHTML = `Own: ${fireMages}`; //TODO don't have any of these counts yet....
    natureCounter.innerHTML = `Own: ${natureMages}`; //TODO don't have any of these counts yet....
    chaosCounter.innerHTML = `Own: ${chaosMages}`; //TODO don't have any of these counts yet....

    earthCost.innerHTML = `Cost: ${earthCostC}`; //TODO make cost go up probably
    fireCost.innerHTML = `Cost: ${fireCostC}`; //TODO make cost go up probably
    natureCost.innerHTML = `Cost: ${natureCostC}`; //TODO make cost go up probably
    chaosCost.innerHTML = `Cost: ${chaosCostC}`; //TODO make cost go up probably

    /*let costDown = Math.floor(autoCost * 100) / 100;
    autoButton.innerHTML = `Buy Autoizer ${costDown}`;
    
    spellHeading.innerHTML = `Spells: ${spells}`;
    castHeading.innerHTML = `Casters: ${casters}`;
    
    let cost2Down = Math.floor(castCost * 100) / 100;
    castButton.innerHTML = `Buy Caster ${cost2Down}`*/


    natZoneAvailable.innerHTML = `Available Nature Mages: ${natureMages - gatherers - planters}`
}

function canAfford(i, j) {
    return i >= j;
}

function calculateMPS() {
    mps = (novices * 1);
}

function calculateNovices() {
    novices += novicesPerSecond;
}

function calculateElementalGain() {
    //elementals
    let tempEarth = 0;
    let tempFire = 0;
    let tempNature = 0;
    let tempChaos = 0;

    for (var i = 0; i < elementals; i++) {
        //console.log("Rolling....");
        let rand = Math.floor(Math.random() * 4); // 0, 1, 2, 3
        switch (rand) {
            case 0:
                // console.log("Got earth");
                tempEarth += .1; //TODO vars for this
                break;
            case 1:
                // console.log("Got fire");
                tempFire += .1; //TODO vars for this
                break;
            case 2:
                // console.log("Got nature");
                tempNature += .1; //TODO vars for this
                break;
            case 3:
                // console.log("Got chaos");
                tempChaos += .1; //TODO vars for this
                break;
        }
    }

    earth += tempEarth;
    fire += tempFire;
    nature += tempNature;
    chaos += tempChaos;

}

function addGatherer() {
    gatherers = gatherers + 1;
    if ((natureMages - gatherers - planters) < 0)
        gatherers = gatherers - 1;

    document.querySelector("#countGatherer").innerHTML = gatherers;
    natZoneAvailable.innerHTML = `Available Nature Mages: ${natureMages - gatherers - planters}`
}

function subGatherer() {
    gatherers = gatherers - 1;
    if (gatherers < 0)
        gatherers = 0;

    document.querySelector("#countGatherer").innerHTML = gatherers;
    natZoneAvailable.innerHTML = `Available Nature Mages: ${natureMages - gatherers - planters}`
}

function addPlanter() {
    planters = planters + 1;
    if ((natureMages - gatherers - planters) < 0)
        planters = planters - 1;

    document.querySelector("#countPlanter").innerHTML = planters;
    natZoneAvailable.innerHTML = `Available Nature Mages: ${natureMages - gatherers - planters}`
}

function subPlanter() {
    planters = planters - 1;
    if (planters < 0)
        planters = 0;

    document.querySelector("#countPlanter").innerHTML = planters;
    natZoneAvailable.innerHTML = `Available Nature Mages: ${natureMages - gatherers - planters}`
}

function move() {

    let gth = document.getElementById("brownBar");
    let stepValueGather = 0;
    let idGather = setInterval(frameGather, 1000); //1000 = every second it ticks, 10 steps defined somewhere? 100% = 10 seconds ... down in the stepValue calculations
    // let fadeGather = setInterval(gatherHide, 4000);

    let plt = document.getElementById("greenBar");
    let stepValuePlant = 0;
    let idPlant = setInterval(framePlant, 1000); //1000 = every second it ticks, 10 steps defined somewhere? 100% = 10 seconds ... down in the stepValue calculations

    let findGather = document.getElementById("gatherBar");
    let findPlant = document.getElementById("plantBar");
    let gatherProgress = 10;
    let plantProgress = 5;

    function frameGather() {
        //console.log("Gather step " + stepValueGather);
console.log("Opatcity " + find)
        if (stepValueGather >= 100) {
            clearInterval(idGather);
            stepValueGather = 0;
            idGather = setInterval(frameGather, 1000);
            gth.style.width = (0) + "%";
            gth.innerHTML = (0) + "%";

        } else {
            if (stepValueGather == 0) {
                findGather.style.transitionDuration = ((100 / gatherProgress) / 3) + "s";
                findGather.classList.remove("opacity-one");
                findGather.classList.add("opacity-zero");
            }

            if (stepValueGather == (100 - gatherProgress)) {

                findGather.style.transitionDuration = "0ms";
                findGather.classList.remove("opacity-zero");
                findGather.classList.add("opacity-one");
                findGather.textContent = "Found thing!! " + Math.random();
                //TODO fade after a bit
                // findGather.style.opacity = 0;

                // console.log("Hideout going to be " + (100 / (gatherProgress) * 750));
                // findGather.style.transitionDuration = (100 / (gatherProgress) * 750) + "ms";
                // findGather.style.transitionDuration = "5s";
                // findGather.classList.remove("opacity-one");
                // findGather.classList.add("opacity-zero");

                // setTimeout(gatherHide, (100 / (gatherProgress) * 750));
                //setTimeout(gatherHide, 1000);
                // setTimeout(() => {
                //     gatherHide();
                // }, 1000);

            } else {
                // findGather.classList.remove("opacity-zero");
                // findGather.classList.add("opacity-one");
                //findGather.textContent = "";
            }

            gth.style.width = (stepValueGather + gatherProgress) + "%";
            gth.innerHTML = (stepValueGather + gatherProgress) + "%";
            stepValueGather = (stepValueGather + gatherProgress);
        }


    }

    // function gatherHide() {
    //     console.log("Gather hide...");
    //     //findGather.textContent = "";
    //     findGather.classList.remove("opacity-zero");
    //     findGather.classList.add("opacity-one");
    // }

    function framePlant() {
        //console.log("Plant step " + stepValuePlant);

        if (stepValuePlant >= 100) {
            clearInterval(idPlant);
        } else {
            plt.style.width = (stepValuePlant + plantProgress) + "%";
            plt.innerHTML = (stepValuePlant + plantProgress) + "%";
            stepValuePlant = (stepValuePlant + plantProgress);
        }
    }
}

function johnd() {
    alert('prestige points can be called scribes or something similar...lazy wizard=can be lazier All gold UI Fresh to death fonts Chester’s chicken icons Notifications so white it’ll hurt your eyes ' +
        'Built in XML parser On fleek progression Mom’s spaghetti (it’s ready) BOOOZZUUUUTOOOOOOOO (╯°□°）╯︵ ┻━┻  mini game Dank memes Thumb tacks ' +
        'Steam controller support [done, pushed to store] Lazy Wizard 101: Muggle Motivation help page Get rid of all the fried foods RegEx minigames ' +
        'Hidden corner button for stupid ideas D Knapsack to appear in credits 3D Printer API Lots of “this thing is forking garbage” reviews ' +
        'Minecraft API compatible Ask for SU permissions before it’s even installed');
}

function bob() {
    alert("Things Double Secret Harambe Mode Banana for scale Phil: What should we call the search parameters that limit results? Bill: How about billters? Phil: I have a better idea…");
}



/*var gameLoopIntervalId;
var Marathon = 0;
var Marathon2 = 0;
var auto = false;
var autoS = true;
var shiftDown = false;
var controlDown = false;
var justImported = false;
var saved = 0;
var painTimer = 0;
var keySequence = 0;
var failureCount = 0;
var implosionCheck = 0;
var TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
var DISPLAY_NAMES = [ null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth" ];
var forceHardReset = false;*/
var player = {
    /*money: new double(10),
    tickSpeedCost: new Decimal(1000),
    tickspeed: new Decimal(1000),
    firstCost: new Decimal(10),
    secondCost: new Decimal(100),
    firstAmount: new Decimal(0),
    secondAmount: new Decimal(0),
    firstBought: 0,
    secondBought: 0,
    achievements: [],
    infinityUpgrades: [],
    challenges: [],
    interval: null,
    lastUpdate: new Date().getTime(),
    autobuyers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
    tickspeedMultiplier: new Decimal(10),
    chall2Pow: 1,
    chall3Pow: new Decimal(0.01),
    matter: new Decimal(0),
    chall11Pow: new Decimal(1),
    partInfinityPoint: 0,
    partInfinitied: 0,
    break: false,
    epmult: new Decimal(1),
    epmultCost: new Decimal(500),
    infinityDimension1 : {
        cost: new Decimal(1e8),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension2 : {
        cost: new Decimal(1e9),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infDimBuyers: [false, false, false, false, false, false, false, false],
    timeShards: new Decimal(0),
    tickThreshold: new Decimal(1),
    totalTickGained: 0,
    timeDimension1: {
        cost: new Decimal(1),
        amount: new Decimal(0),
        power: new Decimal(1),
        bought: 0
    },
    timeDimension2: {
        cost: new Decimal(5),
        amount: new Decimal(0),
        power: new Decimal(1),
        bought: 0
    },
    offlineProd: 0,
    offlineProdCost: 1e7,
    challengeTarget: 0,
    autoSacrifice: 1,
    timestudy: {
        theorem: 0,
        amcost: new Decimal("1e20000"),
        ipcost: new Decimal(1),
        epcost: new Decimal(1),
        studies: [],
    },
    dead: true,
    options: {
        
    }*/

};

