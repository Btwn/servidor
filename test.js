const { unirCamposConsecutivosComponente } = require('./app/Tools/OperarCadenas/unirConsecutivoPorComponente')
const { extraerContenidoRecodificado } = require('./app/Tools/Codificacion/contenidoRecodificado')

var ruta = 'C:/cadiaz/mavi/intelisis/3100Capacitacion/Codigo Original/EmbarqueD.vis'

// console.log(
	unirCamposConsecutivosComponente(extraerContenidoRecodificado(ruta))
// )