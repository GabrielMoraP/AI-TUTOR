async function loadModel() {

    await tf.setBackend('cpu');  // Forzar el backend en CPU (o 'webgl' si prefieres usar WebGL)
    await tf.ready();

    // Cargar el modelo
    const model = await tf.loadGraphModel('assets/model/model.json');

    // Función de tokenización
    function tokenizeText(text, wordIndex) {
        text = text.toLowerCase();
        text = text.replace(/[^a-záéíóú0-9\s]/g, '');  // Limpiar texto
        return text.split(' ').map(word => wordIndex[word] || 0);  // Usar 0 si no está en el vocabulario
    }

    // Texto a predecir
    const textToPredict = "¿Cuál es el equivalente decimal de 7 en octal?";

    // Cargar el tokenizer.json
    const response = await fetch('assets/model/tokenizer.json');
    const tokenizerData = await response.json();

    // Tokenizar el texto
    const tokenizedText = tokenizeText(textToPredict, tokenizerData.word_index);

    // Rellenar la secuencia con ceros
    const maxLength = 9;  // Longitud máxima de las secuencias (ajusta según tu modelo)
    const paddedText = tokenizedText.concat(Array(maxLength - tokenizedText.length).fill(0)).slice(0, maxLength);  // Rellenar con ceros y recortar

    // Convertir a un tensor 2D
    const paddedTensor = tf.tensor2d([paddedText], [1, maxLength], 'float32');

    console.log("Tokenized text:", tokenizedText);
    console.log("Padded tensor (JavaScript):", await paddedTensor.array());

    // Realizar la predicción usando executeAsync
    const prediction = await model.executeAsync(paddedTensor);
    const predictionValue = prediction.dataSync()[0];
    console.log("Prediction value:", predictionValue);

    // Liberar memoria
    tf.dispose([paddedTensor, prediction]);
}

// Llamar a la función para cargar el modelo y crear el tensor
loadModel().catch(err => console.error(err));