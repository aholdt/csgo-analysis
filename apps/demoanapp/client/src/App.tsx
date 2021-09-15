import { MsalProvider } from "@azure/msal-react";
import React from "react";
import "./App.css";
import dust2 from "./de_dust2_textured.png";
import { RoundreplaysApi, RoundreplaysGameIdRoundNumberGetArgs } from "./generated-api";

function App({ pca }: any) {
  return (
    <MsalProvider instance={pca}>
      <div className="App">
        <img src={dust2} alt="D2" width="1024" height="1024"></img>
        <canvas width="1024" height="1024"></canvas>
      </div>
    </MsalProvider>
  );
}

const getRound = async () => {
  const roundReplaysClient = new RoundreplaysApi(undefined);
  const args = new RoundreplaysGameIdRoundNumberGetArgs({ gameId: "HL2DEMO", roundNumber: 1 });
  const round = await roundReplaysClient.roundreplaysGameIdRoundNumberGet(args);
  console.log(round);
};
getRound();

export default App;
