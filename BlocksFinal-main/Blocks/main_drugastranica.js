window.onload = function () {
  if (localStorage.getItem("trenutniLevel")) {
    level = parseInt(localStorage.getItem("trenutniLevel"));
    document.querySelector("#level").innerHTML = `Level : ${level}`;
  }
  if (level == 1) {
    pokreniTajmer(60);
  }

  if (level == 2) {
    pokreniTajmer(45);
  }

  if (level == 3) {
    pokreniTajmer(5);
  }
};

let warningCounter = 0;
document.querySelector("#home").addEventListener("click", () => {
  if (warningCounter == 0) {
    warning();
    warningCounter++;
  }
});

function warning() {
  let div = document.createElement("div");
  div.classList.add("warning");
  let ispis = `
  <h3>Warning!</h3>
  <p>If you leave, you will lose your progress. Please select an option.</p>
  <button class="yes">Yes</button>
  <button class="no">No</button>`;
  div.innerHTML = ispis;
  document.body.append(div);

  document.querySelector(".yes").addEventListener("click", () => {
    localStorage.removeItem("trenutniLevel");
    window.open("./index.html", "_self");
  });

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
map1.set(1, "assets/img/profilnaBT.jpg");
map1.set(2, "assets/img/background-2.jpg");
map1.set(3, "assets/img/1.jpg");
map1.set(4, "assets/img/1.jpg");
map1.set(5, "assets/img/2.jpg");
map1.set(6, "assets/img/2.jpg");
map1.set(7, "assets/img/profilnaBT.jpg");
map1.set(8, "assets/img/background-2.jpg");
map1.set(9, "assets/img/3.jpeg");
map1.set(10, "assets/img/3.jpeg");
map1.set(11, "assets/img/favicon.png");
map1.set(12, "assets/img/favicon.png");

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

function poruka() {
  let poruka = document.querySelector(".poruka");
  let ispis = `
    <div class="porukaWrap">
      <h1 class="naslovPoruka">Završili ste igru!</h1>
      <div class="dugmici">
        <button class="dugme1 btn btn-secondary">Vratite se na početak</button>
        <button class="dugme2 btn btn-primary">Započnite novu igru</button>
      </div>
    </div>
  `;
  poruka.innerHTML += ispis;
  document.querySelector(".dugme1").addEventListener("click", () => {
    level = 1;
    localStorage.setItem("trenutniLevel", level);
    reload();
  });

  document.querySelector(".dugme2").addEventListener("click", () => {
    noviLevel();
    reload();
  });
}

function noviLevel() {
  level++;
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
  }, 1000);
}

function notification() {
  let div = document.createElement("div");
  div.classList.add("notification");
  let ispis = `
  <h3>Notification</h3>
  <p>Unfortunately, your time has expired. You need to start from the beginning.</p>
  <button id="restart">Restart game</button>`;
  div.innerHTML = ispis;
  document.body.append(div);

  document.querySelector("#restart").addEventListener("click", () => {
    level = 1;
    localStorage.setItem("trenutniLevel", level);
    reload();
  });
}
