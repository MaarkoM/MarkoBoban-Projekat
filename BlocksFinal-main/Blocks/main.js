document.querySelector(".prvo").addEventListener("click", function () {
  window.open("./drugaStranica.html", "_self");
});
let autori = document.querySelector(".drugo");
autori.addEventListener("click", otvoriAutori);

document.querySelector(".trece").addEventListener("click", function () {
  window.open("https://www.google.com/", "_self");
});
let settings = document.querySelector(".cetvrto");
settings.addEventListener("click", otvoriSettings);

const soundMain = document.getElementById("mainSong");

brojacAutori = 0;
function otvoriAutori() {
  let ispis = ``;
  let autorWrap = document.querySelector(".autorWrapper");
  if (brojacAutori == 0) {
    autorWrap.style.display = "block";
    ispis += `
  <h2>Credits<i class="fa-solid fa-circle-xmark" id="close"></i></h2>
  <div class="row row1">
    <img src="${"./assets/img/profilnaBT.jpg"}" alt="Greška, profilnaBT.jpg nije podržana.">
    <img src="${"./assets/img/profilnaBT.jpg"}" alt="Greška, profilnaMM.jpg nije podržana.">
    </div>
    <div class="row row2">
    <a href="https://github.com/todicb" target="_blank">Boban Todić <i class="fa-brands fa-github"></i></a>
    <a href="https://github.com/MaarkoM" target="_blank">Marko Mojsilović <i class="fa-brands fa-github"></i></a>
  </div>
    `;
    autorWrap.innerHTML = ispis;
    autori.style.backgroundColor = "rgba(0, 33, 71, 0.8)";
    autori.style.color = "rgb(252,213,181)";
    autori.removeEventListener("mouseover", misStavljen);
    autori.removeEventListener("mouseout", misSklonjen);
    brojacAutori++;

    document.getElementById("close").addEventListener("click", function () {
      autorWrap.style.display = "none";
      brojacAutori = 0;
      autori.style.backgroundColor = "white";
      autori.style.color = "black";
      autori.addEventListener("mouseover", misStavljen);
      autori.addEventListener("mouseout", misSklonjen);
    });
  } else if (brojacAutori == 1) {
    autorWrap.style.display = "none";
    autori.style.backgroundColor = "white";
    autori.style.color = "black";
    autori.addEventListener("mouseover", misStavljen);
    autori.addEventListener("mouseout", misSklonjen);
    brojacAutori = 0;
  }
}
// DUGME ZA SETTINGS
let brojacSett = 0;
let checkFleg = 1;

function otvoriSettings() {
  let ispis = ``;
  let settWrap = document.querySelector(".settWrapper");
  if (brojacSett == 0) {
    settWrap.style.display = "block";
    ispis += `
    <h2>Settings<i class="fa-solid fa-circle-xmark" id="close-left"></i></h2>
    <div class="settMain">
    <div class="settVol">
    <label for="vol">Volume </label>
    <input type="range" name="vol" id="vol" min="0" max="10" step="1" value=${
      soundMain.volume * 10
    }>
    </div>
    <div class="settMute">
    <label for="mute">Mute </label>
    <input type="checkbox" name="mute" id="mute">
    </div>
    </div>
    `;
    settWrap.innerHTML = ispis;
    brojacSett++;
    document
      .getElementById("close-left")
      .addEventListener("click", function () {
        settWrap.style.display = "none";
        brojacSett = 0;
      });
    localStorage.setItem("muteFleg", checkFleg);
    const soundCheckbox = document.getElementById("mute");
    const volumeMixer = document.getElementById("vol");

    if (checkFleg == 1) {
      soundCheckbox.checked = true;
    } else {
      soundCheckbox.checked != true;
    }

    volumeMixer.addEventListener("change", function () {
      soundMain.volume = this.value / 10;
    });

    soundCheckbox.addEventListener("change", function () {
      if (localStorage.getItem("muteFleg", checkFleg) == 1) {
        soundMain.play();
        checkFleg = 0;
        localStorage.setItem("muteFleg", checkFleg);
      } else {
        soundMain.pause();
        checkFleg = 1;
        localStorage.setItem("muteFleg", checkFleg);
      }
    });
  } else if (brojacSett == 1) {
    settWrap.style.display = "none";
    brojacSett = 0;
  }
}
function misStavljen() {
  autori.style.backgroundColor = "rgba(0, 33, 71, 0.8)";
  autori.style.color = "rgb(252,213,181)";
}
function misSklonjen() {
  autori.style.backgroundColor = "white";
  autori.style.color = "black";
}
