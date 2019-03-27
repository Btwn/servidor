const R = require('rambda')
const {decode, continua, estructurar, junta, acomodar, reacomodar} = require('../Codificacion/decode')
const { leerArchivo, localizar, leer } = require('../FileSystem/procesadorArchivos')

const lector = R.pipe(
	leerArchivo,
	decode,
	continua//,
	//estructurar
)

const amoldar = R.pipe(
	lector,
	estructurar
)

const unir = R.pipe(
	junta,
	acomodar
)

const absoluto = R.pipe(
	localizar,
	unir,
	//reacomodar
)




module.exports.lector = lector
module.exports.amoldar = amoldar
module.exports.unir = unir
module.exports.absoluto = absoluto