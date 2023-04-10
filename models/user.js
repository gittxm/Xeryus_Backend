const { db} = require('../config/config');
//const {db2}= require('../config/config');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
//const db2 = require('');
//const { dataDbConnection } = require('../controller/userController.js');
 const y = require('../controller/userController.js');
const userController = require('../controller/userController.js');
const dbConnection = userController.getDataDbConnection;
const createDataDbConnection=require('../config/config')
const User = {};






//////////
//login Number Numero de contrato 
User.findByNumber = (num, result) => {

    const sql = `
    SELECT
    Id,
    Numero,
    Producto,
    Cliente,
    Horario,
    FechaExpiracion,
    TelefonoSoporte,
    Contacto,
    Area,
    FechaRegistro,
    FechaModificacion,
    Url
    FROM
        Contratos
    WHERE
        Numero = ?
    `;
   
   //console.log('value DB2 ..',db2)
    db.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
               //console.log("ubases de datos",createDataDbConnection)
            
                result(null, user[0]);
            }
        }
    )

}
    
User.findByNombre = (db2,user, result) => {

    const sql = `
    SELECT
        Id,
        Nombre,
        Alias,
        Password,
        CuentaCorreo,
        Idioma
        FROM
        UsuariosExtension
    WHERE
        Alias = ?
    `;
    //console.log('value y:' ,y);
    //console.log('aqui' + DB2)
    db2.query(
        sql,
        [user],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido1:', user[0]);
                result(null, user[0]);
            }
        }
    )
}


