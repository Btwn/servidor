'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Model = use('Model')

class Tabla {
	constructor() {
		this.Icono										={type: 'Number'}
		this.Clave										={type: 'String'}
		this.Archivo									={type: 'String'}
		this.Modulos									={type: 'Array', childs: false}
		this.TipoTabla								={type: 'String'}
		this.ListaCampos							={type: 'Array', childs: true, prefix: ''}
		this.Nombre										={type: 'String'}
		this.Singular									={type: 'String'}
		this.LlavePrimaria						={type: 'Array', child: false}
		this.ListaRelaciones					={type: 'Array', child: true, prefix: 'Relaciones.'}
		this.SQL											={type: 'Array', child: false}
		this.CamposBusquedaRapida			={type: 'Array', child: false}
		//--------------Configuracion - Controles de tabla
		this.ControlSucursal					={type: 'String'}
		this.CampoSucursal						={type: 'String'}
		this.ControlSucursalOrigen		={type: 'String'}
		this.CampoSucursalOrigen			={type: 'String'}
		this.ControlSucursalDestino		={type: 'String'}
		this.CampoSucursalDestino			={type: 'String'}
		this.ControlID								={type: 'String'}
		this.CampoID									={type: 'String'}
		this.ControlConsecutivo				={type: 'String'}
		this.CampoConsecutivo					={type: 'String'}
		this.ControlSugerido					={type: 'String'}
		this.CampoSugerido						={type: 'String'}
		this.ControlMov								={type: 'String'}
		this.CampoMov									={type: 'String'}
		this.ControlMovID							={type: 'String'}
		this.CampoMovID								={type: 'String'}
		this.ControlEstatus						={type: 'String'}
		this.CampoEstatus							={type: 'String'}
		this.EstatusDefault						={type: 'String'}
		this.ControlSituacion					={type: 'String'}
		this.CampoSituacion						={type: 'String'}
		this.ControlSituacionFecha		={type: 'String'}
		this.CampoSituacionFecha			={type: 'String'}
		this.ControlSituacionUsuario	={type: 'String'}
		this.CampoSituacionUsuario		={type: 'String'}
		this.ControlSituacionNota			={type: 'String'}
		this.CampoSituacionNota				={type: 'String'}
		this.ControlTipo							={type: 'String'}
		this.CampoTipo								={type: 'String'}
		this.ControlCambios						={type: 'String'}
		this.CampoUltimoCambio				={type: 'String'}
		this.ControlUsuarioCambio			={type: 'String'}
		this.CampoUsuarioCambio				={type: 'String'}
		this.ControlPeriodos					={type: 'String'}
		this.CampoPeriodo							={type: 'String'}
		this.TipoPeriodo							={type: 'String'}
		this.ControlEjercicios				={type: 'String'}
		this.CampoEjercicio						={type: 'String'}
		this.ControlUsuarios					={type: 'String'}
		this.CampoUsuario							={type: 'String'}
		this.ControlEmpresas					={type: 'String'}
		this.CampoEmpresa							={type: 'String'}
		this.ControlProyectos					={type: 'String'}
		this.CampoProyecto						={type: 'String'}
		this.ControlNivelAcceso				={type: 'String'}
		this.CampoNivelAcceso					={type: 'String'}
		this.ControlAccesoEspecifico	={type: 'String'}
		this.TablaAccesoEspecifico		={type: 'String'}
		this.Niveles									={type: 'String'}
		this.CampoAcumulativa					={type: 'String'}
		this.ControlCuenta						={type: 'String'}
		this.CampoCuenta							={type: 'String'}
		this.ControlSubCuenta					={type: 'String'}
		this.CampoSubCuenta						={type: 'String'}
		this.ControlGrupo							={type: 'String'}
		this.CampoGrupo								={type: 'String'}
		this.ControlRenglonID					={type: 'String'}
		this.CampoRenglonID						={type: 'String'}
		this.ControlRenglonTipo				={type: 'String'}
		this.CampoRenglonTipo					={type: 'String'}
		
		
		this.ControlClase							={type: 'String'}//Agente.tbl,AgenteDetalle.tbl,AgenteI.tbl,Art.tbl,ArtI.tbl,CtaDinero.tbl,CtaDineroI.tbl,Cte.tbl,CteHist.tbl,CteI.tbl,Producto.tbl,Prospecto.tbl,Prov.tbl,ProvI.tbl,Socio.tbl,Agente.tbl,AgenteDetalle.tbl,AgenteI.tbl,Art.tbl,ArtI.tbl,ContParalelaPolizaContacto.tbl,CtaDinero.tbl,CtaDineroI.tbl,Cte.tbl,CteHist.tbl,CteI.tbl,eCommerceArt.tbl,Producto.tbl,Prospecto.tbl,Prov.tbl,ProvI.tbl,Socio.tbl,vic_Plano.tbl,AgenteAux.tbl,CteI.tbl
		this.CampoClase								={type: 'String'}//Agente.tbl,AgenteDetalle.tbl,AgenteI.tbl,Art.tbl,ArtI.tbl,CtaDinero.tbl,CtaDineroI.tbl,Cte.tbl,CteHist.tbl,CteI.tbl,Plantilla.tbl,Producto.tbl,Prospecto.tbl,Prov.tbl,ProvI.tbl,Socio.tbl,Agente.tbl,AgenteDetalle.tbl,AgenteI.tbl,Art.tbl,ArtI.tbl,ContParalelaPolizaContacto.tbl,CtaDinero.tbl,CtaDineroI.tbl,Cte.tbl,CteHist.tbl,CteI.tbl,eCommerceArt.tbl,Plantilla.tbl,Producto.tbl,Prospecto.tbl,Prov.tbl,ProvI.tbl,Socio.tbl,vic_Plano.tbl,AgenteAux.tbl,CteI.tbl
		this.ControlContratos					={}//Contrato.tbl
		this.CampoContrato						={}//Contrato.tbl
		this.CampoEquipo							={}//EquipoAgente
		this.CategoriaTabla						={}//ActivoF.tbl
		this.Descripcion							={}//ArtRenglon
	}
}

module.exports = Tabla
