/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Penguin2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("penguin2", "./Penguin2/costumes/penguin2.svg", {
        x: 49,
        y: 79
      })
    ];

    this.sounds = [
      new Sound("pop", "./Penguin2/sounds/pop.wav"),
      new Sound("gong", "./Penguin2/sounds/gong.wav")
    ];

    this.triggers = [
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
        { name: "GameOver" },
        this.whenIReceiveGameover
      )
    ];
  }

  *whenIReceiveInstalleer() {
    /* TODO: Implement data_hidevariable */ null;
    /* TODO: Implement data_hidevariable */ null;
    this.goto(-180, -30);
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = true;
    yield* this.askAndWait(
      "Rode bestuurder, je besturing zijn de toetsen W, A, S en D. Wat is  je naam?"
    );
    this.stage.vars.rodenaam = 0;
    yield* this.askAndWait(
      "Blauwe bestuurder, je besturing zijn de pijltjestoetsen. Wat is je naam? "
    );
    this.stage.vars.blauwenaam = this.answer;
    yield* this.sayAndWait("Start!", 1.5);
    this.visible = false;
    /* TODO: Implement data_showvariable */ null;
    /* TODO: Implement data_showvariable */ null;
    this.restartTimer();
  }

  *whenIReceiveBereken() {
    this.stage.vars.blauwinfo +=
      "" +
      this.stage.vars.rodenaam +
      ("" + " Edelstenen: " + this.stage.vars.rodeautoedelstenen);
    this.stage.vars.blauwinfo +=
      "" +
      this.stage.vars.blauwenaam +
      ("" + " Edelstenen: " + this.stage.vars.rodeautoedelstenen);
  }

  *whenIReceiveGameover() {
    this.visible = true;
    yield* this.startSound("gong");
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
    if (
      this.stage.vars.rodeautoedelstenen > this.stage.vars.blauweautoedelstenen
    ) {
      this.say("" + this.stage.vars.rodenaam + " wint!");
    } else {
      if (
        this.stage.vars.rodeautoedelstenen <
        this.stage.vars.blauweautoedelstenen
      ) {
        this.say("" + this.stage.vars.blauwenaam + " wint!");
      } else {
        yield* this.sayAndWait("Gelijkspel! probeer het nog eens.", 2);
      }
    }
  }
}
