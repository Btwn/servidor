module.exports = {
		"Vista": {
			"Icono": "0",
			"Clave": "ABCSugerido",
			"Nombre": "ABC Sugerido",
			"Modulos": "(Todos)",
			"Singular": "ABC Sugerido",
			"ListaTablas": "(Lista)",
			"UsoReportes": "S",
			"ListaCampos": "(Lista)",
			"TablaPrincipal": "ABCSugerido",
			"ListaRelaciones": "ABCSugerido.Art",
			"UsarJOIN": "S",
			"SQL": "SELECT<BR>  ABCSugerido.Categoria,<BR>  ABCSugerido.Articulo,<BR>  ABCSugerido.ABC,<BR>  ABCSugerido.Cantidad,<BR>  ABCSugerido.Valor,<BR>  ABCSugerido.Participacion,<BR>  Art.Articulo,<BR>  Art.Descripcion1,<BR>  Art.Grupo,<BR>  Art.Categoria,<BR>  Art.Familia,<BR>  Art.ABC,<BR>  Art.Estatus,<BR>  Art.CostoEstandar,<BR>  Art.CostoReposicion<BR><BR>FROM<BR>  ABCSugerido<BR>  JOIN Art ON ABCSugerido.Articulo=Art.Articulo"
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
		},
		"Vista.ListaTablas": {
			"(Inicio)": "ABCSugerido",
			"ABCSugerido": "Art",
			"Art": "(Fin)"
		},
		"Vista.ListaCampos": {
			"(Inicio)": "ABCSugerido.Categoria",
			"ABCSugerido.Categoria": "ABCSugerido.Articulo",
			"ABCSugerido.Articulo": "ABCSugerido.ABC",
			"ABCSugerido.ABC": "ABCSugerido.Cantidad",
			"ABCSugerido.Cantidad": "ABCSugerido.Valor",
			"ABCSugerido.Valor": "ABCSugerido.Participacion",
			"ABCSugerido.Participacion": "Art.Articulo",
			"Art.Articulo": "Art.Descripcion1",
			"Art.Descripcion1": "Art.Grupo",
			"Art.Grupo": "Art.Categoria",
			"Art.Categoria": "Art.Familia",
			"Art.Familia": "Art.ABC",
			"Art.ABC": "Art.Estatus",
			"Art.Estatus": "Art.CostoEstandar",
			"Art.CostoEstandar": "Art.CostoReposicion",
			"Art.CostoReposicion": "(Fin)"
		}
	}