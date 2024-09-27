from flask import Flask, request, jsonify, send_from_directory
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__, static_folder='frontend/dist')

# Load the trained model
model = joblib.load('bank_marketing_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Ensure all required fields are present
    required_fields = ['age', 'job', 'marital', 'education', 'default', 'balance', 'housing', 'loan',
                       'contact', 'day', 'month', 'duration', 'campaign', 'pdays', 'previous', 'poutcome']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Convert data to correct types
    numeric_fields = ['age', 'balance', 'day', 'duration', 'campaign', 'pdays', 'previous']
    for field in numeric_fields:
        try:
            data[field] = float(data[field])
        except ValueError:
            return jsonify({'error': f'Invalid value for {field}. Expected a number.'}), 400
    
    # Create DataFrame
    df = pd.DataFrame([data])
    
    # Ensure column order matches the model's expectation
    expected_columns = model.feature_names_in_
    df = df.reindex(columns=expected_columns)
    
    # Make prediction
    prediction = model.predict(df)
    probability = model.predict_proba(df)[0][1]
    
    return jsonify({
        'prediction': 'yes' if prediction[0] == 'yes' else 'no',
        'probability': float(probability)
    })

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)