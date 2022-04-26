import { Container } from "@pixi/display";
import { Runner } from "@pixi/runner";
import { Graphics } from "@pixi/graphics"
import { gsap } from "gsap"
import { data } from "../../core/data";
import { createSprite } from "../../utils";
import level_cfg from "./level"

export default class GameObjects extends Container {
    constructor() {
        super()

        this.bg = null
        this.austin = null
        this.banquet = null
        this.globe = null
        this.book_stand = null
        this.table = null
        this.old_stair = null
        this.new_stair_0 = null
        this.plant_0 = null
        this.plant_1 = null
        this.plant_2 = null

        //signals
        this.onStairDropped = null
        this.onStairHidden = null
    }

    create(){
        /**
         * by the next step we can use factory created previously... or  'for' cycle with level_config
         * 
         * далее можно использовать заранее написаную фабрику объектов... я запустил цикл в паре
         *  с файлом конфигурации, в котором хранятся паремтры объектов сцены
         */

        for (const name in level_cfg){
            const {x, y, anchor} = level_cfg[name]
            this[name] = createSprite(data.textures[name], this, x, y, anchor)
            if(level_cfg[name].animated){
                gsap.from(this[name], {y:-200, duration: 1, ease: "bounce.out", delay:0.25})
            }

        }
        this.new_stair_0.visible = false
        this.plant_2.scale = {x:1.125, y:1.125}

        const mask = this.addChild(new Graphics())
        mask.beginFill(0x000000,0.5)
            .drawRect(0,0, this.bg.width, this.bg.height)
            .endFill()
        this.mask = mask

        this.onStairDropped = new Runner('onDrop')
    }

    dropStair(index){
        this.new_stair_0.texture = data.textures[`new_stair_${index}`]
        this.new_stair_0.visible = true
        this.new_stair_0.alpha = 1
        const drop = gsap.from(this.new_stair_0, {y:-200, duration: 1, ease: "bounce.out"})
        drop.vars.onComplete = () => {this.onStairDropped.emit()}
    }
}