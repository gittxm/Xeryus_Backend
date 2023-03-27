const { db,db2} = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};



//////////
//login Number
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

    db.query(
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
    User.findByNombre = (user, result) => {

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
    db2.query(
        sql,
        [user],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )
}


    User.findByexten = (num, result) => {

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
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}
    User.findByextenD = (num, result) => {

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
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

    User.update = (user, result) => {

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
                console.log('Usuario actualisado:', user.id);
                result(null, user.id);
            }
        }
    )

}

    User.updateN = (user, result) => {

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
                console.log('Usuario actualisado:', user.id);
                result(null, user.id);
            }
        }
    )

}


User.consultid= (user, result) => {

    const sql = `
    Select c.Id, c.Nombre, c.MarcacionClave, c.MarcacionClaveSecundario
    From CategoriasMarcacion c, 
    CategoriaExtension ce Where ce.Categoria = c.Id And ce.Extension = ?
	
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
                console.log('Usuario actualisado:', user.id);
                result(null, user.id);
            }
        }
    )

}

User.restriccion=(user,result)=>{
    const sql = `
    Select p.Id, p.Prefijo, p.Patron, p.Prioridad, p.PrioridadCanales, g.Numero, g.Tipo, tg.Nombre, g.Alias, g.Contexto, g.ProveedorTelefonia, pt.Nombre From Permisos p, GruposTroncales g, TiposGruposTroncales tg, ProveedoresTelefonia pt 
     Where p.Categoria = ? 
    And g.Numero=p.NumeroGrupoTroncales And g.Tipo = p.TipoGrupoTroncales And g.Tipo = tg.Id And g.ProveedorTelefonia = pt.Id Order By Prioridad
    `;

    db2.query(
        sql,
        [user.Prefijo,
        user.id],
         (err, user) => {
            if (err) {
                console.log('no se encuentra la restriccion', err);
                result(err, null);
            }
            else {
                console.log('restriccion encontrada', user.id);
                result(null, user.id);
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

    db.query(
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
    User.INSERT_DESVIOS_EXTENSION=(num,res)=>{

    const sql = `
    INSERT INTO DesviosExtension
     (Extension, EstadoExtension, NumeroDestino, TipoDesvio) VALUES (?,?,?,?)
	
    `;

    db.query(
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

    User.DELETE_DESVIOS_EXTENSION=(num,res)=>
    {const sql = `
    DELETE FROM DesviosExtension WHERE Extension=?
	
    `;

    db.query(
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

    db.query(
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

    db.query(
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

    db.query(
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

    db.query(
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





