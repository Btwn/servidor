'use strict'
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')
const path = require('path')
const { listarArchivos } = require('../../Tools/Path/listarArchivos')
const { PathMaviToNombre } = require('../../Tools/Path/nomenclaturaMavi')

class ApiController {
	async index () {
		var archivosTmp = [
			'AccesoExpirado.frm',
			'MaviServiCasaCredHistoricoSolicitudesVis.vis',
			'InvA.vis',
			'MovPersonal.frm',
			'MovPropiedades.frm',
			'MovFormaAnexo.frm',
			'ContResultados.rep',
			'EvaluacionCalificacion.tbl',
			'EvaluacionCalificacion.vis',
			'EvaluacionCalificacion.frm',
			'INV.rep',
			'CBMov.rep',
			'CB.vis',
			'MovSituacionL.frm',
			'Art2.tbl',
		'NegociaMoratoriosMavi.tbl',
		'NegociaMoratoriosMavi.vis',
		'NegociaMoratoriosMavi.frm',
		'eDocDocumento.frm',
		'ArtTipo.frm',
		'ArtTipo.vis',
'ActivoFArt.frm',
'ActivoFArt.vis',
'ActivoFCat.frm',
'ActivoFCat.tbl',
'ActivoFCat.vis',
'ActivoFijoD.tbl',
'ActivoFijoD.vis',
'ActivoFijo.frm',
'ActivoFijo.tbl',
'ActivoFInfo.frm',
'ActivoFLista.frm',
'ActivoFLista.vis',
'ActivoF.frm',
'ActivoF.tbl',
'ActivoF.vis',
'Agente3.tbl',
'Agente4.tbl',
'AgenteDestino.tbl',
'AgenteEnviarA.tbl',
'AgenteServicio.tbl',
'AgenteValida.tbl',
'Agente.frm',
'Agente.tbl',
'Agente.vis',
'Agent.frm',
'Agent.tbl',
'Alm.frm',
'Alm.tbl',
'Alm.vis',
'AnexoMovCfg.frm',
'AnexoMov.tbl',
'ArtAlmExistencia.frm',
'ArtAlm.frm',
'ArtAlm.tbl',
'ArtA.vis',
'ArtCat.frm',
'ArtCB.tbl',
'ArtCompraLista.frm',
'ArtConDisponible.frm',
'ArtConDisponible.vis',
'ArtDisponibleAlm.vis',
'ArtFam.frm',
'ArtFam.tbl',
'ArtFam.vis',
'ArtGrupo.frm',
'ArtGrupo.tbl',
'ArtInfo.frm',
'ArtJuegoD.tbl',
'ArtLinea.frm',
'ArtLinea.tbl',
'ArtLinea.vis',
'ArtLista.frm',
'ArtProv.tbl',
'ArtSerieLoteLista.frm',
'Art.frm',
'Art.tbl',
'Art.vis',
'BancoSucursal.frm',
'BancoSucursal.tbl',
'BancoSucursal.vis',
'Cajero.tbl',
'CampanaCorreoD.vis',
'CampanaD.frm',
'CampanaD.tbl',
'CampanaD.vis',
'CampanaUsuarioAsignar.frm',
'Campana.frm',
'Campana.tbl',
'Campana.vis',
'CancelarVentaPendiente.dlg',
'CapitalD.tbl',
'CentroCostos.frm',
'CentroCostos.tbl',
'CentroCostos.vis',
'CodigoPostalLista.frm',
'CodigoPostal.frm',
'CodigoPostal.tbl',
'CodigoPostal.vis',
'CompraA.vis',
'CompraDAsignar.frm',
'CompraD.tbl',
'CompraD.vis',
'CompraT.vis',
'Compra.frm',
'Compra.tbl',
'COMS.rep',
'ConceptoGAS.frm',
'Concepto.frm',
'Concepto.tbl',
'Concepto.vis',
'Condicion.frm',
'Condicion.tbl',
'Condicion.vis',
'Consecutivo.frm',
'Consecutivo.vis',
'Consecutivo.tbl',
'ContAuxConcentrado.rep',
'ContAuxDia.rep',
'Cont.frm',
'Cont.tbl',
'CtaBitacoraAgregar.frm',
'CtaBitacora.frm',
'CtaDinero.frm',
'CtaDinero.tbl',
'Cta.frm',
'Cta.tbl',
'Cta.vis',
'CteAseguradora.tbl',
'CteA.vis',
'CteBonificacion.tbl',
'CteCtoDireccion.frm',
'CteCtoDireccion.tbl',
'CteCtoDireccion.vis',
'CteCto.frm',
'CteCto.tbl',
'CteCto.vis',
'CteDepto.frm',
'CteEnviarALista.frm',
'CteEnviarAOtrosDatos.tbl',
'CteEnviarA.frm',
'CteEnviarA.tbl',
'CteEnviarA.vis',
'CteExpress.frm',
'CteFacturarA.tbl',
'CteHist.tbl',
'CteHist.vis',
'CteInfo.frm',
'CteInfo.vis',
'CteLD.tbl',
'CteLista.frm',
'CteProcesar.frm',
'CteRelacion.frm',
'CteRelacion.tbl',
'CteRelacion.vis',
'CteTel.frm',
'CteTel.tbl',
'CteTel.vis',
'Cte.frm',
'Cte.tbl',
'Cte.vis',
'CxcAplicaDif.frm',
'CxcAplicaDif.tbl',
'CxcA.vis',
'CxcCampos.frm',
'CxcCampos.vis',
'CxcEstadoCuenta.rep',
'CxcExpress.frm',
'CxcPendiente.tbl',
'CxcT.vis',
'Cxc.frm',
'Cxc.tbl',
'Cxc.vis',
'CxpT.vis',
'Cxp.frm',
'CXP.rep',
'Cxp.tbl',
'Cxp.vis',
'DemandaPendiente.frm',
'Departamento.frm',
'Departamento.tbl',
'Departamento.vis',
'DineroA.vis',
'DineroPendienteLista.frm',
'DineroT.vis',
'Dinero.frm',
'Dinero.tbl',
'Dinero.vis',
'EliminarConta.esp',
'EmbarqueAsignarOC.frm',
'EmbarqueAsignar.frm',
'EmbarqueD.tbl',
'EmbarqueD.vis',
'Embarque.frm',
'Embarque.tbl',
'Embarque.vis',
'EmpresaCfg2.tbl',
'EmpresaCfg2.vis',
'EmpresaCfg.frm',
'EmpresaConceptoValidar.frm',
'EmpresaConceptoValidar.tbl',
'EmpresaConceptoValidar.vis',
'EmpresaConcepto.frm',
'EmpresaConcepto.tbl',
'EmpresaConcepto.vis',
'EmpresaGral.frm',
'EmpresaGral.tbl',
'EmpresaGral.vis',
'Empresa.tbl',
'Empresa.vis',
'EquipoAgente.frm',
'EspecificaCancelaCobroIns.frm',
'EspecificarAlmacenFRM.frm',
'EspecificarAlmacenIFRM.frm',
'EspecificarClienteA.frm',
'EspecificarClienteMAVI.frm',
'EspecificarEjercicioPeriodoDIOT.frm',
'EspecificarFechas.frm',
'EspecificarImporteConImpuestosVtas.frm',
'EspecificarImporteConImpuestos.frm',
'EspecificarMovFactura.frm',
'EvaluacionCalificacion.frm',
'EvaluacionCalificacion.vis',
'EvaluacionComentarios.frm',
'EvaluacionComentarios.tbl',
'EvaluacionCtoSubSubSub.frm',
'EvaluacionCtoSubSub.frm',
'EvaluacionCtoSub.frm',
'EvaluacionCto.frm',
'EvaluacionCto.tbl',
'EvaluacionCto.vis',
'EvaluacionFormato.frm',
'EvaluacionFormato.tbl',
'EvaluacionFormato.vis',
'EvaluacionNueva.frm',
'ExplorarAgent.frm',
'ExplorarInvSerieLote.frm',
'ExplorarProv.frm',
'ExplorarVentaD.frm',
'Fabricante.frm',
'Fabricante.tbl',
'Fabricante.vis',
'FechaPolizaConciliado.esp',
'fnCxcInfo.vis',
'GastoD.tbl',
'GastoD.vis',
'GastoT.vis',
'Gasto.frm',
'Gasto.tbl',
'Gasto.vis',
'GenerarAgentCobro.dlg',
'GenerarCompraConsignacion.dlg',
'GenerarCxcCobroPosfechado.dlg',
'GenerarCxcCobro.dlg',
'GenerarCxcNCredito.dlg',
'GenerarCxpNCredito.dlg',
'GenerarCxpPago.dlg',
'GenerarGastoAnticipo.dlg',
'GenerarGastoSolicitud.dlg',
'GenerarOrdenCompra.dlg',
'GenerarOrdenTraspaso.dlg',
'GenerarPedido.dlg',
'GenerarRequisicion.dlg',
'GenerarSolicitudDevolucion.dlg',
'GenerarSolicitud.dlg',
'GenerarTransito.dlg',
'Invd.tbl',
'Invd.vis',
'Inv.frm',
'Inv.tbl',
'Inv.vis',
'ListaIDOK.frm',
'ListaIDOK.vis',
'ListaPreciosD.frm',
'ListaPreciosD.tbl',
'MenuCfgCampana.dlg',
'MenuCfgCompras.dlg',
'MenuCfgConsecutivos.dlg',
'MenuCfgCxC.dlg',
'MenuCfgEmbarque.dlg',
'MenuCfgGeneral.dlg',
'MenuCfgOtros.dlg',
'MenuCfgUsuarios.dlg',
'MenuCfgVentas.dlg',
'MenuCtaArticulos.dlg',
'MenuCtaClientes.dlg',
'MenuExpAgent.dlg',
'MenuExpCte.dlg',
'MenuExpCxc.dlg',
'MenuExpDinero.dlg',
'MenuExpInv.dlg',
'MenuExpVentas.dlg',
'MenuGenerarPolizas.dlg',
'MenuHerramientaCompras.dlg',
'MenuHerramientaCont.dlg',
'MenuHerramientaCxC.dlg',
'MenuHerramientasVenta.dlg',
'MenuPrincipal.dlg',
'MenuRepAgent.dlg',
'MenuRepCont.dlg',
'MenuRepCxc.dlg',
'MenuRepDinero.dlg',
'MenuRepEmbarque.dlg',
'mis_ContAux.rep',
'MovBitacoraAgregar.frm',
'MovBitacora.frm',
'MovBitacora.tbl',
'MovBitacora.vis',
'MovCopiarMeses.frm',
'MovTipo.frm',
'MovTipo.tbl',
'MovTipo.vis',
'Neteo.tbl',
'NominaAuto.frm',
'ObservacionLista.frm',
'OfertaPendiente.frm',
'PersonalDatosAcademicos.tbl',
'PersonalInfo.frm',
'Personal.frm',
'Personal.tbl',
'Personal.vis',
'PlaneadorMacroMAVI.tbl',
'ProcesarVenta.frm',
'ProvArrendadora.tbl',
'ProvAseguradora.tbl',
'ProvImportacion.tbl',
'ProvInfo.frm',
'ProvLista.frm',
'Prov.frm',
'Prov.tbl',
'Prov.vis',
'Proyecto.frm',
'Proy.tbl',
'Puesto.frm',
'Puesto.tbl',
'Puesto.vis',
'Rep_EspecificacionSaldosClientesMAVI.rep',
'Rep_EspecificacionSaldosClientesMAVIIMP.rep',
'RH.frm',
'Ruta.frm',
'Ruta.vis',
'SerieLoteMovinfo.frm',
'SerieLoteMov.frm',
'SerieLoteMov.tbl',
'SerieLotePropExistencia.vis',
'SerieLotePropLista.frm',
'SerieLoteProp.frm',
'SerieLoteProp.tbl',
'SerieLoteProp.vis',
'SerieLote.tbl',
'SerieLote.vis',
'soporteA.vis',
'Soporte.frm',
'Soporte.tbl',
'Soporte.vis',
'Sucursal.tbl',
'Sucursal.vis',
'TablaStD.frm',
'TablaStD.tbl',
'TablaStD.vis',
'TablaSt.frm',
'TablaSt.tbl',
'TareaEditar.frm',
'Tarea.frm',
'Unidad.frm',
'Unidad.tbl',
'Unidad.vis',
'UsuarioCfg2.tbl',
'UsuarioCfg2.vis',
'UsuarioCfg.frm',
'Usuario.frm',
'Usuario.tbl',
'Usuario.vis',
'Vale.frm',
'VehiculoLista.frm',
'Vehiculo.frm',
'Vehiculo.tbl',
'Vehiculo.vis',
'VentaA.vis',
'VentaCopiar.frm',
'VentaD.tbl',
'VentaD.vis',
'VentaEntrega.frm',
'VentaEntrega.tbl',
'VentaEntrega.vis',
'VentaExplorar.vis',
'VentaP.vis',
'VentaTFiltroAbrir.vis',
'VentaTFiltro.tbl',
'VentaT.vis',
'VentaVerAnticipo.frm',
'Venta.frm',
'Venta.tbl',
'Venta.vis',
'VerMovTiempo.frm',
'Version.frm'
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
