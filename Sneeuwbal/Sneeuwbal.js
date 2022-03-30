/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sneeuwbal extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("uiterlijk1", "./Sneeuwbal/costumes/uiterlijk1.png", {
        x: 53,
        y: 51
      })
    ];

    this.sounds = [new Sound("plop", "./Sneeuwbal/sounds/plop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Installeer" },
        this.whenIReceiveInstalleer
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Beweeg" },
        this.whenIReceiveBeweeg
      )
    ];
  }

  *whenIReceiveInstalleer() {
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = false;
  }

  *startAsClone() {
    this.goto(this.random(-200, 200), 180);
    this.visible = true;
  }

  *whenIReceiveBeweeg() {
    this.y += this.stage.vars.wegsnelheid;
    if (this.y < -175) {
      this.deleteThisClone();
    }
  }
}
