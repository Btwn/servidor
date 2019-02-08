
const fs = require('fs')
const path = require('path')
const { listarArchivos } = require('./app/Tools/OperadoresArchivos/listarArchivos')
const { crearNomExtensionTipoEsp } = require('./app/Tools/Path/crearNomExtensionTipoEsp')
const { crearNombreNomenclaturaArchivoEsp } = require('./app/Tools/Path/crearNomenclatura_MaviEsp')
const { PathNombreToMavi,PathMaviToNombre } = require('./app/Tools/Path/cambioNombre')

let nombre = 'AccesoExpirado_FRM_MAVII.esp'

let cambio = PathNombreToMavi(nombre)

// cambio = nombre.replace(path.extname(nombre),'').split('_')
// cambio = cambio.length > 2 ? cambio[0] + '.' + cambio[1].toLowerCase() : nombre

console.log(cambio)
