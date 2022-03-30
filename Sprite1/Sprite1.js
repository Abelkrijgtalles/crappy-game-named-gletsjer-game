/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("uiterlijk1", "./Sprite1/costumes/uiterlijk1.png", {
        x: 144,
        y: 64
      })
    ];

    this.sounds = [
      new Sound("plop", "./Sprite1/sounds/plop.wav"),
      new Sound("fairydust", "./Sprite1/sounds/fairydust.wav")
    ];

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
    this.stage.vars.rodeautoedelstenen = 0;
    this.stage.vars.blauweautoedelstenen = 0;
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = false;
  }

  *startAsClone() {
    this.goto(this.random(-200, 200), 180);
    this.effects.color = this.random(-100, 100);
    this.visible = true;
  }

  *whenIReceiveBeweeg() {
    this.y += this.stage.vars.wegsnelheid;
    if (this.touching(this.sprites["Rodeauto"].andClones())) {
      yield* this.startSound("fairydust");
      this.stage.vars.rodeautoedelstenen += 1;
      this.stage.vars.afteller += 1;
      this.deleteThisClone();
    }
    if (this.touching(this.sprites["Blauweauto"].andClones())) {
      yield* this.startSound("fairydust");
      this.stage.vars.blauweautoedelstenen += 1;
      this.stage.vars.afteller += 1;
      this.deleteThisClone();
    }
    if (this.y < -175) {
      this.deleteThisClone();
    }
  }
}
