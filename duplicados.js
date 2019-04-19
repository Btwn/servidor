const fs = require('fs')
const path = require('path')
const { listarArchivos } = require('./app/Tools/Path/listarArchivos')


var rutaRepo = 'C:/cadiaz/mavi/intelisis/5000Capacitacion/Reportes MAVI/'
var UrtaOrig = 'C:/cadiaz/mavi/intelisis/5000Capacitacion/Codigo Original/'

var listaRepo = listarArchivos(rutaRepo)
var listaOrig = listarArchivos(UrtaOrig)

var lista = listaRepo.filter(x => listaOrig.indexOf(x) > -1)

lista.forEach(item => {
	fs.unlinkSync(path.join(rutaRepo, item))
})

fs.appendFileSync('duplicados.txt', lista.join('\n'))
