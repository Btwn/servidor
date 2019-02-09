
const fs = require('fs')
const path = require('path')
const { listarArchivos } = require('./app/Tools/OperadoresArchivos/listarArchivos')
const { crearNomExtensionTipoEsp } = require('./app/Tools/Path/crearNomExtensionTipoEsp')
const { crearNombreNomenclaturaArchivoEsp } = require('./app/Tools/Path/crearNomenclatura_MaviEsp')
const { PathNombreToMavi,PathMaviToNombre } = require('./app/Tools/Path/nomenclaturaMavi')

let nombre = 'AccesoExpirado_FRM_MAVII.esp'
console.log(PathMaviToNombre(nombre))
let cambio = nombre.split('_')
cambio.pop()
cambio = cambio.length == 2 ? cambio.map((x,k) => k == 1 ? x.toLowerCase() : x).join('.') : nombre
console.log(cambio)

nombre = 'AccesoExpirado.esp'
console.log(PathMaviToNombre(nombre))
cambio = nombre.split('_')
cambio.pop()
cambio = cambio.length == 2 ? cambio.map((x,k) => k == 1 ? x.toLowerCase() : x).join('.') : nombre
console.log(cambio)
