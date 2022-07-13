import { Sprite } from "@pixi/sprite";
import { app } from "../core/App";

/**
 * Resize function
 * 
 * @param {*object Pixi.Sprite} bg - deliver backgrouns sprite, to count scale factor... or set the default params of stageWidth/stageHeight
 */

export function resize(bg){
    const {renderer, stage, view} = app
    const landscape  = window.matchMedia("(orientation: landscape)");

    const width = view.parentNode.clientWidth
    const height = view.parentNode.clientHeight
    
    const stageWidth = bg?.width ?? 1390
    const stageHeight = bg?.height ?? 640
    
    const factor = getFactor(width, height, stageWidth, stageHeight)

    renderer.resize(width, height)
    stage.scale = {x: 1*factor, y: 1*factor}
    if(landscape.matches){
        stage.x = width/2 - stage.width/2
        stage.y = height/2 - stage.height/2
    } else {
        stage.x = 0
        stage.y = height/2 - stage.height/2
    }
}

/**
 * Returns the scale factor
 * 
 * @param {*number} width 
 * @param {*number} height 
 * @param {*number} stageWidth 
 * @param {*number} stageHeight 
 * @returns number
 */

function getFactor (width, height, stageWidth, stageHeight){

    width ??= app.view.parentNode.clientWidth
    height ??= app.view.parentNode.clientHeight

    const landscape  = window.matchMedia("(orientation: landscape)");

    if(landscape.matches){
        return width/stageWidth
    } else{
        return width/stageWidth
    }
    // const defaultWidth = 860
    // const defaultHeight = 595

    // const windowAspectRatio = width/height
    // const defaultAspectRatio = defaultWidth/defaultHeight

    // if (landscape.matches) {
    //     if (windowAspectRatio <= defaultAspectRatio) {
    //       return width / defaultWidth
    //     }
    //     if (windowAspectRatio > defaultAspectRatio) {
    //       return height / defaultHeight
    //     }
    //   }
    //   if (landscape.matches) {
    //     if (windowAspectRatio >= 1 / defaultAspectRatio) {
    //       return width / defaultHeight
    //     }
    //     if (windowAspectRatio < 1 / defaultAspectRatio) {
    //       return width / defaultHeight
    //     }
    //   }
    //   return 1
}


/**
 * Reference to new PIXI.Sprite(_texture)
 * 
 * @param {*Object Texture.object} texture - texture object
 * @param {*number value} x - X coordinate
 * @param {*number value} y - Y coordinate
 * @param {*nember value} anchor - anchor value. 0 is equal left-top corner, 1 is equal right-bottom corner
 * @returns 
 */

export function createSprite(texture, parent, x = 0, y = 0, anchor = 0 ){
    const sprite = new Sprite(texture)
    sprite.position = {x, y}
    sprite.anchor.set(anchor)
    if(parent)
        parent.addChild(sprite)
    return sprite
}