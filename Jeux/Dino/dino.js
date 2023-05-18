const container = document.querySelector("#container");
const dino = document.querySelector("#dino");
const block = document.querySelector("#block");
const road = document.querySelector("#road");
const cloud = document.querySelector("#cloud");
const score = document.querySelector("#score");
const gameOver = document.querySelector("#gameOver");

//Définition de Score
let interval = null;
let playerScore = 0;
//De sa fonction
let scoreCounter = () => {
  playerScore++;
  score.innerHTML = `Score <b>${playerScore}</b>`;
};
//Démarage de la partie
window.addEventListener("keydown", (start) => {
  if (start.code == "Space") {
    gameOver.style.display = "none";
    block.classList.add("blockActive");
    road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
    cloud.firstElementChild.style.animation =
      "cloudAnimate 50s linear infinite";

    //Setup du Score
    let playerScore = 0;
    interval = setInterval(scoreCounter, 200);
  }
});

//Saut du dino

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    if (dino.classList != "dinoActive") {
      dino.classList.add("dinoActive");
      //Retire la classe après 0.5 sec
      setTimeout(() => {
        dino.classList.remove("dinoActive");
      }, 500);
    }
  }
});

//Game Over en cas de colision

let result = setInterval(() => {
  let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));

  let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));

  if (dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
    gameOver.style.display = "block";
    block.classList.remove("blockActive");
    road.firstElementChild.style.animation = "none";
    cloud.firstElementChild.style.animation = "none";
    clearInterval(interval);
    playerScore = 0;
  }
}, 10);
