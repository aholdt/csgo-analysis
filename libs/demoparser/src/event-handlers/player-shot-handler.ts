import { Injectable } from "@nestjs/common";
import { DemoFile, IEventWeaponFire } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { PlayerShot } from "../models/player-shot";
import { RoundHandlerBase } from "./round-handler-base";

@Injectable()
export class PlayerShotHandler extends RoundHandlerBase<PlayerShot[]> {
  constructor() {
    super(new Array<PlayerShot>());
  }
  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("weapon_fire", (e) => this.onWeaponFire(e));
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.playerShots = this.roundResults;
  }

  onWeaponFire(e: IEventWeaponFire): void {
    const player = this.demoFile.players.find((x) => x.userId === e.userid);
    const playerShot = this.getPlayerPosition(player) as PlayerShot;
    const weaponWithoutPrefix = e.weapon.replace("weapon_", "");
    playerShot.firingWeapon = weaponWithoutPrefix;
    if (!this.isUtility(weaponWithoutPrefix) && weaponWithoutPrefix.indexOf("knife") == -1) {
      this.currentRound.push(playerShot);
    }
  }
}
