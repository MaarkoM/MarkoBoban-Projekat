

window.onload = function () {
  if (localStorage.getItem("trenutniLevel")) {
    level = parseInt(localStorage.getItem("trenutniLevel"));
    document.querySelector("#level").innerHTML = `Level : ${level}`;
  }
  if (level == 1) {
    pokreniTajmer(80);
  }

  if (level == 2) {
    pokreniTajmer(60);
  }

  if (level == 3) {
    pokreniTajmer(45);
    // if(porukaH == ispis){
    //   document.querySelector(".dugme3").addEventListener("click", () => {
    //   resetLvl();
    // })
    // };
  }
};
// import JSConfetti from 'js-confetti'
// const jsConfetti = new JSConfetti()

let warningCounter = 0;
document.querySelector("#home").addEventListener("click", () => {
  if (warningCounter == 0) {
    warning();
    warningCounter++;
  }
});

function warning() {
  let div = document.createElement("div");
  div.classList.add("backDrop");
  let ispis = `
  <div class = 'warning'>
  <h3>Warning!</h3>
  <p>If you leave, you will lose your progress. Please select an option.</p>
  <button class="yes">Yes</button>
  <button class="no">No</button>
  </div>`;
  div.innerHTML = ispis;
  document.body.append(div);

  document.querySelector(".yes").addEventListener("click", home);

  document.querySelector(".no").addEventListener("click", () => {
    warningCounter = 0;
    div.remove();
  });
}

let level = 1;
let dugmeHome = document.querySelector("#home");
let p = document.createElement("p");
p.setAttribute("id", "level");
p.innerHTML += `Level : ${level}`;
dugmeHome.insertAdjacentElement("afterend", p);

const map1 = new Map();
const divIds = [
  "prva",
  "druga",
  "treca",
  "cetvrta",
  "peta",
  "sesta",
  "sedma",
  "osma",
  "deveta",
  "deseta",
  "jedanaesta",
  "dvanaesta",
];
map1.set(1, "assets/img/G-Bear.jpg");
map1.set(2, "assets/img/G-Bear.jpg");
map1.set(3, "assets/img/G-Fox2.jpg");
map1.set(4, "assets/img/G-Fox2.jpg");
map1.set(5, "assets/img/G-Owl.jpg");
map1.set(6, "assets/img/G-Panda2.jpg");
map1.set(7, "assets/img/G-Panda2.jpg");
map1.set(8, "assets/img/G-Wolf2.jpg");
map1.set(9, "assets/img/G-Wolf2.jpg");
map1.set(10, "assets/img/G-Owl.jpg");
map1.set(11, "assets/img/G-Sun.jpg");
map1.set(12, "assets/img/G-Sun.jpg");

const pairs = Array.from(map1.entries());

//Fisher-Yates-algoritam za nasumično miješanje elemenata niza
for (let i = pairs.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
}

const shuffledMap = new Map(pairs);

const divIndexes = Array.from({ length: divIds.length }, (_, index) => index);

for (const [value, key] of shuffledMap.entries()) {
  const randomIndex = Math.floor(Math.random() * divIndexes.length);
  const divIdIndex = divIndexes.splice(randomIndex, 1)[0];
  const divId = divIds[divIdIndex];
  const div = document.getElementById(divId);
  div.dataset.vrednost = value;
  div.addEventListener("click", klikNaKarticu);
}

////
let okrenuteKartice = [];

function klikNaKarticu() {
  const kartica = this;
  if (okrenuteKartice.length < 2 && !okrenuteKartice.includes(kartica)) {
    kartica.style.backgroundImage = `url(${shuffledMap.get(
      parseInt(kartica.dataset.vrednost)
    )})`;
    okrenuteKartice.push(kartica);
    zvucniEfekat();
    if (okrenuteKartice.length === 2) {
      setTimeout(proveriKartice, 1000);
    }
  }
}

