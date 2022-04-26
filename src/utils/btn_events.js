// import { data } from "../core/data"
//
// const btn_events = {
//     onTapHandler,
//     onConfirmHandler,
//     onBuildHandler
// }
//
// export default btn_events
//
// function onTapHandler(event){
//     const {target} = event
//     if(!target.active){
//         target.active = true
//         target.texture = data.textures.btn_bg_1
//         target.scale.set(1.1)
//     } else {
//         target.active = false
//         target.texture = data.textures.btn_bg_0
//         target.scale.set(1)
//     }
// }
//
// function onConfirmHandler(event){
//     const {target} = event
//     if(target.active) return
//     target.scale.set(1)
//     target.active = true
// }
//
// function onBuildHandler(event){
//     const {target} = event
//     if(target.active) return
//     target.scale.set(1)
//     target.active = true
//     target.tweenScale.kill()
//     target.tween.kill()
// }
