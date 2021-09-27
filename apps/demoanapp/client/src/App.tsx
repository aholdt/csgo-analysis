import React, { useEffect } from "react";
import "./App.css";
import dust2 from "./de_dust2_textured.png";
import { RoundreplaysApi } from "./generated-api";

function App() {
  useEffect(() => {
    const getRound = async () => {
      console.log("getR");
      const roundReplaysClient = new RoundreplaysApi(undefined, "http://localhost:3000");
      const round = await roundReplaysClient.roundReplaysControllerGetRoundReplay("HL2DEMO", 1);
      console.log(round);
    };
    getRound();
  });
  return (
    <div className="App">
      <img src={dust2} alt="D2" width="1024" height="1024"></img>
      <canvas width="1024" height="1024"></canvas>
    </div>
  );
}

export default App;
