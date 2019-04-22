const chardet   = require('chardet')

exports.detectarCodificacion = archivo => {
    return codificacion = chardet.detectFileSync(archivo)
    return codificacion == 'UTF-8' ? codificacion : 'Latin1'
}