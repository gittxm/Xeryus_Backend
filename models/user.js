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




module.exports = User;





