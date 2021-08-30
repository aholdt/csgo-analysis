import React from "react";
import "./App.css";
import dust2 from "./de_dust2_textured.png";
import { RoundreplaysApi, RoundreplaysGameIdRoundNumberGetArgs } from "./generated-api";

function App() {
  return (
    <div className="App">
      <img src={dust2} alt="D2" width="1024" height="1024"></img>
      <canvas width="1024" height="1024"></canvas>
    </div>
  );
}

const getRound = async () => {
  const catsApi = new RoundreplaysApi(undefined);
  const args = new RoundreplaysGameIdRoundNumberGetArgs({ gameId: "HL2DEMO", roundNumber: 1 });
  const round = await catsApi.roundreplaysGameIdRoundNumberGet(args);
  console.log(round);
};
getRound();

export default App;
