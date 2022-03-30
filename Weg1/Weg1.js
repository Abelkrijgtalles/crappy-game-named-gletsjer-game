/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Weg1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("uiterlijk1", "./Weg1/costumes/uiterlijk1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("plop", "./Weg1/sounds/plop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Installeer" },
        this.whenIReceiveInstalleer
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Beweeg" },
        this.whenIReceiveBeweeg
      )
    ];
  }

  *whenIReceiveInstalleer() {
    this.goto(0, 0);
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *whenIReceiveBeweeg() {
    this.goto(0, this.stage.vars.wegY);
  }
}
