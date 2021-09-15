import {
  AuthenticationResult,
  BrowserAuthError,
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { msalConfig } from "./auth-config";
import { RoundreplaysApi, RoundreplaysGameIdRoundNumberGetArgs } from "./generated-api";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

export const msalInstance = new PublicClientApplication(msalConfig);
// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}
var request = {
  scopes: ["User.Read"],
};
console.log("ey");
msalInstance
  .acquireTokenSilent(request)
  .then((tokenResponse) => {
    const roundReplaysClient = new RoundreplaysApi({
      headers: { authorization: "Bearer " + tokenResponse.accessToken },
    });
    const args = new RoundreplaysGameIdRoundNumberGetArgs({ gameId: "HL2DEMO", roundNumber: 1 });
    roundReplaysClient.roundreplaysGameIdRoundNumberGet(args);
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
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App pca={msalInstance} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
