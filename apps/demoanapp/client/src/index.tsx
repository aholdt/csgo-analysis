import {
  AuthenticationResult,
  BrowserAuthError,
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import { AuthenticatedTemplate, MsalProvider } from "@azure/msal-react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { msalConfig } from "./auth-config";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

export const msalInstance = new PublicClientApplication(msalConfig);
// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}
var request = {
  scopes: ["api://7d74172c-4113-400f-8ea2-dbecc67a52e9/demoan"],
};
msalInstance
  .acquireTokenSilent(request)
  .then((tokenResponse) => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = "Bearer " + tokenResponse.accessToken;
    axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    renderApp();
  })
  .catch(async (error) => {
    if (error instanceof InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      return await msalInstance.acquireTokenPopup(request);
    }
    if (error instanceof BrowserAuthError) {
      return await msalInstance.loginRedirect(request);
    }
  });

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const payload = event?.payload as AuthenticationResult;
    console.log(payload);
    if (payload.account) {
      msalInstance.setActiveAccount(payload.account);
    }
    renderApp();
  }
});
function renderApp() {
  ReactDOM.render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <AuthenticatedTemplate>
          <App />
        </AuthenticatedTemplate>
      </MsalProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
