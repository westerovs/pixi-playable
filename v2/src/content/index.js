import GameObjects from "./components/GameObjects";
import Cta from "./components/Cta";
import { Container } from "@pixi/display";
import { createSprite } from "../utils";
import { data } from "../core/data";

import * as PIXI from "pixi.js"
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin"; // подключаются фильтры ( в gsap pixi плагины
import { Graphics } from "@pixi/graphics"; // обязательно с pixi
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI); //  обязательно с pixi


// созжаёт контейнер, который добавляетмся в stage
export default class Content extends Container {
  static get() {
    return this._instance ?? (this._instance = new Content())
  }
  
  constructor() {
    super()
    
    this.scene    = null
    this.cta      = null
    this.listener = null
  }
  
  init() {
    this.scene = this.addChild(new GameObjects())
    this.scene.create()
    this.cta = this.addChild(new Cta())
    this.cta.create()
    
    this.listener = {
      onChoice : this.showStair.bind(this),
      onConfirm: this.finishGame.bind(this)
    }
    
  }
  
  showStair(index) {
    this.scene.dropStair(index)
  }
  
  // create finish screen
  finishGame() {
    const shine = gsap.to(this.scene.new_stair_0, {duration: 0.5, pixi: {brightness: 2}, repeat: 1, yoyo: true});
    
    shine.vars.onComplete = () => {
      const fade = this.scene.addChild(new Graphics())
      fade.beginFill(0x000000, 0.5)
        .drawRect(0, 0, this.scene.bg.width, this.scene.bg.height)
        .endFill()
      const final_sign = createSprite(data.textures.final_sign, this, this.width / 2, this.height / 2.5, 0.5)
      
      gsap.to(this.scene, {duration: 1, pixi: {blur: 10}});
      gsap.from(final_sign, {duration: 1, alpha: 0});
      gsap.from(fade, {duration: 1, alpha: 0});
    }
  }
}
