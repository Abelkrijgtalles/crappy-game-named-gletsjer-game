/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rodeauto extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("uiterlijk1", "./Rodeauto/costumes/uiterlijk1.png", {
        x: 138,
        y: 144
      })
    ];

    this.sounds = [
      new Sound("plop", "./Rodeauto/sounds/plop.wav"),
      new Sound("rattle", "./Rodeauto/sounds/rattle.wav")
    ];

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
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stuiteren" },
        this.whenIReceiveStuiteren
      )
    ];

    this.vars.slippen2 = 0;
  }

  *whenIReceiveInstalleer() {
    this.size = 30;
    this.visible = true;
    /* TODO: Implement looks_gotofrontback */ null;
    this.goto(-40, 0);
    this.direction = 0;
    this.vars.slippen2 = 0;
  }

  *autobesturing() {
    this.direction = 0;
    if (this.keyPressed("d")) {
      this.direction = 30;
      this.x += this.stage.vars.autosnelheid;
    }
    if (this.keyPressed("a")) {
      this.direction = -30;
      this.x += 0 - this.stage.vars.autosnelheid;
    }
    if (this.keyPressed("w")) {
      this.y += this.stage.vars.autosnelheid;
    }
    if (this.keyPressed("s")) {
      this.y += this.stage.vars.wegsnelheid;
    }
  }

  *checkBotsingen() {
    if (
      this.touching(this.sprites["Weg1"].andClones()) ||
      this.touching(this.sprites["Weg2"].andClones()) ||
      this.touching(this.sprites["Sneeuwbal"].andClones())
    ) {
      this.vars.slippen2 = 30;
    }
    if (this.touching(this.sprites["Blauweauto"].andClones())) {
      this.broadcast("stuiteren");
    }
  }

  *slippen() {
    yield* this.startSound("rattle");
    this.direction -= 30;
    this.vars.slippen2 += -1;
    this.y += this.stage.vars.wegsnelheid;
    if (this.vars.slippen2 == 0) {
      this.goto(-40, -180);
      this.direction = 0;
    }
  }

  *whenIReceiveBeweeg() {
    if (this.vars.slippen2 == 0) {
      yield* this.autobesturing();
      yield* this.checkBotsingen();
    } else {
      yield* this.slippen();
    }
  }

  *whenIReceiveStuiteren() {
    this.direction = this.radToScratch(
      Math.atan2(
        this.sprites["Blauweauto"].y - this.y,
        this.sprites["Blauweauto"].x - this.x
      )
    );
    this.direction += 180;
    this.move(20);
    this.direction = 0;
  }
}
