import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CustomerContextProvider } from "./context/CustomerContext";
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CustomerContextProvider>
        <Auth0Provider
          domain="dev-0tvx0gu40rttcmea.us.auth0.com"
          clientId="UPLZLZL8A3g6VYCjGtkL7z6mfZvXbA3P"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
        ,
      </CustomerContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
