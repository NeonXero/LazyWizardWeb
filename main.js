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


const earthRealm = document.querySelector("#earthRealm");
const natureRealm = document.querySelector("#natureRealm");
const fireRealm = document.querySelector("#fireRealm");
const chaosRealm = document.querySelector("#chaosRealm");










/*
const castHeading = document.querySelector("#casters-heading");
const spellButton = document.querySelector("#spell-button");
const castButton = document.querySelector("#cast-button");
*/

// Game Variables
let motivation = 10;
let mps = 0;

let buyNoviceCost = 1; //TODO put to 10, this is just for testing
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


/*let spells = 0;
let casters = 0;
let castCost = 20;*/

$( document ).ready(function() {
    console.log( "ready!" );
    updateUI();
});

// Event Listeners
buyNoviceButton.addEventListener("click", function() {
    if (canAfford(motivation, buyNoviceCost)) {
        novices += 1
        motivation -= buyNoviceCost;
        //cost up
    }
    
    updateUI();
});

buyAmateurButton.addEventListener("click", function() {
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

hireEarthButton.addEventListener("click", function() {
    if (canAfford(earth, 1)) {
        //TODO price
        earthRealm.classList.remove("hideMe");
    }
});

hireFireButton.addEventListener("click", function() {
    if (canAfford(fire, 1)) {
        //TODO price
        fireRealm.classList.remove("hideMe");
    }
});

hireNatureButton.addEventListener("click", function() {
    if (canAfford(nature, 1)) {
        //TODO price
        natureRealm.classList.remove("hideMe");
    }
});

hireChaosButton.addEventListener("click", function() {
    if (canAfford(chaos, 1)) {
        //TODO price
        chaosRealm.classList.remove("hideMe");
    }
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
setInterval( function() {
    motivation += (mps);
    updateUI();
}, 1000);

function updateUI() {
    
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
    
    /*let costDown = Math.floor(autoCost * 100) / 100;
    autoButton.innerHTML = `Buy Autoizer ${costDown}`;
    
    spellHeading.innerHTML = `Spells: ${spells}`;
    castHeading.innerHTML = `Casters: ${casters}`;
    
    let cost2Down = Math.floor(castCost * 100) / 100;
    castButton.innerHTML = `Buy Caster ${cost2Down}`*/
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
        console.log("Rolling....");
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

