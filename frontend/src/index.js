import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomerContextProvider } from './context/CustomerContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CustomerContextProvider>
        <App />
      </CustomerContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);