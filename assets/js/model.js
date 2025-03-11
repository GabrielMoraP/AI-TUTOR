// Función para hacer la predicción
async function predict(inputText) {
  // URL de tu API desplegada en Railway
  const apiUrl = "https://web-production-d5cd7.up.railway.app/predict";

  // Datos que se enviarán en el cuerpo de la solicitud
  const data = {
    text: inputText,
  };

  try {
    // Hacer la petición POST a la API
    const response = await fetch(apiUrl, {
      method: "POST", // Asegúrate de usar POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const result = await response.json();

    // Mostrar la respuesta de la API en el chatbox
    let chatbox = document.getElementById("chatbox");

    // Crear un nuevo div para la respuesta de la API
    let apiMessage = document.createElement("div");
    apiMessage.className = "flex justify-start mt-2"; // Alinear a la izquierda
    apiMessage.innerHTML = `
            <div class="bg-gray-900 text-white p-3 rounded-lg max-w-[70%]">
                <p>${result.response}</p>
            </div>
        `;

    // Agregar la respuesta de la API al chatbox
    chatbox.appendChild(apiMessage);

    // Automáticamente desplazar el chatbox al final para mostrar el último mensaje
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    console.error("Error:", error);

    // Mostrar un mensaje de error en el chatbox
    let chatbox = document.getElementById("chatbox");
    let errorMessage = document.createElement("div");
    errorMessage.className = "flex justify-start"; // Alinear a la izquierda
    errorMessage.innerHTML = `
            <div class="bg-red-900 text-white p-3 rounded-lg max-w-[70%]">
                <p>Hubo un error al hacer la petición a la API.</p>
            </div>
        `;

    // Agregar el mensaje de error al chatbox
    chatbox.appendChild(errorMessage);

    // Automáticamente desplazar el chatbox al final para mostrar el último mensaje
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}
