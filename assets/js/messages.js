// Function to handle sending a message
function sendMessage() {
  // Get the value from the user input field and trim any extra spaces
  let input = document.getElementById("userInput").value.trim();

  // Get the chatbox element where messages will be displayed
  let chatbox = document.getElementById("chatbox");

  // If the input is empty, exit the function (do nothing)
  if (input === "") return;

  // Create a new div element for the user's message
  let message = document.createElement("div");

  // Assign a class to the new message div, which helps with styling and alignment
  message.className = "flex justify-end mt-2 mx-4";

  // Set the inner HTML of the message element, wrapping the user's input in a styled container
  message.innerHTML = `
      <div class="bg-purple-600 text-white p-3 rounded-lg max-w-[70%]">
          <p>${input}</p>
      </div>
  `;

  // Append the new message to the chatbox so it appears on the screen
  chatbox.appendChild(message);

  // Clear the input field after the message is sent
  document.getElementById("userInput").value = "";

  // Automatically scroll the chatbox to the bottom to show the latest message
  chatbox.scrollTop = chatbox.scrollHeight;

  // Llamar a la función predict con el texto ingresado por el usuario
  predict(input);
}