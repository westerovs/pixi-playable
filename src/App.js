import { Application } from "pixi.js" // самое главное
import { settings } from "@pixi/settings" //
import { SCALE_MODES } from "@pixi/constants" // сглаживание
import { data, addData } from "./data/data.js"
import { resize } from "./utils/index.js"
import Content from "./content/index.js"
import cfg from "./data/settings.js"
import Preload from './preload/Preload.js';

export let app // кладу Application

const createGame = () => {
    const {gameSettings, resources} = cfg
    app = new Application(gameSettings)

    app.resizeTo = app.view // сам канвас
    app.resize()
    settings.SCALE_MODE = SCALE_MODES.LINEAR // режим сглаживания
    
    new Preload(app, resources)
}

export {
    createGame
}
