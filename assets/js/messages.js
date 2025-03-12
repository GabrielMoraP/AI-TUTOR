// Asynchronous function to send a message
async function sendMessage() {
  // Get the input value and remove leading/trailing whitespace
  let input = document.getElementById("userInput").value.trim();
  let chatbox = document.getElementById("chatbox");

  // If the input is empty, stop execution
  if (input === "") return;

  // Add the user's message to the chatbox
  chatbox.innerHTML += `
      <div class="flex justify-end mt-2">
          <div class="bg-purple-600 text-white p-3 rounded-lg max-w-[70%]">
              <p>${input}</p>
          </div>
      </div>
  `;

  // Clear the input field and scroll to the bottom of the chatbox
  document.getElementById("userInput").value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    // Call the predict function and wait for the result
    const predictionResult = await predict(input);
    console.log("Prediction result:", predictionResult);

    // Generate HTML for each step in the conversion process
    let stepsHtml = predictionResult.steps.map(step => `
      <p class="font-bold text-left mt-6">${step.Explicación}</p>
      <p class="text-left mb-6">${step.Operación}</p>
    `).join("");

    // Display the bot's response in the chatbox
    chatbox.innerHTML += `
          <div class="flex mt-2">
              <div class="bg-gray-900 text-white w-full">
                <p class="text-2xl font-bold text-left my-6">✅ Conversión ${predictionResult.conversion_type}</p>
                <hr>
                <p class="text-xl font-bold text-left my-6">1️⃣ Numero introducido</p>
                <p class="text-left mb-6">El numero introducido es: ${predictionResult.input_number}</p>
                <hr>
                <p class="text-xl font-bold text-left my-6">2️⃣ Pasos</p>
                ${stepsHtml}
                <hr>
                <p class="text-2xl font-bold text-left my-6">3️⃣ Resultado</p>
                <p class="text-xl font-bold text-left mb-6">El resultado es: ${predictionResult.result}</p>
              </div>
          </div>
      `;

  } catch (error) {
    // Handle errors (e.g., invalid input)
    console.error("Error con la predicción:", error);
    chatbox.innerHTML += `
          <div class="flex mt-2">
              <div class="bg-gray-900 text-white rounded-lg max-w-[70%]">
                  <p class="text-md text-left">🟡 Porfavor introduce una conversión valida</p>
              </div>
          </div>
      `;
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}