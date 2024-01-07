snakediv.style.transform = "rotate(132deg)";

let deg = 0;

let int;
let int1;
let int2;

let running;
let closed = 1;

let audio;

let n = 0;
let gamemode = "classic";

let cS = JSON.parse(localStorage.getItem("bestscorejs")) || 0;
let a1S = JSON.parse(localStorage.getItem("bestadvancedscorejs")) || 0;

sBR.value = JSON.parse(localStorage.getItem("volume"));

let snakepath = JSON.parse(localStorage.getItem("snakepath")) || "no";

if (snakepath === "yes") {
  snakediv.classList.remove("none");
  snakediv.classList.add("snakego");
} else if (snakepath === "no") {
  snakediv.classList.add("none");
  snakediv.classList.remove("snakego");
}

window.addEventListener("keydown", (e) => {
  e = e.keyCode;
  if (n === 0 && e === 83) {
    n++;
  } else if (n === 1 && e === 78) {
    n++;
  } else if (n === 2 && e === 65) {
    n++;
  } else if (n === 3 && e === 75) {
    n++;
  } else if (n === 4 && e === 69) {
    window.location.href = "/SecretSnake/index.html";
  } else {
    n = 0;
  }
});

scoreChange();

snakediv.addEventListener("click", () => {
  snakepath = "no";
  localStorage.setItem("snakepath", JSON.stringify(snakepath));
  setTimeout(() => {
    window.location.href = "/SecretSnake/index.html";
  }, 1000);
});

startButtonJS.addEventListener("click", () => {
  clickSound(1);
  soundMenu.style.zIndex = 0;
  gamemodeMenu.style.zIndex = 0;
  scoresMenu.style.zIndex = 0;
  optionsDiv.style.zIndex = 0;
  menu.style.zIndex = 0;
  snakediv.style.zIndex = 0;
  bum.classList.add("active");
  setTimeout(() => {
    window.location.href = "/playground.html";
  }, 1500);
});

optionsDiv.addEventListener("mouseover", () => {
  int = setInterval(() => {
    optionsDiv.style.transform = `rotateZ(${deg}deg`;
    deg++;
    if (deg >= 360) {
      deg = 0;
    }
  }, 10);
});
optionsDiv.addEventListener("mouseout", () => {
  clearInterval(int);
});
optionsDiv.addEventListener("click", () => {
  if (!running) {
    clickSound(2);
    clearInterval(int);
    clearInterval(int1);
    clearInterval(int2);
    running = 1;
    closeAll();
    if (!closed) {
      let n = 0;
      let m1 = 0;
      let m2 = -20;
      let m3 = -40;
      int1 = setInterval(() => {
        if (n <= 100) {
          optionsDiv.style.transform = `rotateZ(${deg}deg`;
          deg += 4;
          if (deg >= 360) {
            deg = 0;
          }
          n++;
        } else {
          clearInterval(int1);
        }
      }, 0.1);

      int2 = setInterval(() => {
        if (m1 < 200) {
          m1 += 2;
          mB1.style.left = `${m1}px`;
        }
        if (m2 < 200) {
          m2 += 2;
          if (m2 >= 0) {
            mB2.style.left = `${m2}px`;
          }
        }
        if (m3 < 200) {
          m3 += 2;
          if (m3 >= 0) {
            mB3.style.left = `${m3}px`;
          }
        } else {
          clearInterval(int2);
          running = 0;
        }
      }, 1);
      closed = 1;
    } else {
      let n = 0;
      let m1 = 200;
      let m2 = 220;
      let m3 = 240;
      int1 = setInterval(() => {
        if (n <= 100) {
          optionsDiv.style.transform = `rotateZ(${deg}deg`;
          deg += 4;
          if (deg >= 360) {
            deg = 0;
          }
          n++;
        } else {
          clearInterval(int1);
        }
      }, 0.1);

      int2 = setInterval(() => {
        if (m1 > 0) {
          m1 -= 2;
          mB1.style.left = `${m1}px`;
        }
        if (m2 > 0) {
          m2 -= 2;
          if (m2 <= 200) {
            mB2.style.left = `${m2}px`;
          }
        }
        if (m3 > 0) {
          m3 -= 2;
          if (m3 <= 200) {
            mB3.style.left = `${m3}px`;
          }
        } else {
          clearInterval(int2);
          running = 0;
        }
      }, 1);
      closed = 0;
    }
  }
});
mB1.addEventListener("click", () => {
  if (!gamemodeMenu.classList.contains("none")) {
    gamemodeMenu.classList.add("none");
  }
  if (!scoresMenu.classList.contains("none")) {
    scoresMenu.classList.add("none");
  }
  if (soundMenu.classList.contains("none")) {
    soundMenu.classList.remove("none");
  } else {
    soundMenu.classList.add("none");
  }
});
mB2.addEventListener("click", () => {
  if (!soundMenu.classList.contains("none")) {
    soundMenu.classList.add("none");
  }
  if (!scoresMenu.classList.contains("none")) {
    scoresMenu.classList.add("none");
  }
  if (gamemodeMenu.classList.contains("none")) {
    gamemodeMenu.classList.remove("none");
  } else {
    gamemodeMenu.classList.add("none");
  }
});
mB3.addEventListener("click", () => {
  if (!soundMenu.classList.contains("none")) {
    soundMenu.classList.add("none");
  }
  if (!gamemodeMenu.classList.contains("none")) {
    gamemodeMenu.classList.add("none");
  }
  if (scoresMenu.classList.contains("none")) {
    scoresMenu.classList.remove("none");
  } else {
    scoresMenu.classList.add("none");
  }
});
cross.addEventListener("click", () => {
  soundMenu.classList.add("none");
  clickSound(1);
});
cross1.addEventListener("click", () => {
  gamemodeMenu.classList.add("none");
  clickSound(1);
});
cross2.addEventListener("click", () => {
  scoresMenu.classList.add("none");
  clickSound(1);
});
gB1.addEventListener("click", () => {
  gamemode = "classic";
  localStorage.setItem("gamemode", JSON.stringify(gamemode));
});
gB2.addEventListener("click", () => {
  gamemode = "advanced";
  localStorage.setItem("gamemode", JSON.stringify(gamemode));
});

let gamemodeButton = document.querySelectorAll(".gamemodeButton");
for (let i = 0; i < gamemodeButton.length; i++) {
  gamemodeButton[i].addEventListener("click", () => {
    clickSound(1);
    gamemodeMenu.classList.add("none");
  });
}

let menuButton = document.querySelectorAll(".menuButton");
for (let i = 0; i < menuButton.length; i++) {
  menuButton[i].addEventListener("click", () => {
    clickSound(1);
  });
}
function scoreChange() {
  classicScore.innerHTML = `Your best score in classic is ${cS}!`;
  advanced1HPScore.innerHTML = `Your best score in advanced is ${a1S}!`;
}

function clickSound(type) {
  let v = sBR.value;
  localStorage.setItem("volume", JSON.stringify(v));
  switch (true) {
    case type === 1:
      audio = new Audio("/Audio/kp.mp3");
      audio.volume = v / 100;
      break;
    case type === 2:
      audio = new Audio("/Audio/kp2.mp3");
      audio.volume = v / 100;
      break;
  }
  audio.play();
}
function closeAll() {
  if (!gamemodeMenu.classList.contains("none")) {
    gamemodeMenu.classList.add("none");
  }
  if (!scoresMenu.classList.contains("none")) {
    scoresMenu.classList.add("none");
  }
  if (!soundMenu.classList.contains("none")) {
    soundMenu.classList.add("none");
  }
}
