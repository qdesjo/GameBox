// Sélectionner les éléments du DOM
const chatContainer = document.querySelector('#chat-container');
const chatLog = document.querySelector('#chat-log');
const userInput = document.querySelector('#user-input');
const sendButton = document.querySelector('#send-button');

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Fonction pour ajouter un message au chat log
function addMessageToChatLog(message, isUser = false) {
  const messageClass = isUser ? 'user-message' : 'bot-message';
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', messageClass);
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
}

// Fonction pour envoyer une requête à l'API OpenAI
function sendRequestToOpenAI(message) {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      'prompt': message,
      'max_tokens': 50 // Nombre de tokens maximum dans la réponse
    })
  })
    .then(response => response.json())
    .then(data => {
      const botResponse = data.choices[0].text.trim();
      addMessageToChatLog(botResponse);
    })
    .catch(error => {
      console.error('Erreur lors de la requête à l\'API OpenAI:', error);
    });
}

// Gérer l'événement de clic sur le bouton d'envoi
sendButton.addEventListener('click', () => {
  const userMessage = userInput.value;
  if (userMessage.trim() !== '') {
    addMessageToChatLog(userMessage, true);
    userInput.value = '';

    // Envoyer la requête à l'API OpenAI et obtenir une réponse
    sendRequestToOpenAI(userMessage);
  }
});
