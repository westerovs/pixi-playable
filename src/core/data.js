export const data = {
    textures: {},
    animations: {}
}

export function addData(resource) {
    data.textures[resource.name] = resource.texture
}