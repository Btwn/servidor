const hash = require('js-sha1')

console.log(hash(''))

// PathMaviToNombre = nombre => {
// 	let cambio = nombre.split('_')
// 	cambio.pop()
// 	var ind = cambio.length - 1
// 	return cambio.length > 1 && (['frm','vis','tbl','rep','dlg'].indexOf(cambio[ind].toLowerCase()) > -1) ? cambio.map((x,k) => k == ind ? x.toLowerCase() : x).reduce((x,y,k) => k===ind ? x+'.'+y : x+'_'+y) : nombre
// }

// console.log(
// 	PathMaviToNombre('mis_ContAux_REP_MAVI.esp'),
// 	PathMaviToNombre('MenuRepEmbarque_DLG_MAVI.esp')
// )