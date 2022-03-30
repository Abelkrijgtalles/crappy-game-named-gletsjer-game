import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import GameLoop from "./GameLoop/GameLoop.js";
import Weg2 from "./Weg2/Weg2.js";
import Weg1 from "./Weg1/Weg1.js";
import Blauweauto from "./Blauweauto/Blauweauto.js";
import Sneeuwbal from "./Sneeuwbal/Sneeuwbal.js";
import Rodeauto from "./Rodeauto/Rodeauto.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Penguin2 from "./Penguin2/Penguin2.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  GameLoop: new GameLoop({
    x: 84,
    y: -23,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Weg2: new Weg2({
    x: 0,
    y: 5,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Weg1: new Weg1({
    x: 0,
    y: -345,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Blauweauto: new Blauweauto({
    x: 40,
    y: -185,
    direction: -30,
    costumeNumber: 1,
    size: 30,
    visible: true
  }),
  Sneeuwbal: new Sneeuwbal({
    x: -11,
    y: -190,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Rodeauto: new Rodeauto({
    x: -40,
    y: -180,
    direction: 0,
    costumeNumber: 1,
    size: 30,
    visible: true
  }),
  Sprite1: new Sprite1({
    x: -47,
    y: -197,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Penguin2: new Penguin2({
    x: -180,
    y: -30,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
