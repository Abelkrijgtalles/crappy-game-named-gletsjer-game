/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Blauweauto extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("uiterlijk1", "./Blauweauto/costumes/uiterlijk1.png", {
        x: 138,
        y: 144
      })
    ];

    this.sounds = [
      new Sound("plop", "./Blauweauto/sounds/plop.wav"),
      new Sound("rattle", "./Blauweauto/sounds/rattle.wav")
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

    this.vars.slippen = 29;
  }

  *whenIReceiveInstalleer() {
    this.size = 30;
    this.visible = true;
    /* TODO: Implement looks_gotofrontback */ null;
    this.goto(40, 0);
    this.direction = 0;
    this.vars.slippen = 0;
  }

  *autobesturing() {
    this.direction = 0;
    if (this.keyPressed("right arrow")) {
      this.direction = 30;
      this.x += this.stage.vars.autosnelheid;
    }
    if (this.keyPressed("left arrow")) {
      this.direction = -30;
      this.x += 0 - this.stage.vars.autosnelheid;
    }
    if (this.keyPressed("up arrow")) {
      this.y += this.stage.vars.autosnelheid;
    }
    if (this.keyPressed("down arrow")) {
      this.y += this.stage.vars.wegsnelheid;
    }
  }

  *checkBotsingen() {
    if (
      this.touching(this.sprites["Weg1"].andClones()) ||
      this.touching(this.sprites["Weg2"].andClones()) ||
      this.touching(this.sprites["Sneeuwbal"].andClones())
    ) {
      this.vars.slippen = 30;
    }
    if (this.touching(this.sprites["Rodeauto"].andClones())) {
      this.broadcast("stuiteren");
    }
  }

  *slippen() {
    yield* this.startSound("rattle");
    this.direction -= 30;
    this.vars.slippen += -1;
    this.y += this.stage.vars.wegsnelheid;
    if (this.vars.slippen == 0) {
      this.goto(40, -180);
      this.direction = 0;
    }
  }

  *whenIReceiveBeweeg() {
    if (this.vars.slippen == 0) {
      yield* this.autobesturing();
      yield* this.checkBotsingen();
    } else {
      yield* this.slippen();
    }
  }

  *whenIReceiveStuiteren() {
    this.direction = this.radToScratch(
      Math.atan2(
        this.sprites["Rodeauto"].y - this.y,
        this.sprites["Rodeauto"].x - this.x
      )
    );
    this.direction += 180;
    this.move(20);
    this.direction = 0;
  }
}
