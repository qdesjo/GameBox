const chatbot_button = document.getElementById('chatbot');

chatbot_button.addEventListener("click", function() {
    // ce qu'il faut mettre
});

document.getElementById("menu-button").addEventListener("click", function() {
    var menuItems = document.getElementById("menu-items");
    if (menuItems.style.display === "none") {
      menuItems.style.display = "block";
    } else {
      menuItems.style.display = "none";
    }
  });