'use strict'
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')
const path = require('path')
const { listarArchivos } = require('../../Tools/Path/listarArchivos')
const { PathMaviToNombre } = require('../../Tools/Path/nomenclaturaMavi')

class ApiController {
	async index () {
		var archivosTmp = [
			"Invd.tbl",
			"AAA.rep",
			"CCC.rep",
			"ABC.vis",
			"ABC.frm",
			"ABC.tbl",
			"ABCSugerido.tbl",
			"ABCSugerido.vis",
			"ABCSugeridoCat.vis",
			"AccesoExpirado.frm",
			"AccesoExpirado_FRM_MAVI.esp",
			"ActivarDesafectar.esp",
			"AutorizarCondMAVI.frm",
			"ComisionesChoferesDMAVI.tbl",
			"ComisionesChoferesDMAVI.vis",
			"InvD.tbl",
			"GenerarGastoAnticipo.dlg",
			"CuotasCobMenRVVIS.vis",
			"Prov.tbl",
			"Prov.vis",
			"Prov.frm"
		]
		var orig5000 = await this.orig5000()
		var repo5000 = await this.repo5000()
		var orig3100 = await this.orig3100()
		var repo3100 = await this.repo3100()

		// Estas 4 lineas hay que eliminarlas, son solo un filtro para tener solo loa aechivos del array archivosTmp
		orig5000 = orig5000.filter(x => archivosTmp.map(y => y.toLowerCase()).indexOf(x.toLowerCase()) > -1)
		repo5000 = repo5000.filter(x => archivosTmp.map(y => y.toLowerCase()).indexOf(x.toLowerCase()) > -1)
		orig3100 = orig3100.filter(x => archivosTmp.map(y => y.toLowerCase()).indexOf(x.toLowerCase()) > -1)
		repo3100 = repo3100.filter(x => archivosTmp.map(y => y.toLowerCase()).indexOf(x.toLowerCase()) > -1)

		var union = orig5000.concat(repo5000,orig3100,repo3100)
		union = Array.from(new Set(union)).sort()

		var resultado = []
		var espResult = []

		union.forEach(item => {
			if(path.extname(item) != '.esp' || PathMaviToNombre(item) == item){
				resultado.push({
					id: resultado.length + 1,
					nombre: item,
					orig5000: orig5000.indexOf(item) > -1,
					repo5000: repo5000.indexOf(item) > -1,
					espe5000: false,
					orig3100: orig3100.indexOf(item) > -1,
					repo3100: repo3100.indexOf(item) > -1,
					espe3100: false,
				})
			} else {
				espResult.push({
					nombre: item,
					name: PathMaviToNombre(item),
					espe5000: repo5000.indexOf(item) > -1,
					espe3100: repo3100.indexOf(item) > -1
				})
			}
		})
		
		espResult.forEach(item => {
			var key = resultado.findIndex(x => x.nombre.toLowerCase() == item.name.toLowerCase())
			try {
				resultado[key].espe5000 = item.espe5000
				resultado[key].espe3100 = item.espe3100
			} catch(err) {
				console.error(key, item, err)
			}

		})

		return resultado
	}

	async orig5000 () {
		var O5 = Env.get('5000_ORIG')
		var files = listarArchivos(O5,['.tbl','.vis','.frm','.dlg','.rep','.esp'])
		return files
	}

	async repo5000 () {
		var R5 = Env.get('5000_REPO')
		var files = listarArchivos(R5,['.tbl','.vis','.frm','.dlg','.rep','.esp'])
		return files
	}

	async espe5000 (){
		var E5 = Env.get('5000_ESPE')
		var files = listarArchivos(E5,['.tbl','.vis','.frm','.dlg','.rep','.esp'])
		return files
	}

	async orig3100 () {
		var O3 = Env.get('3100_ORIG')
		var files = listarArchivos(O3,['.tbl','.vis','.frm','.dlg','.rep','.esp'])
		return files
	}

	async repo3100 () {
		var R3 = Env.get('3100_REPO')
		var files = listarArchivos(R3,['.tbl','.vis','.frm','.dlg','.rep','.esp'])
		return files
	}

	

}

module.exports = ApiController
