import { Application } from "pixi.js" // самое главное
import { settings } from "@pixi/settings" //
import { SCALE_MODES } from "@pixi/constants" // сглаживание
import { data, addData } from "./data"
import { resize } from "../utils"
import Content from "../content"
import cfg from "./settings"

export let app // кладу Application

export function applicationStart(){
    const {gameSettings, resources} = cfg
    app = new Application(gameSettings)

    app.resizeTo = app.view // сам канвас
    app.resize()
    settings.SCALE_MODE = SCALE_MODES.LINEAR // режим сглаживания
    loadResources(app, resources)
}

// предзагрузка
function loadResources(app, resources){
    const {loader, stage} = app
    for (const resource of resources) {
        loader.add(resource.key, resource.url)
    }

    loader.load()

    loader.onLoad.add((loader, res) => addData(res))

    loader.onComplete.add(()=>{
        const newGame = Content.get() // когда закончится загрузка, добавляем
        stage.addChild(newGame)
        newGame.init()
        resize()
    })

    window.addEventListener('resize',()=>resize(data.textures.bg));
}
