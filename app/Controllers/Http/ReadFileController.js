'use strict'
const path = require('path')
const Env = use('Env')
const { leerArchivo } = require('../../Tools/FileSystem/procesadorArchivos')
const { decode,unifica } = require('../../Tools/Codificacion/decode')
const { PathNombreToMavi } = require('../../Tools/Path/nomenclaturaMavi')
const { listarArchivos } = require('../../Tools/Path/listarArchivos')
const rgx = require('../../Tools/RegEx/jsonRgx')
const { unirCamposConsecutivosComponente } = require('../../Tools/OperarCadenas/unirConsecutivoPorComponente')
const { extraerContenidoRecodificado } = require('../../Tools/Codificacion/contenidoRecodificado')

class ReadFileController {
	async index ({ request }) {
		let resultado = {}
		let archivo = request.body.nombre
		console.log('algo')
		if(request.body.orig5000){
			let texto = leerArchivo(path.join(Env.get('5000_ORIG'),archivo))
			let deco = decode(texto,path.join(Env.get('5000_ORIG')))
			resultado.orig5000 = deco
			console.log('orig5000')
		}
		if(request.body.repo5000){
			let texto = leerArchivo(path.join(Env.get('5000_REPO'),archivo))
			let deco = decode(texto,path.join(Env.get('5000_REPO')))
			resultado.repo5000 = deco
			console.log('repo5000')
		}
		if(request.body.espe5000){
			let texto = leerArchivo(path.join(Env.get('5000_REPO'),PathNombreToMavi(archivo)))
			let deco = decode(texto,path.join(Env.get('5000_REPO')))
			resultado.espe5000 = deco
			console.log('espe5000')
		}
		if(request.body.orig3100){
			let texto = leerArchivo(path.join(Env.get('3100_ORIG'),archivo))
			texto = rgx.Expresiones.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(fileContent)).replace(/&/g, '') +'\n'
			let deco = decode(texto,path.join(Env.get('3100_ORIG')))
			resultado.orig3100 = deco
			console.log('orig3100')
		}
		if(request.body.repo3100){
			//let texto = leerArchivo(path.join(Env.get('3100_REPO'),archivo))
			let a = path.join(Env.get('3100_REPO'),archivo)
			console.log(a)
			let texto = rgx.Expresiones.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(path.join(Env.get('3100_REPO'),archivo))).replace(/&/g, '') +'\n'
			let deco = decode(texto,path.join(Env.get('3100_REPO')))
			let une = unifica()
			resultado.repo3100 = deco
			console.log('repo3100')
		}
		if(request.body.espe3100){
			let texto = leerArchivo(path.join(Env.get('3100_REPO'),PathNombreToMavi(archivo)))
			let deco = decode(texto,path.join(Env.get('3100_REPO')))
			resultado.espe3100 = deco
			console.log('espe3100')
		}
		return resultado
	}

	async name ({ request }) {
		let name = request.params.name
		let ext = path.extname(name)
		let nameExt = PathNombreToMavi(name)
		var resultado =  {
			"orig5000": {
					"Forma": {
							"Clave": "AccesoExpirado",
							"Nombre": "Su Contraseña Expiró, Favor de Cambiarla",
							"Icono": "0",
							"Modulos": "(Todos)",
							"ListaCarpetas": "Ficha",
							"CarpetaPrincipal": "Ficha",
							"PosicionInicialIzquierda": "710",
							"PosicionInicialArriba": "515",
							"PosicionInicialAltura": "159",
							"PosicionInicialAncho": "500",
							"VentanaTipoMarco": "Diálogo",
							"VentanaPosicionInicial": "Centrado",
							"AccionesTamanoBoton": "15x5",
							"AccionesDerecha": "S",
							"ListaAcciones": "Aceptar",
							"BarraAcciones": "S",
							"AccionesDivision": "S",
							"VentanaSinIconosMarco": "S",
							"PosicionInicialAlturaCliente": "133"
					},
					"Ficha": {
							"Estilo": "Ficha",
							"Clave": "Ficha",
							"PermiteEditar": "S",
							"AlineacionAutomatica": "S",
							"AcomodarTexto": "S",
							"MostrarConteoRegistros": "S",
							"Zona": "A1",
							"Vista": "Usuario",
							"Fuente": "{Tahoma, 8, Negro, []}",
							"FichaEspacioEntreLineas": "6",
							"FichaEspacioNombres": "100",
							"FichaEspacioNombresAuto": "S",
							"FichaNombres": "Izquierda",
							"FichaAlineacion": "Izquierda",
							"FichaColorFondo": "Plata",
							"FichaAlineacionDerecha": "S",
							"CampoColorLetras": "Negro",
							"CampoColorFondo": "Plata",
							"ListaEnCaptura": "(Lista)",
							"CarpetaVisible": "S",
							"Filtros": "S",
							"FiltroPredefinido": "S",
							"FiltroNullNombre": "(sin clasificar)",
							"FiltroEnOrden": "S",
							"FiltroTodoNombre": "Todo",
							"FiltroAncho": "20",
							"FiltroRespetar": "S",
							"FiltroTipo": "General",
							"FiltroGeneral": "Usuario.Usuario=<T>{Usuario}<T>"
					},
					"Ficha.Usuario.Usuario": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.Usuario",
							"LineaNueva": "S",
							"ValidaNombre": "S",
							"3D": "S",
							"Tamano": "15",
							"ColorFondo": "Plata",
							"ColorFuente": "Negro",
							"Efectos": "[Negritas]"
					},
					"Ficha.Usuario.Nombre": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.Nombre",
							"ValidaNombre": "N",
							"3D": "S",
							"Tamano": "40",
							"ColorFondo": "Plata",
							"ColorFuente": "Negro",
							"Efectos": "[Negritas]"
					},
					"Ficha.Usuario.Contrasena": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.Contrasena",
							"Editar": "S",
							"LineaNueva": "S",
							"ValidaNombre": "S",
							"3D": "S",
							"Tamano": "15",
							"ColorFondo": "Blanco",
							"ColorFuente": "Negro"
					},
					"Ficha.Usuario.ContrasenaConfirmacion": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.ContrasenaConfirmacion",
							"Editar": "S",
							"LineaNueva": "S",
							"ValidaNombre": "S",
							"3D": "S",
							"Tamano": "15",
							"ColorFondo": "Blanco",
							"ColorFuente": "Negro"
					},
					"Acciones.Aceptar": {
							"Nombre": "Aceptar",
							"Boton": "3",
							"NombreEnBoton": "S",
							"NombreDesplegar": "&Aceptar",
							"GuardarAntes": "S",
							"TipoAccion": "Ventana",
							"ClaveAccion": "Aceptar",
							"Activo": "S",
							"Visible": "S",
							"EnBarraAcciones": "S",
							"ConCondicion": "S",
							"EjecucionConError": "S",
							"Antes": "S",
							"EjecucionCondicion": "(MD5(Usuario:Usuario.Contrasena, <T>p<T>)<>Usuario.Contrasena) y (Usuario:Usuario.Contrasena<>Usuario.Contrasena)",
							"EjecucionMensaje": "<T>Es Necesario que Cambie su Contraseña<T>",
							"AntesExpresiones": "Si<BR>  ContrasenaCorrecta(Usuario:Usuario.Contrasena, Usuario:Usuario.ContrasenaConfirmacion)<BR>Entonces<BR>  Asigna(Usuario:Usuario.Contrasena, MD5(Usuario:Usuario.Contrasena, <T>p<T>))<BR>  Asigna(Usuario:Usuario.ContrasenaConfirmacion, MD5(Usuario:Usuario.ContrasenaConfirmacion, <T>p<T>))<BR>  Asigna(Usuario:Usuario.ContrasenaModificar, Falso)<BR>Sino<BR>  ContrasenaValidaError<BR>  AbortarOperacion<BR>Fin"
					},
					"Acciones.Cancelar.Cancelar": {
							"Nombre": "Cancelar",
							"Boton": "0",
							"TipoAccion": "Ventana",
							"ClaveAccion": "Cancelar",
							"Activo": "S",
							"Visible": "S"
					},
					"Acciones.Cancelar.Cambios": {
							"Nombre": "Cambios",
							"Boton": "0",
							"TipoAccion": "Controles Captura",
							"ClaveAccion": "Cancelar Cambios",
							"Activo": "S",
							"Visible": "S"
					},
					"Ficha.ListaEnCaptura": {
							"(Inicio)": "Usuario.Usuario",
							"Usuario.Usuario": "Usuario.Nombre",
							"Usuario.Nombre": "Usuario.Contrasena",
							"Usuario.Contrasena": "Usuario.ContrasenaConfirmacion",
							"Usuario.ContrasenaConfirmacion": "(Fin)"
					}
			},
			"orig3100": {
					"Forma": {
							"Clave": "AccesoExpirado",
							"Nombre": "Su Contraseña Expiró, Favor de Cambiarla",
							"Icono": "0",
							"Modulos": "(Todos)",
							"ListaCarpetas": "Ficha",
							"CarpetaPrincipal": "Ficha",
							"PosicionInicialIzquierda": "710",
							"PosicionInicialArriba": "515",
							"PosicionInicialAltura": "159",
							"PosicionInicialAncho": "500",
							"VentanaTipoMarco": "Diálogo",
							"VentanaPosicionInicial": "Centrado",
							"AccionesTamanoBoton": "15x5",
							"AccionesDerecha": "S",
							"ListaAcciones": "Aceptar",
							"BarraAcciones": "S",
							"AccionesDivision": "S",
							"VentanaSinIconosMarco": "S",
							"PosicionInicialAlturaCliente": "133"
					},
					"Ficha": {
							"Estilo": "Ficha",
							"Clave": "Ficha",
							"PermiteEditar": "S",
							"AlineacionAutomatica": "S",
							"AcomodarTexto": "S",
							"MostrarConteoRegistros": "S",
							"Zona": "A1",
							"Vista": "Usuario",
							"Fuente": "{Tahoma, 8, Negro, []}",
							"FichaEspacioEntreLineas": "6",
							"FichaEspacioNombres": "100",
							"FichaEspacioNombresAuto": "S",
							"FichaNombres": "Izquierda",
							"FichaAlineacion": "Izquierda",
							"FichaColorFondo": "Plata",
							"FichaAlineacionDerecha": "S",
							"CampoColorLetras": "Negro",
							"CampoColorFondo": "Plata",
							"ListaEnCaptura": "Usuario.Usuario<BR>Usuario.Nombre<BR>Usuario.Contrasena<BR>Usuario.ContrasenaConfirmacion",
							"CarpetaVisible": "S",
							"Filtros": "S",
							"FiltroPredefinido": "S",
							"FiltroNullNombre": "(sin clasificar)",
							"FiltroEnOrden": "S",
							"FiltroTodoNombre": "Todo",
							"FiltroAncho": "20",
							"FiltroRespetar": "S",
							"FiltroTipo": "General",
							"FiltroGeneral": "Usuario.Usuario=<T>{Usuario}<T>"
					},
					"Ficha.Usuario.Usuario": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.Usuario",
							"LineaNueva": "S",
							"ValidaNombre": "S",
							"3D": "S",
							"Tamano": "15",
							"ColorFondo": "Plata",
							"ColorFuente": "Negro",
							"Efectos": "[Negritas]"
					},
					"Ficha.Usuario.Nombre": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.Nombre",
							"ValidaNombre": "N",
							"3D": "S",
							"Tamano": "40",
							"ColorFondo": "Plata",
							"ColorFuente": "Negro",
							"Efectos": "[Negritas]"
					},
					"Ficha.Usuario.Contrasena": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.Contrasena",
							"Editar": "S",
							"LineaNueva": "S",
							"ValidaNombre": "S",
							"3D": "S",
							"Tamano": "15",
							"ColorFondo": "Blanco",
							"ColorFuente": "Negro"
					},
					"Ficha.Usuario.ContrasenaConfirmacion": {
							"Carpeta": "Ficha",
							"Clave": "Usuario.ContrasenaConfirmacion",
							"Editar": "S",
							"LineaNueva": "S",
							"ValidaNombre": "S",
							"3D": "S",
							"Tamano": "15",
							"ColorFondo": "Blanco",
							"ColorFuente": "Negro"
					},
					"Acciones.Aceptar": {
							"Nombre": "Aceptar",
							"Boton": "3",
							"NombreEnBoton": "S",
							"NombreDesplegar": "&Aceptar",
							"GuardarAntes": "S",
							"TipoAccion": "Ventana",
							"ClaveAccion": "Aceptar",
							"Activo": "S",
							"Visible": "S",
							"EnBarraAcciones": "S",
							"ConCondicion": "S",
							"EjecucionConError": "S",
							"EjecucionCondicion": "Usuario:Usuario.Contrasena<>Usuario.Contrasena",
							"EjecucionMensaje": "<T>Es Necesario que Cambie su Contraseña<T>",
							"Antes": "S",
							"AntesExpresiones": "Si<BR>  ContrasenaCorrecta(Usuario:Usuario.Contrasena, Usuario:Usuario.ContrasenaConfirmacion)<BR>Entonces<BR>  Asigna(Usuario:Usuario.Contrasena, MD5(Usuario:Usuario.Contrasena))<BR>  Asigna(Usuario:Usuario.ContrasenaConfirmacion, MD5(Usuario:Usuario.ContrasenaConfirmacion))<BR>Sino<BR>  Error(<T>Contraseña Incorrecta<T>)<BR>  AbortarOperacion<BR>Fin"
					},
					"Acciones.Cancelar.Cancelar": {
							"Nombre": "Cancelar",
							"Boton": "0",
							"TipoAccion": "Ventana",
							"ClaveAccion": "Cancelar",
							"Activo": "S",
							"Visible": "S"
					},
					"Acciones.Cancelar.Cambios": {
							"Nombre": "Cambios",
							"Boton": "0",
							"TipoAccion": "Controles Captura",
							"ClaveAccion": "Cancelar Cambios",
							"Activo": "S",
							"Visible": "S"
					}
			},
			"espe3100": {
					"AccesoExpirado.frm/Forma": {
							"ExpresionesAlMostrar": "SI SQL(<T>SELECT count(*) FROM USUARIO U<BR>    INNER JOIN TABLASTD TB ON TB.NOMBRE = U.ACCESO<BR>WHERE usuario =:tUsu<BR>    AND TB.TablaSt =:tTb<T>,USUARIO,<T>OMITIR CAMBIO DE CONTRASEÑA<T>)=1<BR>ENTONCES<BR>    ABORTAROPERACION<BR>FIN"
					},
					"AccesoExpirado.frm/Acciones.Aceptar": {
							"EjecucionCondicion": "SI SQL(<T> SELECT dbo.fn_DM0187ValidaContrasena(<T>+COMILLAS(USuario:Usuario.Contrasena)+<T>) <T>) = 1<BR>    ENTONCES<BR>       INFORMACION(<T>Tu contraseña debe tener Numeros y Letras<T>)<BR>       FALSO<BR>    SINO<BR>       SI SQL(<T> SELECT dbo.fn_DM0187ValidaContrasena(<T>+COMILLAS(USuario:Usuario.Contrasena)+<T>) <T>) = 3<BR>          ENTONCES<BR>            INFORMACION(<T>La Longitud debe ser mayor a 6 Caracteres<T>)<BR>            FALSO<BR>          SINO<BR>             SI SQL(<T> SELECT dbo.fn_DM0187ContrasenaInsegura(<T>+COMILLAS(Usuario:Usuario.Contrasena)+<T>) <T>) = 1<BR>                ENTONCES<BR>                  INFORMACION(<T>Contraseña Insegura,Intenta con Otra contraseña.<T>)<BR>                  FALSO<BR>             SINO<BR>                Asigna(Info.Contrasena,MD5(<CONTINUA>",
							"EjecucionCondicion002": "<CONTINUA>Usuario:Usuario.Contrasena))<BR>                   SI sql(<T>select Contrasena from usuario where Usuario =:tUsu<T>,Usuario:Usuario.Usuario) = Info.Contrasena<BR>                      ENTONCES<BR>                         ERROR(<T>Tu contraseña debe ser diferente a la Anterior<T>)<BR>                         FALSO<BR>                      SINO<BR>                         SI Usuario:Usuario.Contrasena <> Usuario.Contrasena<BR>                            ENTONCES<BR>                              VERDADERO<BR>                            SINO<BR>                               ERROR(<T>Es necesario que Cambie su Contraseña<T>)<BR>                               FALSO<BR>                            FIN<BR>                     FIN<BR>              FIN<BR>       FIN<BR>FIN",
							"EjecucionMensaje": ""
					}
			}
		}

		let rutas = {}
		rutas.orig5000 = listarArchivos(Env.get('5000_ORIG'),ext).filter(item => [name].indexOf(item) > -1).join('')
		rutas.repo5000 = listarArchivos(Env.get('5000_REPO'),ext).filter(item => [name].indexOf(item) > -1).join('')
		rutas.espe5000 = listarArchivos(Env.get('5000_REPO'),'.esp').filter(item => [nameExt].indexOf(item) > -1).join('')
		rutas.orig3100 = listarArchivos(Env.get('3100_ORIG'),ext).filter(item => [name].indexOf(item) > -1).join('')
		rutas.repo3100 = listarArchivos(Env.get('3100_REPO'),ext).filter(item => [name].indexOf(item) > -1).join('')
		rutas.espe3100 = listarArchivos(Env.get('3100_REPO'),'.esp').filter(item => [nameExt].indexOf(item) > -1).join('')

		rutas.orig5000 = rutas.orig5000.length > 0 ? path.join(Env.get('5000_ORIG'),name) : false
		rutas.repo5000 = rutas.repo5000.length > 0 ? path.join(Env.get('5000_REPO'),name) : false
		rutas.espe5000 = rutas.espe5000.length > 0 ? path.join(Env.get('5000_REPO'),nameExt) : false
		rutas.orig3100 = rutas.orig3100.length > 0 ? path.join(Env.get('3100_ORIG'),name) : false
		rutas.repo3100 = rutas.repo3100.length > 0 ? path.join(Env.get('3100_REPO'),name) : false
		rutas.espe3100 = rutas.espe3100.length > 0 ? path.join(Env.get('3100_REPO'),nameExt) : false

		// if(rutas.orig5000) rutas.orig5000 = decode(leerArchivo(rutas.orig5000))
		// if(rutas.repo5000) rutas.repo5000 = decode(leerArchivo(rutas.repo5000))
		// if(rutas.espe5000) rutas.espe5000 = decode(leerArchivo(rutas.espe5000))
		// if(rutas.orig3100) rutas.orig3100 = decode(leerArchivo(rutas.orig3100))
		// if(rutas.repo3100) rutas.repo3100 = decode(leerArchivo(rutas.repo3100))
		// if(rutas.espe3100) rutas.espe3100 = decode(leerArchivo(rutas.espe3100))

		if(rutas.orig5000) rutas.orig5000 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.orig5000))).replace(/&/g, '') +'\n')
		if(rutas.repo5000) rutas.repo5000 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.repo5000))).replace(/&/g, '') +'\n')
		if(rutas.espe5000) rutas.espe5000 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.espe5000))).replace(/&/g, '') +'\n')
		if(rutas.orig3100) rutas.orig3100 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.orig3100))).replace(/&/g, '') +'\n')
		if(rutas.repo3100) rutas.repo3100 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.repo3100))).replace(/&/g, '') +'\n')
		if(rutas.espe3100) rutas.espe3100 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.espe3100))).replace(/&/g, '') +'\n')

		return rutas
	}
}

module.exports = ReadFileController
