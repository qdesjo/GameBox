// Définition de la classe Vec pour représenter un vecteur
class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  // Propriété len pour calculer la longueur du vecteur
  get len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  // Setter len pour ajuster la longueur du vecteur
  set len(value) {
    const f = value / this.len;
    this.x *= f;
    this.y *= f;
  }
}
// Définition de la classe Rect pour représenter un rectangle
class Rect {
  constructor(x = 0, y = 0) {
    this.pos = new Vec(0, 0);
    this.size = new Vec(x, y);
  }
  // Propriétés left, right, top, bottom pour déterminer les bords du rectangle
  get left() {
    return this.pos.x - this.size.x / 2;
  }
  get right() {
    return this.pos.x + this.size.x / 2;
  }
  get top() {
    return this.pos.y - this.size.y / 2;
  }
  get bottom() {
    return this.pos.y + this.size.y / 2;
  }
}
// Classe Ball héritant de Rect pour représenter une balle
class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vec();
  }
}
// Classe Player héritant de Rect pour représenter un joueur
class Player extends Rect {
  constructor() {
    super(20, 100);
    this.vel = new Vec();
    this.score = 0;

    this._lastPos = new Vec();
  }
  // Méthode update pour mettre à jour la position du joueur en fonction de la différence de temps (dt)
  update(dt) {
    this.vel.y = (this.pos.y - this._lastPos.y) / dt;
    this._lastPos.y = this.pos.y;
  }
}
// Classe Pong pour représenter le jeu de Pong
class Pong {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");

    this.initialSpeed = 250;

    this.ball = new Ball();

    this.players = [new Player(), new Player()];

    this.players[0].pos.x = 40;
    this.players[1].pos.x = this._canvas.width - 40;
    this.players.forEach((p) => (p.pos.y = this._canvas.height / 2));

    let lastTime = null;
    // Callback de l'animation pour mettre à jour le jeu
    this._frameCallback = (millis) => {
      if (lastTime !== null) {
        const diff = millis - lastTime;
        this.update(diff / 1000);
      }
      lastTime = millis;
      requestAnimationFrame(this._frameCallback);
    };

    this.CHAR_PIXEL = 10;
    this.CHARS = [
      "111101101101111",
      "010010010010010",
      "111001111100111",
      "111001111001111",
      "101101111001001",
      "111100111001111",
      "111100111101111",
      "111001001001001",
      "111101111101111",
      "111101111001111",
    ].map((str) => {
      const canvas = document.createElement("canvas");
      const s = this.CHAR_PIXEL;
      canvas.height = s * 5;
      canvas.width = s * 3;
      const context = canvas.getContext("2d");
      context.fillStyle = "#fff";
      // Convertit la chaîne de caractères en un motif dessiné sur le canvas
      str.split("").forEach((fill, i) => {
        if (fill === "1") {
          context.fillRect((i % 3) * s, ((i / 3) | 0) * s, s, s);
        }
      });
      return canvas;
    });

    this.reset();
  }
  // Efface le contenu du canvas en le remplissant de noir
  clear() {
    this._context.fillStyle = "#000";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
  // Vérifie si le joueur entre en collision avec la balle et ajuste la trajectoire de la balle en conséquence
  collide(player, ball) {
    if (
      player.left < ball.right &&
      player.right > ball.left &&
      player.top < ball.bottom &&
      player.bottom > ball.top
    ) {
      ball.vel.x = -ball.vel.x * 2.05;
      const len = ball.vel.len;
      ball.vel.y += player.vel.y * 0.2;
      ball.vel.len = len;
    }
  }
  // Dessine les éléments du jeu (balle, joueurs, score)
  draw() {
    this.clear();

    this.drawRect(this.ball);
    this.players.forEach((player) => this.drawRect(player));

    this.drawScore();
  }
  // Dessine un rectangle sur le canvas avec la couleur blanche
  drawRect(rect) {
    this._context.fillStyle = "#fff";
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
  }
  // Dessine le score des joueurs sur le canvas
  drawScore() {
    const align = this._canvas.width / 3;
    const cw = this.CHAR_PIXEL * 4;
    this.players.forEach((player, index) => {
      const chars = player.score.toString().split("");
      const offset =
        align * (index + 1) - (cw * chars.length) / 2 + this.CHAR_PIXEL / 2;
      chars.forEach((char, pos) => {
        this._context.drawImage(this.CHARS[char | 0], offset + pos * cw, 20);
      });
    });
  }
  // Démarre le jeu en lançant l'animation
  play() {
    const b = this.ball;
    if (b.vel.x === 0 && b.vel.y === 0) {
      b.vel.x = 200 * (Math.random() > 0.5 ? 1 : -1);
      b.vel.y = 200 * (Math.random() * 2 - 1);
      b.vel.len = this.initialSpeed;
    }
  }
  // Réinitialise le jeu en remettant la balle au centre
  reset() {
    const b = this.ball;
    b.vel.x = 0;
    b.vel.y = 0;
    b.pos.x = this._canvas.width / 2;
    b.pos.y = this._canvas.height / 2;
  }
  // Démarre l'animation du jeu
  start() {
    requestAnimationFrame(this._frameCallback);
  }
  // Met à jour les éléments du jeu en fonction du temps écoulé (dt)
  update(dt) {
    const cvs = this._canvas;
    const ball = this.ball;
    ball.pos.x += ball.vel.x * dt;
    ball.pos.y += ball.vel.y * dt;
    if (ball.right < 0 || ball.left > cvs.width) {
      // Incrémente le score du joueur correspondant à la direction de la balle
      ++this.players[(ball.vel.x < 0) | 0].score;
      this.reset();
    }

    if (
      (ball.vel.y < 0 && ball.top < 0) ||
      (ball.vel.y > 0 && ball.bottom > cvs.height)
    ) {
      // Inverse la direction de la balle si elle atteint le haut ou le bas du canvas
      ball.vel.y = -ball.vel.y;
    }
    // La position en y du deuxième joueur suit la position en y de la balle
    this.players[1].pos.y = ball.pos.y;

    this.players.forEach((player) => {
      player.update(dt);
      this.collide(player, ball);
    });

    this.draw();
  }
}
// Sélectionne le canvas et crée une instance de la classe Pong
const canvas = document.querySelector("#pong");
const pong = new Pong(canvas);
// Écoute l'événement "click" sur le canvas pour démarrer le jeu
canvas.addEventListener("click", () => pong.play());
// Écoute l'événement "mousemove" sur le canvas pour déplacer le premier joueur
canvas.addEventListener("mousemove", (event) => {
  const scale = event.offsetY / event.target.getBoundingClientRect().height;
  pong.players[0].pos.y = canvas.height * scale;
});


// Démarre le jeu
pong.start();
