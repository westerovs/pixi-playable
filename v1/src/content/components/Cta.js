import { Container } from "@pixi/display";
import { gsap } from "gsap"
import { data } from "../../data/data";
import { createSprite } from "../../utils/utils.js";

export default class Cta extends Container {
  constructor() {
    super()
    
    this.cta_btn = null
    this.logo
  }
  
  create() {
    this.cta_btn = createSprite(data.textures.btn, this, 695, 560, 0.5)
    this.logo    = createSprite(data.textures.logo, this, 180, 54, 0.5)
    
    gsap.to(this.cta_btn.scale, {x: 1.025, y: 1.025, duration: 0.5, repeat: -1, yoyo: true})
  }
}
