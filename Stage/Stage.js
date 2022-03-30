/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 480,
        y: 360
      }),
      new Costume("achtergrond1", "./Stage/costumes/achtergrond1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.afteller = 101;
    this.vars.wegY = -355;
    this.vars.autosnelheid = 5;
    this.vars.wegsnelheid = -5;
    this.vars.rodeautoedelstenen = 36;
    this.vars.blauweautoedelstenen = -103;
    this.vars.rodenaam = 0;
    this.vars.blauwenaam = 0;
    this.vars.roodinfo = 0;
    this.vars.blauwinfo = 1;
  }
}
