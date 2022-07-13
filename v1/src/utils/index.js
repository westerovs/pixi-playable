import { app } from "../App.js";

const getFactor = (width, height, stageWidth, stageHeight) => {
  width ??= app.view.parentNode.clientWidth
  height ??= app.view.parentNode.clientHeight
  
  const landscape  = window.matchMedia("(orientation: landscape)");
  
  if(landscape.matches){
    return width/stageWidth
  } else{
    return width/stageWidth
  }
}

const resize = (bg) => {
  const {renderer, stage, view} = app
  const landscape = window.matchMedia("(orientation: landscape)");
  
  const width  = view.parentNode.clientWidth
  const height = view.parentNode.clientHeight
  
  const stageWidth  = bg?.width ?? 1390
  const stageHeight = bg?.height ?? 640
  
  const factor = getFactor(width, height, stageWidth, stageHeight)
  
  renderer.resize(width, height)
  stage.scale = {x: 1 * factor, y: 1 * factor}
  
  if (landscape.matches) {
    stage.x = width / 2 - stage.width / 2
    stage.y = height / 2 - stage.height / 2
  } else {
    stage.x = 0
    stage.y = height / 2 - stage.height / 2
  }
}

export {
  resize
}
