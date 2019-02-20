const { unirCamposConsecutivosComponente } = require('./app/Tools/OperarCadenas/unirConsecutivoPorComponente')
const { extraerContenidoRecodificado } = require('./app/Tools/Codificacion/contenidoRecodificado')
const fs = require('fs')

let texto = extraerContenidoRecodificado('C:\\cadiaz\\mavi\\intelisis\\3100Capacitacion\\Codigo Original\\Acreedor.tbl')
let unir = unirCamposConsecutivosComponente(texto)
fs.appendFileSync('test.txt', unir)



