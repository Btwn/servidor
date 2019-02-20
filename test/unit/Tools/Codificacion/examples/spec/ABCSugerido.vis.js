module.exports = {
	"Vista": {
		"Icono": "0",
		"Clave": "ABCSugerido",
		"Nombre": "ABC Sugerido",
		"Modulos": ["(Todos)"],
		"Singular": "ABC Sugerido",
		"ListaTablas": [
			"ABCSugerido",
			"Art"
		],
		"UsoReportes": "S",
		"ListaCampos": [
			"ABCSugerido.Categoria",
			"ABCSugerido.Articulo",
			"ABCSugerido.ABC",
			"ABCSugerido.Cantidad",
			"ABCSugerido.Valor",
			"ABCSugerido.Participacion",
			"Art.Articulo",
			"Art.Descripcion1",
			"Art.Grupo",
			"Art.Categoria",
			"Art.Familia",
			"Art.ABC",
			"Art.Estatus",
			"Art.CostoEstandar",
			"Art.CostoReposicion"
		],
		"TablaPrincipal": "ABCSugerido",
		"ListaRelaciones": ["ABCSugerido.Art"],
		"UsarJOIN": "S",
		"SQL": [
			"SELECT",
			"  ABCSugerido.Categoria,",
			"  ABCSugerido.Articulo,",
			"  ABCSugerido.ABC,",
			"  ABCSugerido.Cantidad,",
			"  ABCSugerido.Valor,",
			"  ABCSugerido.Participacion,",
			"  Art.Articulo,",
			"  Art.Descripcion1,",
			"  Art.Grupo,",
			"  Art.Categoria,",
			"  Art.Familia,",
			"  Art.ABC,",
			"  Art.Estatus,",
			"  Art.CostoEstandar,",
			"  Art.CostoReposicion",
			"",
			"FROM",
			"  ABCSugerido",
			"  JOIN Art ON ABCSugerido.Articulo=Art.Articulo"
		]
	},
	"ABCSugerido.Categoria": {
		"Clave": "ABCSugerido.Categoria",
		"LigaTabla": "ABCSugerido",
		"LigaCampo": "Categoria",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "50",
		"ClaveBDE": "Categoria"
	},
	"ABCSugerido.Articulo": {
		"Clave": "ABCSugerido.Articulo",
		"LigaTabla": "ABCSugerido",
		"LigaCampo": "Articulo",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "20",
		"ClaveBDE": "Articulo"
	},
	"ABCSugerido.ABC": {
		"Clave": "ABCSugerido.ABC",
		"LigaTabla": "ABCSugerido",
		"LigaCampo": "ABC",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "1",
		"ClaveBDE": "ABC"
	},
	"ABCSugerido.Cantidad": {
		"Clave": "ABCSugerido.Cantidad",
		"LigaTabla": "ABCSugerido",
		"LigaCampo": "Cantidad",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "NumFlotante",
		"ClaveBDE": "Cantidad"
	},
	"ABCSugerido.Valor": {
		"Clave": "ABCSugerido.Valor",
		"LigaTabla": "ABCSugerido",
		"LigaCampo": "Valor",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "NumMonetario",
		"ClaveBDE": "Valor"
	},
	"ABCSugerido.Participacion": {
		"Clave": "ABCSugerido.Participacion",
		"LigaTabla": "ABCSugerido",
		"LigaCampo": "Participacion",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "NumFlotante",
		"ClaveBDE": "Participacion"
	},
	"Art.Articulo": {
		"Clave": "Art.Articulo",
		"LigaTabla": "Art",
		"LigaCampo": "Articulo",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "20",
		"ClaveBDE": "Articulo_1"
	},
	"Art.Descripcion1": {
		"Clave": "Art.Descripcion1",
		"LigaTabla": "Art",
		"LigaCampo": "Descripcion1",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "100",
		"ClaveBDE": "Descripcion1"
	},
	"Art.Grupo": {
		"Clave": "Art.Grupo",
		"LigaTabla": "Art",
		"LigaCampo": "Grupo",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "50",
		"ClaveBDE": "Grupo"
	},
	"Art.Categoria": {
		"Clave": "Art.Categoria",
		"LigaTabla": "Art",
		"LigaCampo": "Categoria",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "50",
		"ClaveBDE": "Categoria_1"
	},
	"Art.Familia": {
		"Clave": "Art.Familia",
		"LigaTabla": "Art",
		"LigaCampo": "Familia",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "50",
		"ClaveBDE": "Familia"
	},
	"Art.ABC": {
		"Clave": "Art.ABC",
		"LigaTabla": "Art",
		"LigaCampo": "ABC",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "1",
		"ClaveBDE": "ABC_1"
	},
	"Art.Estatus": {
		"Clave": "Art.Estatus",
		"LigaTabla": "Art",
		"LigaCampo": "Estatus",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "Texto",
		"Tamano": "15",
		"ClaveBDE": "Estatus"
	},
	"Art.CostoEstandar": {
		"Clave": "Art.CostoEstandar",
		"LigaTabla": "Art",
		"LigaCampo": "CostoEstandar",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "NumMonetario",
		"ClaveBDE": "CostoEstandar"
	},
	"Art.CostoReposicion": {
		"Clave": "Art.CostoReposicion",
		"LigaTabla": "Art",
		"LigaCampo": "CostoReposicion",
		"Ligado": "S",
		"TipoCampo": "Tabla",
		"TipoDatos": "NumMonetario",
		"ClaveBDE": "CostoReposicion"
	},
	"Relaciones.ABCSugerido.Art": {
		"Clave": "ABCSugerido.Art",
		"TablaRemota": "Art",
		"LlaveLocal": "ABCSugerido.Articulo",
		"LlaveRemota": "Articulo",
		"TipoRelacion": "Forzosa"
	}
}