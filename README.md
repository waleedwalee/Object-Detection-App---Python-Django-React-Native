# CheckMe App

CheckMe is a mobile application built using React Native (frontend) and Python Django (backend). The app uses the YOLOv8 model for real-time object detection, allowing users to capture, upload, and detect objects easily.


# Project Structure
CheckMe/
│
├── Backend/           # Python Django project (API)
│   └── ... 
├── Frontend/          # React Native project
│   └── ...
└── README.md          # Project documentation


**Requirements
System Requirements**
Node.js (v14 or later) with npm,
Python (v3.8 or later),
React Native CLI or Expo CLI,
Virtual Environment (venv) for Python,
Android/iOS emulator or real device for React Native


# Clone the Repository

git clone https://github.com/waleedwalee/Object-Detection-App---Python-Django-React-Native.git
cd CheckMe/Backend


# Create a Virtual Environment

On Windows
python -m venv venv

On macOS/Linux
python3 -m venv venv


# Activate the Virtual Environment

On Windows
venv\Scripts\activate

On macOS/Linux
source venv/bin/activate


# Install Dependencies

pip install django,
pip install djangorestframework,
pip install ultralytics,
pip install django-cors-headers


# Frontend Setup (React Native)

Navigate to the Frontend Folder

cd ../Frontend
Install Node.js Dependencies If you're using npm:
npm install

Or, if you're using yarn:
yarn install


**Install React Native CLI (if not installed) For a bare React Native setup, install the React Native CLI globally:**

npm install -g react-native-cli
If you're using Expo, install Expo CLI globally:
npm install -g expo-cli

Configure API Endpoint in Frontend Open the app.js file (or relevant configuration file) in the Frontend directory and update the backend API URL to point to your local Django server:

# App.js:

const API_URL = 'http://your-backend-ip-address:8000/';


# Running the Project

# Running Backend
Navigate to the backend directory:
cd Backend

**Activate the virtual environment:**
On Windows
venv\Scripts\activate

On macOS/Linux
source venv/bin/activate

Run the Django development server:
python manage.py runserver


# Running Frontend
Navigate to the frontend directory:
cd Frontend

Start the React Native app using:

For React Native CLI:
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS

For Expo:
expo start

Important: Ensure your mobile device or emulator is connected to the same network as your backend.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

