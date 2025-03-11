// Function to handle sending a message
async function sendMessage() {
  
  // Get the value from the user input field and trim any extra spaces
  let input = document.getElementById("userInput").value.trim();
  
  // Get the chatbox element where messages will be displayed
  let chatbox = document.getElementById("chatbox");

  // If the input is empty, exit the function (do nothing)
  if (input === "") return;

  // Create a new div element for the user's message
  let message = document.createElement("div");
  
  // Assign a class to the new message div, which helps with styling and alignment
  message.className = "flex justify-end mt-3";

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

  // Show a loading message while waiting for the AI response
  let loadingMessage = document.createElement("div");
  loadingMessage.className = "flex justify-center mt-3";
  loadingMessage.innerHTML = `
      <div class="text-white p-3">
        AI is thinking...
      </div>
  `;
  chatbox.appendChild(loadingMessage);
  
  // Scroll to the bottom to show the loading message
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    // Make a POST request to the backend Flask server with the user input
    const response = await fetch('https://your-netlify-url/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: input }),
    });

    // Parse the response data
    const data = await response.json();

    // Remove the loading message
    chatbox.removeChild(loadingMessage);

    // Create a new div element for the AI's response
    let aiMessage = document.createElement("div");
    aiMessage.className = "flex justify-start mt-3";

    // Set the inner HTML for the AI's response
    aiMessage.innerHTML = `
        <div class="bg-gray-700 text-white p-3 rounded-lg max-w-[70%]">
          <p>${data.prediction}</p>
        </div>
    `;

    // Append the AI's response message to the chatbox
    chatbox.appendChild(aiMessage);

    // Scroll to the bottom to show the latest message
    chatbox.scrollTop = chatbox.scrollHeight;

  } catch (error) {
    console.error('Error:', error);
    
    // If there is an error, display a message in the chatbox
    let errorMessage = document.createElement("div");
    errorMessage.className = "flex justify-center mt-3";
    errorMessage.innerHTML = `
        <div class="text-red-500 p-3">
          Oops! Something went wrong. Please try again.
        </div>
    `;
    chatbox.appendChild(errorMessage);

    // Scroll to the bottom to show the error message
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}