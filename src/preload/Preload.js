import { addData, data } from '../data/data.js';
import Content from '../content/index.js';
import { resize } from '../utils/index.js';

export default class Preload {
  constructor(app, resources) {
    this.app       = app
    this.resources = resources
    this.preload()
  }
  
  preload() {
    const {loader} = this.app
    
    for (const resource of this.resources) {
      loader.add(resource.key, resource.url)
    }
    
    loader.load()
    loader.onLoad.add((loader, res) => addData(res))
    loader.onComplete.add(() => {
      this.createGame()
    })
    
    window.addEventListener('resize', () => resize(data.textures.bg));
  }
  
  createGame() {
    const {stage} = this.app
  
    const newGame = Content.get() // когда закончится загрузка, добавляем
    stage.addChild(newGame)
    newGame.init()
    resize()
  }
}
