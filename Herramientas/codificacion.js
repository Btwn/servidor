const fs = require('fs')
const path = require('path')
const { detectarCodificacion } = require('./util/detectarCodificacion')
const { listarArchivos } = require('./util/listarArchivos')

var accion = process.argv[2]
var ruta = 'D:/Dev/mavi/5000Capacitacin/Reportes MAVI/'
// var ruta = 'C:/cadiaz/mavi/intelisis/5000Capacitacion/Reportes MAVI/'
//var ruta = '\\\\172.16.202.39\\Versiones\\5000Capacitacion\\Reportes MAVI\\'
var files = listarArchivos(ruta)
var arr = []


console.log(process.argv[1], process.argv[2])


files.forEach(file => {
    let cod = detectarCodificacion(ruta + file)
    console.log(cod, file)
    if(cod !== 'Latin1'){
        console.log(cod, file)
        if(accion === '1'){
            console.log(cod, file, 'cambiado')
            let cont = fs.readFileSync(ruta + file, cod)
            fs.writeFileSync(ruta + file, cont, {encoding:'latin1'})
            arr.push(file)
        }
    }
})


// })
// fs.appendFileSync('test.txt', arr)