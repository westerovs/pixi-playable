import { Container } from "@pixi/display"
import { data } from "../../core/data"
import { Runner } from "@pixi/runner"
import { gsap } from "gsap"
import { createSprite } from "../../utils"

export default class HUD extends Container {
  constructor() {
    super()
    
    this.btn        = []
    this.hammer_btn = null
    this.ok_btn     = null
    
    //signals
    this.onConfirm = null
  }
  
  create = () => {
    this.#createMainBtns()
    this.#createConfirmBtn()
    this.#createHummerBtn()

    // Runner - типа сигналов в файзере !
    this.onChoice  = new Runner('onChoice')
    this.onConfirm = new Runner('onConfirm')
  
    this.#showHammerBtn()
    this.#onHandlerMainBtns()
  
    this.#initAllHandlers()
  }
  
  // кнопка молоток
  #createHummerBtn = () => {
    // кнопка молоточек
    this.hammer_btn       = createSprite(data.textures.hammer, this, 1140, 298, .5)
    this.hammer_btn.alpha = 0
  }
  
  #showHammerBtn = () => {
    const {hammer_btn, btn} = this
    
    this.setInteractive(hammer_btn, true)
    this.setInteractive(btn, true)
    
    // анимация кнопки молотка
    hammer_btn.tween = gsap.to(hammer_btn, {alpha: 1, duration: 1})
    
    if (hammer_btn.tweenScale) {
      hammer_btn.tweenScale.resume()
    } else {
      hammer_btn.tweenScale = gsap.to(hammer_btn.scale, {x: 1.1, y: 1.1, duration: 0.5, repeat: -1, yoyo: true})
    }
  }
  
  #hideHammerBtn = () => {
    const {hammer_btn} = this
    
    if (!hammer_btn.alpha) return
    // скрываю молоточек
    console.warn(`скрываю молоточек`)
    hammer_btn.tween = gsap.to(hammer_btn, {alpha: 0, duration: 0.25})
    hammer_btn.tween.vars.onComplete = () => {
      hammer_btn.tweenScale.pause()
      hammer_btn.scale.set(1)
    }
  }
  
  // главные кнопки
  #createMainBtns = () => {
    const coordinateMainItems = [
      [913, 75],
      [1039, 75],
      [1167, 75],
    ]
  
    for (let i = 0; i < coordinateMainItems.length; i++) {
      this.btn[i]        = createSprite(data.textures.btn_bg_0, this, ...coordinateMainItems[i], .5)
      this.btn[i].item   = createSprite(data.textures[`hud_${ i }`], this.btn[i], 0, 0, .5)
      this.btn[i].active = false
      this.btn[i].scale.set(0)
    }
  }
  
  // кнопка подтверждения
  #createConfirmBtn = () => {
    // кнопка с надписью ок
    this.ok_btn       = createSprite(data.textures.ok_btn, this, 913, 164, .5)
    this.ok_btn.alpha = 0
  }
  
  #showConfirmButton = () => {
    const {ok_btn} = this
    
    if (ok_btn.alpha < 1) {
      ok_btn.tween && ok_btn.tween.kill()
      ok_btn.tween = gsap.to(ok_btn, {alpha: 1, duration: 0.25})
    }
  }
  
  #hideConfirmButton = () => {
    const {ok_btn} = this
    
    ok_btn.tween.kill()
    ok_btn.tween = gsap.to(ok_btn, {alpha: 0, duration: 0.25})
  }

  // инит всех обработчиков
  #initAllHandlers = () => {
    const {hammer_btn, btn, ok_btn} = this
    
    hammer_btn.on('pointertap', this.#onHandlerHammerBtn)
    ok_btn.on('pointertap', this.#onHandlerOkBtn)
  
    Object.values(btn).forEach((sprite, i) => {
      sprite.on('pointertap', this.#onHandlerMainBtns.bind(this, [sprite, i]))
    })
  }
  
  // обработчики
  #onHandlerHammerBtn = (event) => {
    const {hammer_btn} = this
  
    const {target} = event
    if(target.active) return
    target.scale.set(1)
    target.active = true
    target.tweenScale.kill()
    target.tween.kill()
    
    this.setInteractive(hammer_btn, false)
    this.#hideHammerBtn()
    this.showHud()
  }
  
  #onHandlerMainBtns = (props) => {
    if (!props) return
    
    const [sprite, i] = props
    const {btn, ok_btn} = this
    
    if (!sprite.active) {
      sprite.active  = true
      sprite.texture = data.textures.btn_bg_1
      sprite.scale.set(1.1)
    } else {
      sprite.active  = false
      sprite.texture = data.textures.btn_bg_0
      sprite.scale.set(1)
    }
    
    ok_btn.x = sprite.x
    this.setInteractive(ok_btn, false)
    
    if (!sprite.active) {
      this.#hideConfirmButton()
    } else {
      this.#showConfirmButton()
      this.setInteractive(btn, false)
      this.onChoice.emit(i)
    }
    this.setDefault(i)
  }
  
  #onHandlerOkBtn = (event) => {
    const {btn, ok_btn} = this
  
    const {target} = event
    if(target.active) return
    target.scale.set(1)
    target.active = true
    
    this.setInteractive(ok_btn, false)
    this.setInteractive(btn, false)
  
    this.onConfirm.emit()
    this.hideHud()
  }
  
  
  setInteractive() {
    const target = arguments[0]
    const enable = arguments[1]
    if (Array.isArray(target)) {
      for (const btn of target) {
        btn.interactive = enable
        btn.buttonMode  = enable
      }
    } else {
      target.interactive = enable
      target.buttonMode  = enable
    }
  }
  
  setDefault = (except) => {
    const {btn} = this
    for (const [i, button] of btn.entries()) {
      if (i !== except) {
        button.texture = data.textures.btn_bg_0
        button.scale.set(1)
        button.active &&= false
      }
    }
  }
  
  hideHud = () => {
    const {btn, ok_btn} = this
    
    for (const button of btn) {
      gsap.to(button, {alpha: 0, duration: 0.5})
    }
    gsap.to(ok_btn, {alpha: 0, duration: 0.5})
  }
  
  showHud = () => {
    const {btn} = this
    
    for (const [i, button] of this.btn.entries()) {
      const appear = gsap.to(button.scale, {x: 1, y: 1, duration: 0.25, delay: 0.25 * i})
      if (i === 2) {
        appear.vars.onComplete = () => {
          this.setInteractive(btn, true)
        }
      }
    }
  }
}
