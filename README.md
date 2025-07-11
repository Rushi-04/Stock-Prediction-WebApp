# Stock Prediction Project

This is a full-stack stock prediction application with a React frontend, a Django backend, and a machine learning model for making predictions.

## Features

*   User registration and authentication with JWT
*   Stock prediction using a trained Keras model
*   Display of stock data and predictions

## Tech Stack

**Frontend:**

*   React
*   Vite
*   Tailwind CSS
*   Axios
*   React Router

**Backend:**

*   Django
*   Django REST Framework
*   TensorFlow
*   Keras
*   Scikit-learn
*   Pandas
*   Yfinance

## Getting Started

### Prerequisites

*   Node.js and npm
*   Python 3.10 or later
*   Pip

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Rushi-04/Stock-Prediction-WebApp.git
    cd stock-prediction-project
    ```

2.  **Set up the backend:**

    ```bash
    cd backend-drf
    python -m venv env
    env\Scripts\activate  # On Mac, use `source env/bin/activate`
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```

3.  **Set up the frontend:**

    ```bash
    cd ../frontend-react
    npm install
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

## API Endpoints

The following API endpoints are available:

*   `POST /api/v1/register/`: Register a new user.
*   `POST /api/v1/token/`: Obtain a JWT token.
*   `POST /api/v1/token/refresh/`: Refresh a JWT token.
*   `GET /api/v1/protected-view/`: An example of a protected view.
*   `POST /api/v1/predict/`: Get a stock prediction.

**Prediction API (`/api/v1/predict/`)**

This endpoint accepts a POST request with a JSON body containing the stock ticker symbol:

```json
{
  "ticker": "AAPL"
}
```

It returns a JSON response with the prediction.
  
## Model Training 

The stock prediction model was trained using the Jupyter notebook located in `Resources/Stock-Prediction-Model.ipynb`. The notebook contains the code for data collection, data exploration, feature engineering, and model training.

## Deployment

The backend is configured for deployment using Gunicorn and WhiteNoise. The `Procfile` and `nixpacks.toml` files are included for easy deployment to Railway.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
