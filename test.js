// const { unirCamposConsecutivosComponente } = require('./app/Tools/OperarCadenas/unirConsecutivoPorComponente')
// const { extraerContenidoRecodificado } = require('./app/Tools/Codificacion/contenidoRecodificado')
// const fs = require('fs')

// let texto = extraerContenidoRecodificado('C:\\cadiaz\\mavi\\intelisis\\3100Capacitacion\\Codigo Original\\Acreedor.tbl')
// let unir = unirCamposConsecutivosComponente(texto)
// fs.appendFileSync('test.txt', unir)


const obj = {
	Tabla: {
		Icono: 3,
		Clave: 'Clave',
		ListaCampos: '(Lista)'
	},
	"Tabla.ListaCampos": {
		"(Inicio)": "A",
		"A": "B",
		"B": "(Fin)"
	}
}

console.log(obj['Tabla.ListaCampos'])
obj['Tabla.ListaCampos'] && console.log('si')


