/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GameLoop extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("uiterlijk1", "./GameLoop/costumes/uiterlijk1.png", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [
      new Sound("plop", "./GameLoop/sounds/plop.wav"),
      new Sound("pop", "./GameLoop/sounds/pop.wav"),
      new Sound("dance around", "./GameLoop/sounds/dance around.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Installeer" },
        this.whenIReceiveInstalleer
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bereken" },
        this.whenIReceiveBereken
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Beweeg" },
        this.whenIReceiveBeweeg
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bereken" },
        this.whenIReceiveBereken2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    yield* this.broadcastAndWait("Installeer");
    while (!(this.stage.vars.afteller < 1)) {
      yield* this.broadcastAndWait("Bereken");
      yield* this.broadcastAndWait("Beweeg");
      yield;
    }
    this.broadcast("GameOver");
  }

  *whenIReceiveInstalleer() {
    this.stage.vars.wegY = 0;
    this.stage.vars.autosnelheid = 5;
    this.stage.vars.afteller = 20;
    this.restartTimer();
  }

  *whenIReceiveBereken() {
    this.stage.vars.wegsnelheid = -5;
    this.stage.vars.wegY += this.stage.vars.wegsnelheid;
    if (this.stage.vars.wegY < -360) {
      this.stage.vars.wegY += 720;
    }
  }

  *whenIReceiveBeweeg() {
    if (this.random(1, 200) == 1) {
      this.sprites["Sneeuwbal"].createClone();
    }
    if (this.random(1, 20) == 1) {
      this.sprites["Sprite1"].createClone();
    }
  }

  *whenIReceiveBereken2() {
    if (this.timer > 1) {
      this.stage.vars.blauweautoedelstenen += -1;
      this.restartTimer();
      if (this.stage.vars.afteller < 10) {
        yield* this.startSound("pop");
      }
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      yield* this.playSoundUntilDone("dance around");
      yield;
    }
  }
}
