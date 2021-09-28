import axios from "axios";
import MsalService from "./msal.service";

class AxiosService {
  async setupAccessToken() {
    const accessToken = await MsalService.getAccessToken();
    console.log(accessToken);
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    axios.interceptors.request.use(
      async (config) => {
        const accessToken = await MsalService.getAccessToken();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}

export default new AxiosService();
