const dino_canvas = document.getElementById("dino_canvas");
const blend_2d = dino_canvas.getContext("2d");
let x = 50;
let y = 50;

function randomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function ereaseanddraw() {
  //On efface le dino_canvas précédent
  blend_2d.clearRect(0, 0, dino_canvas.width, dino_canvas.height);

  //On dessine le sol
  blend_2d.fillStyle = "gray";
  blend_2d.fillRect(0, dino_canvas.height - 20, dino_canvas.width, 20);

  //Puis on dessine le dino (rectangle rouge)
  blend_2d.fillStyle = "red";
  blend_2d.fillRect(x, y, 50, 50);

  generateObstacles();
  for (var i = 0; i < all_obstacles.length; i++) {
    //Dessiner les obstacles
    drawObstacle(all_obstacles[i].x);
    all_obstacles[i].x -= 2; //Déplace l'obstacle vers la gauche
  }

  // drawDino(); //Dessiner le dino
  // if (jumping) {
  //   jump();
  // }
}

function move(event) {
  //Déplace le rectangle (futur dino) en fonction de la touche préssée
  switch (event.keyCode) {
    case 38:
      y -= 10; //Touche haut
      break;
    case 40:
      y += 10; //Touche bas
      break;
  }
}
document.addEventListener("keydown", move);
setInterval(ereaseanddraw, 5);

function createobstacle(x) {
  //en fonction de la position de la variable x
  blend_2d.beginPath(); //on démare
  blend_2d.rect(x, dino_canvas.height - 70, 20, 50); //On fait un rectangle de
  //20px*50 et on retire 50px au dino_canvas pour le faire rentrer
  blend_2d.fillStyle = "blue"; //on met du bleu
  blend_2d.fill(); //on rempli
  blend_2d.closePath(); //on termine
}

let all_obstacles = []; //Un tableau obstacles

function generateObstacles() {
  //fonction pour générer des obstacles
  setInterval(function () //on met un interval
  {
    let x = dino_canvas.width; // x = la longueur du dino_canvas
    let obstacle = {
      //la position de l'obstacle est = à x et à la hauteur
      //du dino_canvas - 70
      x: x,
      y: dino_canvas.height - 70,
    };
    all_obstacles.push(obstacle);

    //On créé un élément image pour l'obstacle

    const obstacleImage = new Image();
    obstacleImage.src = "image.obstacle.png";
    obstacleImage.className = "obstacle"; //On défini la classe

    //On ajoute l'obsatcle sur la piste (sur le canvas)
    const gameContainer = doc.getElementById('game-container');
    gameContainer.appendChild(obstacleImage)
  }, randomInterval(1000, 5000));

  // Créer un élément div pour l'obstacle
  const obstacleElement = document.createElement("div");
  obstacleElement.className = "obstacle";
  obstacleElement.style.left = "100%";

  // Récupérer le conteneur de jeu et ajouter l'obstacle
  const gameContainer = document.getElementById("game-container");
  gameContainer.appendChild(obstacleElement);

  // Initialiser la position et la vitesse de l'obstacle
  let obstaclePosition = 100;
  let obstacleSpeed = 5;

  // Fonction pour déplacer l'obstacle et vérifier s'il sort de l'écran
  function moveObstacle() {
    obstaclePosition -= obstacleSpeed;
    obstacleElement.style.left = obstaclePosition + "%";

    // Mettre à jour la position de l'obstacle toutes les 5 millisecondes
    const obstacleInterval = setInterval(moveObstacle, 5);
    
    // Si l'obstacle sort de l'écran, le supprimer et arrêter l'interval
    if (obstaclePosition < -10) {
      gameContainer.removeChild(obstacleElement);
      clearInterval(obstacleInterval);
    }
  }
}
