import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "../auth-config";

class MsalService {
  public msalInstance: PublicClientApplication;

  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
    if (!this.msalInstance.getActiveAccount() && this.msalInstance.getAllAccounts().length > 0) {
      this.setActiveAccount();
    }
  }

  async getAccessToken(): Promise<string | undefined> {
    try {
      const silentRequest = await this.msalInstance.acquireTokenSilent(loginRequest);
      return silentRequest.accessToken;
    } catch (error) {
      const authResult = await this.msalInstance.acquireTokenPopup(loginRequest);
      this.setActiveAccount();
      return authResult.accessToken;
    }
  }
  setActiveAccount() {
    this.msalInstance.setActiveAccount(this.msalInstance.getAllAccounts()[0]);
  }
}

export default new MsalService();
