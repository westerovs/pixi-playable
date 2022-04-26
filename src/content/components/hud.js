import { Container } from "@pixi/display"
import { data } from "../../core/data"
import { Runner } from "@pixi/runner"
import { gsap } from "gsap"
import { createSprite } from "../../utils"
import btn_events from "../../utils/btn_events"

export default class HUD extends Container {
    constructor() {
        super()

        this.btn = []
        this.hammer_btn = null
        this.ok_btn = null

        //signals
        this.onConfirm = null
    }

    create(){
        const coordinates = [
            [913,75],
            [1039,75],
            [1167,75],
        ]
        
        for ( let i = 0; i<3; i++){
            this.btn[i] = createSprite(data.textures.btn_bg_0, this, ...coordinates[i], .5)
            this.btn[i].item = createSprite(data.textures[`hud_${i}`], this.btn[i], 0, 0, .5)
            this.btn[i].active = false
            this.btn[i].scale.set(0)
        }

        this.ok_btn = createSprite(data.textures.ok_btn, this, 913, 164, .5)
        this.ok_btn.alpha = 0

        this.hammer_btn = createSprite(data.textures.hammer, this, 1140, 298, .5)
        this.hammer_btn.alpha = 0
    
        // Runner - типа сигналов в файзере !
        this.onChoice  = new Runner('onChoice')
        this.onConfirm = new Runner('onConfirm')
        this.showButtons()
    }

    showButtons(){
        this.showHammerBtn(true)
        this.addButtonHandlers()
    }

    addButtonHandlers(){
        const {btn, ok_btn, hammer_btn} = this

        for ( const [i,button] of btn.entries()) {
            button.on('pointertap', (e)=>{
                btn_events.onTapHandler(e)
                ok_btn.x = button.x
                this.setInteractive(ok_btn, false)
                if(!button.active) {
                    this.showConfirmButton(false)
                }
                else {
                    this.showConfirmButton(true)
                    this.setInteractive(btn, false)
                    this.onChoice.emit(i)
                }
                this.setDefault(i)
            })
        }

        ok_btn.on('pointertap', (e)=>{
            btn_events.onConfirmHandler(e)
            this.setInteractive(ok_btn, false)
            this.setInteractive(btn, false)

            this.onConfirm.emit()
            this.hideHud()
        })

        hammer_btn.on('pointertap', (e)=>{
            btn_events.onBuildHandler(e)
            this.setInteractive(hammer_btn, false)
            this.showHammerBtn(false)
            this.showHud()
        })

    }

    setInteractive(){
        const target = arguments[0]
        const enable = arguments[1]
        if(Array.isArray(target)) {
            for( const btn of target) {
                btn.interactive = enable
                btn.buttonMode = enable
            }
        } else {
            target.interactive = enable
            target.buttonMode = enable
        }
    }

    setDefault(except){
        const {btn} = this
        for(const [i,button] of btn.entries()) {
            if(i!==except) {
                button.texture = data.textures.btn_bg_0
                button.scale.set(1)
                button.active &&= false
            }
        }
    }

    showHammerBtn(bool){
        const {hammer_btn, btn} = this
        if(bool){
            this.setInteractive(hammer_btn, true)
            this.setInteractive(btn, true)
            hammer_btn.tween = gsap.to(hammer_btn, {alpha:1, duration: 1})
            if(hammer_btn.tweenScale){
                hammer_btn.tweenScale.resume()
            } else {
                hammer_btn.tweenScale = gsap.to(hammer_btn.scale, {x:1.1, y:1.1, duration: 0.5, repeat: -1, yoyo: true})
            }
            
        } else {
            if(!hammer_btn.alpha) return
            hammer_btn.tween = gsap.to(hammer_btn, {alpha:0, duration: 0.25})
            hammer_btn.tween.vars.onComplete = () => {
                hammer_btn.tweenScale.pause()
                hammer_btn.scale.set(1)
            }
        }
    }

    showConfirmButton(bool){
        const {ok_btn} = this
        if(bool){
            if(ok_btn.alpha<1){
                ok_btn.tween && ok_btn.tween.kill()
                ok_btn.tween = gsap.to(ok_btn, {alpha:1, duration: 0.25})
            }
        } else {
            ok_btn.tween.kill()
            ok_btn.tween = gsap.to(ok_btn, {alpha:0, duration: 0.25})
        }
    }

    hideHud(){
        const {btn, ok_btn} = this
        
        for (const button of btn){
            gsap.to(button, {alpha: 0, duration: 0.5})
        }
        gsap.to(ok_btn, {alpha: 0, duration: 0.5})
    }

    showHud(){
        const{btn} = this

        for ( const [i,button] of this.btn.entries()) {
            const appear = gsap.to(button.scale, {x:1, y:1, duration: 0.25, delay:0.25*i})
            if(i===2){
                appear.vars.onComplete = () => {
                    this.setInteractive(btn, true)
                }
            }
        }
    }
}
