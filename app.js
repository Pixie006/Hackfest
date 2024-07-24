// Function to toggle chat window visibility
function toggleChat() {
    const chatWindow = document.getElementById("chatWindow");
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
      chatWindow.style.display = "block";
    } else {
      chatWindow.style.display = "none";
    }
  }
  
  // Function to send message
  async function sendMessage() {
    const chatbox = document.getElementById("chatbox");
    const input = document.getElementById("chatInput");
    const userMessage = input.value;
    input.value = "";
  
    const userMessageDiv = document.createElement("div");
    userMessageDiv.textContent = "You: " + userMessage;
    chatbox.appendChild(userMessageDiv);
  
    const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sender: "user", message: userMessage })
    });
    const data = await response.json();
  
    data.forEach(message => {
      const botMessageDiv = document.createElement("div");
      botMessageDiv.textContent = "Bot: " + message.text;
      chatbox.appendChild(botMessageDiv);
    });
  
    chatbox.scrollTop = chatbox.scrollHeight;
  
    // Play voice response
    const audio = new Audio("http://localhost:5005/voice_response.mp3");
    audio.play();
  }
  
  // Function to start listening to voice input
  function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';
  
    recognition.start();
  
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      const input = document.getElementById("chatInput");
      input.value = transcript;
      sendMessage();
    };
  
    recognition.onspeechend = function() {
      recognition.stop();
    };
  
    recognition.onerror = function(event) {
      console.error("Speech recognition error detected: " + event.error);
    };
  }
  