let counter = 0;
function proveriKartice() {
  const [prvaKartica, drugaKartica] = okrenuteKartice; //Destrukturiranje niza okrenuteKartice tako da prva i druga kartica
  //dobiju vrijednosti iz niza. Prva kartica će biti prvaKartica, a druga kartica će biti drugaKartica.
  const slikaPrveKartice = prvaKartica.style.backgroundImage;
  const slikaDrugeKartice = drugaKartica.style.backgroundImage;
  if (slikaPrveKartice === slikaDrugeKartice) {
    // Ako su slike iste, kartice ostaju otvorene
    prvaKartica.style.userSelect = "none";
    drugaKartica.style.userSelect = "none";
    prvaKartica.style.cursor = "auto";
    drugaKartica.style.cursor = "auto";
    prvaKartica.removeEventListener("click", klikNaKarticu);
    drugaKartica.removeEventListener("click", klikNaKarticu);
    counter++;
    if (counter == 1) {
      clearInterval(interval);
      poruka();
    }
    okrenuteKartice.length = 0;
  } else {
    // Ako su slike različite, sakrijemo kartice nakon 1s
    setTimeout(() => {
      prvaKartica.style.backgroundImage = "";
      drugaKartica.style.backgroundImage = "";
      okrenuteKartice.length = 0;
    }, 1000);
  }
}
let ispis = ``
let porukaH;
function poruka() {
   porukaH = document.querySelector(".poruka");
   porukaH.parentElement.classList.add("backDrop");
  
  if(level == 3){
     ispis = `
     
    <div class="porukaWrap">
      <h1 class="naslovPoruka">You Won!</h1>
      <div class="dugmici">
        <button class="dugme3 btn btn-success">Play again</button>
        <button class="dugme2 btn btn-danger">Home</button>
      </div>
    </div>
    
  `;

//   let duration = 5 * 1000;
// let animationEnd = Date.now() + duration;
// let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
// let confetti;


// let intervalConfetti = setInterval(function() {
//   let timeLeft = animationEnd - Date.now();

//   if (timeLeft <= 0) {
//     return clearInterval(intervalConfetti);
//   }

//   let particleCount = 50 * (timeLeft / duration);
//   // since particles fall down, start a bit higher than random
//   confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
//   confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
// }, 250);
// jsConfetti.addConfetti()

  } else {
     ispis = `
     
    <div class="porukaWrap">
      <h1 class="naslovPoruka">Level cleared</h1>
      <div class="dugmici">
        <button class="dugme1 btn btn-success">Next Level</button>
        <button class="dugme2 btn btn-danger">Home</button>
      </div>
    </div>
    
  `;
  }
  
  porukaH.innerHTML += ispis;
  if(porukaH.innerHTML == ispis){
  document.querySelector(".dugme2").addEventListener("click", () => {
    level = 1;
    localStorage.setItem("trenutniLevel", level);
    home();
  });
if(level<3){
  // console.log("naace");
  document.querySelector(".dugme1").addEventListener("click", () => {
    noviLevel();
    reload();
  });
}
if(level == 3){
  document.querySelector(".dugme3").addEventListener("click", resetLvl);
}
  
}
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function noviLevel() {
  level++;
  console.log(level);
  localStorage.setItem("trenutniLevel", level);
  document.querySelector("#level").innerHTML = `Level: ${level}`;
  reload();
}

function reload() {
  location.reload();
}

let interval;
function pokreniTajmer(vreme) {
  var prikaz = document.querySelector(".vreme");
  var tajmer = vreme;
  interval = setInterval(function () {
    minute = parseInt(tajmer / 60, 10);
    sekunde = parseInt(tajmer % 60, 10);

    minute = minute < 10 ? "0" + minute : minute;
    sekunde = sekunde < 10 ? "0" + sekunde : sekunde;
    prikaz.textContent = minute + ":" + sekunde;
    if (--tajmer < 0) {
      clearInterval(interval);
      notification();
    }
    if (tajmer < 10){
      prikaz.classList.add("crveno")
    }
  }, 1000);
}

function notification() {
  let div = document.createElement("div");
  div.classList.add("backDrop");
  let ispis = `
  <div class = 'notification'>
  <h3>Notification</h3>
  <p>Unfortunately, your time has expired. You need to start from the beginning.</p>
  <button id="restart">Restart game</button>
  </div>`;
  div.innerHTML = ispis;
  document.body.append(div);

  document.querySelector("#restart").addEventListener("click", resetLvl);
}

function resetLvl(){
  level = 1;
  localStorage.setItem("trenutniLevel", level);
  reload();

}

function home(){
    localStorage.removeItem("trenutniLevel");
    window.open("./index.html", "_self");
}

function zvucniEfekat() {
  let audio = document.getElementById("zvucniEfekat");
  audio.currentTime = 0;
  audio.play();
}

