import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';           // Global styles
import App from './App';        // Main App component
import reportWebVitals from './reportWebVitals'; // Optional performance measuring

// Create the root of the React app and render the App component inside StrictMode
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Monitor performance metrics (like load time, rendering delays, etc.)
reportWebVitals();
