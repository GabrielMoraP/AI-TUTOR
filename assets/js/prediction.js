// Asynchronous function to predict the result based on user input
async function predict(inputText) {
    // API endpoint for making the prediction request
    const apiUrl = "https://web-production-d5cd7.up.railway.app/predict";

    // Data object containing the text input from the user
    const data = {
        text: inputText,
    };

    try {
        // Sending a POST request to the API with the input text
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convert the data object to JSON format
        });

        // Parsing the JSON response from the server
        const result = await response.json();
        return result; // Return the result to be used by sendMessage()
    } catch (error) {
        console.error("Error:", error);
        throw error; // Throw the error so that sendMessage() can handle it
    }
}  