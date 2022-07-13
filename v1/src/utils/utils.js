import { Sprite } from '@pixi/sprite';

const createSprite = (texture, parent, x = 0, y = 0, anchor = 0) => {
  const sprite    = new Sprite(texture)
  sprite.position = { x, y }
  sprite.anchor.set(anchor)
  
  if (parent) parent.addChild(sprite)
  
  return sprite
}

const setActiveStatusElement = (element, boolean) => {
  if (Array.isArray(element)) {
    for (const item of element) {
      item.interactive = boolean
      item.buttonMode  = boolean
    }
  } else {
    element.interactive = boolean
    element.buttonMode  = boolean
  }
}


export {
  createSprite,
  setActiveStatusElement
}
