/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Weg2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("uiterlijk1", "./Weg2/costumes/uiterlijk1.png", {
        x: 480,
        y: 360
      }),
      new Costume("tree2", "./Weg2/costumes/tree2.svg", { x: 36, y: 43 })
    ];

    this.sounds = [new Sound("plop", "./Weg2/sounds/plop.wav")];

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
    this.goto(0, 360);
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *whenIReceiveBeweeg() {
    if (this.stage.vars.wegY < 0) {
      this.goto(0, this.stage.vars.wegY + 360);
    } else {
      this.goto(0, this.stage.vars.wegY - 360);
    }
  }
}
