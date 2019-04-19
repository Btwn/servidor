const path = require('path')
const fs = require('fs')
const { leerArchivo } = require('./app/Tools/FileSystem/procesadorArchivos')
const { PathNombreToMavi } = require('./app/Tools/Path/nomenclaturaMavi')
const { decode, continua } = require('./app/Tools/Codificacion/decode')

var rutaO3 = 'C:/cadiaz/mavi/intelisis/5000Capacitacion/Codigo Original'
var rutaR3 = 'C:/cadiaz/mavi/intelisis/3100Capacitacion/Reportes MAVI'

var archivo = 'CampanaD.tbl'
var linea = 'ListaCampos'//ListaCampos	SQL ListaRelaciones ListaCalculados ListaCarpetas ListaAcciones ListaEnCaptura
var carpeta = 'Plan'
var regex = new RegExp(/^ListaCampos.*/gim)
fs.writeFileSync('esp.txt', '')

var textoOrig = leerArchivo(path.join(rutaO3,archivo))
var textoRepo = leerArchivo(path.join(rutaR3,PathNombreToMavi(archivo)))

if(linea !== 'ListaEnCaptura' && ['.tbl','.vis','.frm'].indexOf(path.extname(archivo)) > -1){
	buscaDiff(textoOrig,textoRepo)
} else if(linea === 'ListaEnCaptura' && ['.frm'].indexOf(path.extname(archivo)) > -1){
	let regCompOrig = new RegExp(`\^\\[${carpeta}\\]((\\n|\\r)(?!(;.*|)(\\n|)^\\[.+?\\]).*?$)+`,`gm`)
	let regCompRepo = new RegExp(`\^\\[${archivo}\/${carpeta}\\]((\\n|\\r)(?!(;.*|)(\\n|)^\\[.+?\\]).*?$)+`,`gm`)

	let textoCompOrig = textoOrig.match(regCompOrig).join('')
	let textoCompRepo = textoRepo.match(regCompRepo).join('')

	buscaDiff(textoCompOrig,textoCompRepo)
}

function buscaDiff(textoOrig,textoRepo){
	let ListaCamposOrig = '[Comp]\n'+textoOrig.match(regex).join('\n')
	let ListaCamposRepo = '[Comp]\n'+textoRepo.match(regex).join('\n')

	let ObjetoOrig = continua(decode(ListaCamposOrig))
	let ObjetoRepo = continua(decode(ListaCamposRepo))

	let ListaOrig = ObjetoOrig.Comp[linea].split('<BR>').map(x => x.trim())
	let ListaRepo = ObjetoRepo.Comp[linea].split('<BR>').map(x => x.trim())

	let ListaNuevos = ListaRepo.filter(x => ListaOrig.indexOf(x) === -1)
	let ListaEliminados = ListaOrig.filter(x => ListaRepo.indexOf(x) === -1)

	let insercion = ListaNuevos.reduce((x,y,k,a) => x = x + (a[k-1] ? a[k-1] : '')+'='+y+'\n','') + ListaNuevos[ListaNuevos.length-1]+'=(Fin)'


	fs.appendFileSync('esp.txt', insercion)

	if(ListaEliminados.length > 0)
	fs.appendFileSync('esp.txt', '\n\n\n------ELIMINADOS---------\n'+ListaEliminados)
}

