// Function to send the message when "Enter" is pressed
document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevents the default behavior of the "Enter" key (e.g., form submission)
        sendMessage();  // Calls the sendMessage function
    }
});

// Function to clear the chat and show a confirmation modal
function clearChat() {
    // Displays the confirmation modal by removing the "hidden" class
    document.getElementById("confirmationModal").classList.remove("hidden");

    // When the "Confirm" button is clicked
    document.getElementById("confirmButton").onclick = function () {
        // Clears the chatbox and inserts a welcome message in Spanish with conversion examples
        document.getElementById("chatbox").innerHTML = `
            <div class="bg-gray-900 text-white w-full">
                <p class="text-2xl font-bold text-left my-6">
                🟪 Bienvenido al asistente virtual de conversiones impulsado por IA.
                </p>
                <p class="text-xl font-bold text-left my-6">
                - ¿Con qué conversiones puedo ayudarte hoy?
                </p>
                <p class="text-left mb-6 text-gray-700">
                Ejemplos:
                <br>
                - "Convertir 221 octal a decimal"
                <br>
                - "Convertir 77 octal a decimal"
                <br>
                - "Convertir 10 octal a decimal"
                <br>
                - "Convertir 377 octal a decimal"
                <br>
                - "Transformar 50 decimal a octal"
                <br>
                - "Cambiar 123 decimal a octal"
                </p>
            </div>
        `;
        // Hides the confirmation modal after clearing the chat
        document.getElementById("confirmationModal").classList.add("hidden");
    };

    // When the "Cancel" button is clicked, simply hide the confirmation modal
    document.getElementById("cancelButton").onclick = function () {
        document.getElementById("confirmationModal").classList.add("hidden");
    };
}