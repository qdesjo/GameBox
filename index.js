const chatbot_button = document.getElementById("chatbot");

chatbot_button.addEventListener("click", function () {
  // ce qu'il faut mettre
});

document.getElementById("menu-button").addEventListener("click", function () {
  var menuItems = document.getElementById("menu-items");
  if (menuItems.style.display === "none") {
    menuItems.style.display = "block";
  } else {
    menuItems.style.display = "none";
  }
});

// Sélectionnez le bouton "Accepter les cookies"
const acceptButton = document.getElementById("accept-cookies");

// Sélectionnez l'élément du bandeau de cookies
const cookieBanner = document.getElementById("cookie-banner");

const rejectButton = document.getElementById("reject-cookies");

// Fonction pour cacher le bandeau de cookies
const audio_good = new Audio("/Demarrage-Windows.mp3");
function hideCookieBanner() {
  cookieBanner.style.display = "none";
  audio_good.play();
}

// Ajoutez un écouteur d'événement au bouton "Accepter les cookies"
acceptButton.addEventListener("click", hideCookieBanner);

const audio_error = new Audio("/Error-sound.mp3");
function impossible() {
  audio_error.play();
}
//En cas de refus
rejectButton.addEventListener("click", impossible);