User.findByexten = (db2,num, result) => {

    const sql = `
    SELECT Numero,Usuario,UsuarioExtension
        FROM Extensiones 
            INNER JOIN DesviosExtension 
            ON Extensiones.Numero = DesviosExtension.Extension
            INNER JOIN UsuariosExtension
            ON UsuariosExtension.id = Extensiones.UsuarioExtension
            where UsuariosExtension.id = ?
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido2:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.findByextenD = (db2,num, result) => {

    const sql = `
    SELECT Extension,EstadoExtension,NumeroDestino,TipoDesvio
        FROM DesviosExtension 
            INNER JOIN Extensiones 
            ON Extensiones.Numero = DesviosExtension.Extension
            INNER JOIN UsuariosExtension
            ON UsuariosExtension.id = Extensiones.UsuarioExtension
            where UsuariosExtension.id = ?
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido3:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.update = (db2,user, result) => {

    const sql = `
    UPDATE DesviosExtension
        INNER JOIN Extensiones
            ON   Extensiones.Numero  = DesviosExtension.Extension
            INNER JOIN UsuariosExtension
            ON UsuariosExtension.id = Extensiones.UsuarioExtension
			SET DesviosExtension.EstadoExtension = ?
            where UsuariosExtension.id = ?
	
    `;

    db2.query(
        sql,
        [user.EstadoExtension,
        user.id],
         (err, user) => {
            if (err) {
                console.log('Error 2:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualisado 1:', user.id);
                result(null, user.id);
            }
        }
    )

}

User.updateN = (db2,user, result) => {

    const sql = `
    UPDATE DesviosExtension
        INNER JOIN Extensiones
            ON   Extensiones.Numero  = DesviosExtension.Extension
            INNER JOIN UsuariosExtension
            ON UsuariosExtension.id = Extensiones.UsuarioExtension
			SET DesviosExtension.NumeroDestino = ?
            where UsuariosExtension.id = ?
	
    `;

    db2.query(
        sql,
        [user.NumeroDestino,
        user.id],
         (err, user) => {
            if (err) {
                console.log('Error al actualisar:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualisado2:', user.id);
                result(null, user.id);
            }
        }
    )

}


User.consultid= (db2,user, result) => {

    const sql = `
    Select c.Id, c.Nombre, c.MarcacionClave, c.MarcacionClaveSecundario
    From CategoriasMarcacion c, 
    CategoriaExtension ce Where ce.Categoria = c.Id And ce.Extension = ?
	
    `;

    db2.query(
        sql,
        [user],
         (err, user) => {
            if (err) {
                console.log('IDerror:', err);
                result(err, null);
            }
            else {
                console.log('idok:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.restriccion=(db2,id,result)=>{
    const sql = `
    Select Prefijo, Patron, Prioridad, PuertoGatewaySIP, p.Alias, p.Extension, DTMF, d.Descripcion, Contexto, p.GatewaySIP, p.Autentificacion, p.Tipo, t.Descripcion, p.NumeroCanales, g.Alias, DireccionIP, g.Descripcion, g.Tipo, tg.Descripcion, p.ProveedorTelefonia, pt.Nombre, p.DID From Permisos, PuertosGatewaySIP p, TiposPuertoGatewaySIP t, GatewaysSIP g, TiposGatewaySIP tg, DTMFs d, ProveedoresTelefonia pt 
    Where Categoria = ?
     And DTMF = d.Id And p.GatewaySIP=g.Id And PuertoGatewaySIP = p.Id And p.Tipo = t.Id And g.Tipo = tg.Id And p.ProveedorTelefonia = pt.Id Order By Prioridad
    `;
//onsole.log("prefijo",id.Prefijo)
    db2.query(
        sql,
        [id],
         (err, id) => {
            if (err) {
                console.log('no se encuentra la restriccion', err);
                result(err, null);
            }
            else {
                console.log('restriccion encontrada', id[0]);
                result(null, id[0]);
            }
        }
    )



}










    User.select_desvios_ext=(num,res) =>{
    const sql = `
    "SELECT d.Extension
    , d.EstadoExtension,
     e.Nombre,
      d.NumeroDestino,
       d.TipoDesvio,
        t.Nombre 
        FROM 
        DesviosExtension d,
         EstadosExtension e,
          TiposDesvio t WHERE d.EstadoExtension = e.Id And d.TipoDesvio = t.Id And d.Extension=? Order By d.EstadoExtension"
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido4:', user[0]);
                result(null, user[0]);
            }
        }
    )


}
    User.INSERT_DESVIOS_EXTENSION=(num,res)=>{

    const sql = `
    INSERT INTO DesviosExtension
     (Extension, EstadoExtension, NumeroDestino, TipoDesvio) VALUES (?,?,?,?)
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido5:', user[0]);
                result(null, user[0]);
            }
        }
    )
    
}

    User.DELETE_DESVIOS_EXTENSION=(num,res)=>
    {const sql = `
    DELETE FROM DesviosExtension WHERE Extension=?
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    ) 

    }

    User.SELECT_ESTADOS_EXTENSION=(num,res)=>
    {const sql = `
    Select Id, Nombre From EstadosExtension Order By Id
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    ) 

    }    
    User.SELECT_TIPOS_DESVIO=(num,res)=>{
        const sql = `
        Select Id, Nombre From TiposDesvio Order By Id
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    ) 
        
    }


    User.SELECT_TIPO_DESVIO_NUMERO_DESTINO=(num,res)=>{
        const sql = `
        SELECT '"+TipoDesvio.EXTENSION+"'
         from Extensiones where Numero=? union select '"+
         TipoDesvio.BUZON_CORREO_VOZ+"' from Buzones where
          Numero=? union select '"+TipoDesvio.MARCACION_RAPIDA+"' 
          from MarcacionesRapidas where NumeroCorto=? union select '"+
          TipoDesvio.GRUPO_BUSQUEDA+"' from GruposDeBusqueda where Extension=?
	
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    ) 
        
    }
    
    User.SELECT_DESVIOS_TIPO_EXTENSION=(num,res)=>{
        const sql = `
        Select DISTINCT NumeroDestino From DesviosExtension Where Extension=? And TipoDesvio= 2
    `;

    db2.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    ) 
        
    }
   





module.exports = User;





