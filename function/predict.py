from flask import Flask, request, jsonify
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

# Cargar el modelo de Keras
model = tf.keras.models.load_model('model/model.keras')

# Cargar el tokenizer desde el archivo pickle
with open('model/tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Ruta para la predicción
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Recibe los datos del frontend

    # Tokenizar el texto de entrada
    new_input = data['input']  # Recibe la entrada de texto desde el frontend
    new_input_seq = tokenizer.texts_to_sequences([new_input])
    new_input_padded = pad_sequences(new_input_seq, padding='post', maxlen=9)

    # Realizar la predicción
    prediction = model.predict(new_input_padded)
    
    # Determinar la predicción
    result = 'Octal a Decimal' if prediction[0] > 0.5 else 'Decimal a Octal'

    # Enviar la respuesta
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)