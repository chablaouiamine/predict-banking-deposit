# Bank Term Deposit Prediction Application

This application predicts whether a client will subscribe to a term deposit based on client data and campaign information. It uses a Flask backend with a machine learning model and a React frontend for user interaction.

## Features

- Predicts term deposit subscription likelihood
- User-friendly web interface for data input
- Real-time predictions using a trained machine learning model

## Technologies Used

- Backend: Flask (Python)
- Frontend: React (JavaScript)
- Machine Learning: scikit-learn
- Data Processing: pandas

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/chablaouiamine/predict-banking-deposit.git
   cd bank-term-deposit-prediction
   ```

2. Set up a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

5. Build the frontend:
   ```
   npm run build
   ```

6. Return to the root directory:
   ```
   cd ..
   ```

## Running the Application

1. Start the Flask backend:
   ```
   python app.py
   ```

2. Open a web browser and navigate to `http://localhost:5000`

## Model Training

The machine learning model (Logistic Regression) is pre-trained on a bank marketing dataset. To retrain the model:

1. Ensure you have the training data (`bank.csv`) in the project root.
2. Run the training script:
   ```
   python model.py
   ```