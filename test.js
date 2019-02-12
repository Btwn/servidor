
const fs = require('fs')
const path = require('path')
const { PathMaviToNombre } = require('./app/Tools/Path/nomenclaturaMavi')


console.log(PathMaviToNombre('ArtConDisponible_Anexo_Mavi.esp'))
console.log(PathMaviToNombre('CentroCentros_VIS_MAVI.esp'))
