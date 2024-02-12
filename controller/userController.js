const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const mysql = require('mysql');
const express = require('express');
//const createDataDbConnection =  require('../config/config');
const {x}= require('../config/config');
const createDataDbConnection = require('../config/config');





module.exports = {
    
login(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const numero = req.body.numero;

        User.findByEmail(email, async (err, myUser) => {
            
            console.log('Error ', err);
            console.log('USUARIO ', myUser);
            console.log('numeroooo',numero);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }
                
                return res.status(201).json({
                    
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            }
            else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El password es incorrecto'
                });
            }

        });

    },
    

urls(req,res){
    const urls = req.body.url;


    console.log("url123----"+urls)
    return res.status(200).json({
        success: true,
        url:urls,
        message: 'correcto url',
        
    });

},


extension(req, res){
    const urls = req.body.urls;
            //const numero = req.body.numero;
           var conect = createDataDbConnection({
                host: urls,
              });

    const id = req.body.id;
    User.findByexten(conect,id, async (err, myUser) => {
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la busqueda de el numero',
                error: err
            });
        }

        if (!myUser) {
            return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                success: false,
                message: 'El USUARIO no fue encontrado'
            });
        }
        else{

            const data = {
                numero: `${myUser.Numero}`,
                Usuario:   myUser.Usuario,
                alias:    myUser.UsuarioExtension
                //session_token: `JWT ${token}`
                    
                }   
            return res.status(201).json({
                success: true,
                message: 'El numero autentificacion fue correcto',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });
        }
    });

  
    },

  extensionD(req, res){
    const urls = req.body.urls;
    //const numero = req.body.numero;
   var conect = createDataDbConnection({
        host: urls,
      });
      
        const Extension = req.body.Extension;
        console.log('Extnsion:', Extension);
        console.log('urls:', urls);

        User.findByextenD(conect,Extension, async (err, myUser) => {
            if (err) {
                console.log('Error al buscar:', err);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de el numero',
                    error: err
                });
            }
    
            if (!myUser) {
                console.log('Usuario no encontrado:', err);
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El USUARIO no fue encontrado'
                });
            
            }
            else {
                const data = {
                    Extension: `${myUser.Extension}`,
                    Estado: myUser.Estado,
                    Nombre: myUser.Nombre,
                    NumeroTelefonico: myUser.NumeroTelefonico,
                    TipoNumeroTelefonico: myUser.TipoNumeroTelefonico,
                    Nombre: myUser.Nombre,
                    Activo: myUser.Activo,
            //session_token: `JWT ${token}`
            }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });
            }
        });
     }, 
   

login2(req, res) {

            const usuario = req.body.usuario;
             const password = req.body.password;
             const urls = req.body.urls;
           var conect = createDataDbConnection({
                host: urls,
              });

              

             User.findByNombre(conect,usuario, async (err, myUser) => {
                 
                 console.log('Error ', err);
                 console.log('USUARIO ', myUser);
     
                 if (err) {
                     return res.status(501).json({
                         success: false,
                         message: 'Hubo un error con la busqueda de el numero',
                         error: err
                     });
                 }
     
                 if (!myUser) {
                     return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                         success: false,
                         message: 'El USUARIO no fue encontrado'
                     });
                 }
      //se nesecita quitar la contraseña para validar la fecha de vensimiento 
                console.log(myUser.Password);
                console.log(password)
                // const isPasswordValid = await bcrypt.compare(password, myUser.Password);
     
                 if (password == myUser.Password) {
                     const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
     
                     const data = {
                     id:    `${myUser.Id}`,
                     nombre:   myUser.Nombre,
                     alias:    myUser.Alias,
                     password:    myUser.Password,
                  cuentaCorreo:    myUser.CuentaCorreo,
                    idioma:   `${myUser.Idioma}`,
                    session_token: `JWT ${token}`
                         
                     }
                    console.log(myUser.password)
                     return res.status(201).json({
                         success: true,
                         message: 'El usuario fue autenticado',
                         data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                     });
     
                 }
                 else if(res.status = 401){
                     return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                         success: false,
                         message: 'El password es incorrecto'
                     });
                 }
                 else {
                    return res.status(500).json({
                        success:false,
                        message:'Error servicio'
                    })
                 }
                 
                 
     
             });
     
         },


contratos(req, res) {
    

        const numero = req.body.num;
        //const fechaE = req.body.FechaExpiracion;
        
        
        const fecha1 = new Date;
        const fechas =Date.parse(fecha1);
        const  year= fechas.getFullYear;
        const month= fechas.getDate;
        const day= fechas.getDay;
        const fecha = year +'/'+month+'/'+day

       

        User.findByNumber(numero,async (err, myUser) => {
            
            console.log('Error findNumber', err);
            console.log('USUARIO ', myUser);
           // console.log('url',myUser.Url ?? "")
            //console.log('USUARIO ', myUser.FechaExpiracion);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la busqueda',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El num contrato no fue encontrado'
                });
            }

            //const isNumeroValid = await bcrypt.compare(numero, myUser.numero);
             const fechaE = Date.parse(myUser.FechaExpiracion);
            if (fechaE > fechas) {
                console.log('fecha de hoy', typeof fechas)
                console.log('fecha de la bdd', typeof fechaE)
                console.log('fecha de hoy', fechas)
                console.log('fecha de la bdd', fechaE)
                const token = jwt.sign({id: myUser.id, numero: myUser.numero}, keys.secretOrKey, {});

                const data = {
                    
                             id:myUser.Id,
                         numero:myUser.Numero,
                       producto:myUser.Producto,
                        cliente:myUser.Cliente,
                        horario:myUser.Horario,
                fechaExpiracion:myUser.FechaExpiracion,
                telefonoSoporte:myUser.TelefonoSoporte,
                       contacto:myUser.Contacto,
                           area:myUser.Area,
                  fechaRegistro:myUser.FechaRegistro,
              fechaModificacion:myUser.FechaModificacion,
                             Url:myUser.Url,

                    session_token: `JWT ${token}` }
                
              //  console.log('url201',myUser.Url)
          //   module.exports.createDataDbConnection =  createDataDbConnection({
            //    host: myUser.Url,
            //  });

              
        
              //console.log(createDataDbConnections)
            
             // console.log("STATUS BDD", dataDbConnection);
       
           
                //  dataDbConnection.connect();
                return res.status(201).json({
                    success: true,
                    message: 'Numero autentificado',
                    flag:x,
                    data: data ,

                    // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });
               

            }
            else if (res.status =401){
                console.log('Error ', myUser.FechaExpiracion);
                console.log('Error ', fechas);
                console.log('fecha de hoy', typeof fechas)
                console.log('fecha de la bdd', typeof fechaE)
                console.log('url',myUser.Url)
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'Fecha expirada',
                    message: fecha
                }

                );
                
            }
            else if(res.status = 500) {
             console.log('error 5000')
             return res.status(500).json({
                success: false,
                    message: 'Error en el server',
                    message: fecha
             })

            }
            

        });

        

    },

async getDbDetails(req, res) {

        const numero = req.body.num;
        //const fechaE = req.body.FechaExpiracion;

        User.findByNumber(numero,async (err, myUser) => {
            
            console.log('Error findNumber', err);
            console.log('USUARIO ', myUser);
            //console.log('USUARIO ', myUser.FechaExpiracion);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la busqueda',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El numero no fue encontrado'
                });
            }
            else{
                return new Promise((resolve, reject) => {
                    myUser.userfunction,function (error, results) {
                        if (error) {
                          reject(error);
                        }
                    
                        resolve(results[0]);
                    }
                   
                  });
            }

            
             //const fechaE = Date.parse(myUser.FechaExpiracion);
           

        });

    },
   
update(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        const urls = req.body.urls;
        console.log("urls:",urls)
        var conect = createDataDbConnection({
            host: urls,
          });
        User.update(conect,user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }
           const id = req.body.id;
        
         User.findByextenD(conect,id, (err,myData)=>{

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Se actualizo correctamente',
                data: myData// EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });
        })

        });

    },

 restriccion(req, res) {
        

        const user = req.body.Extension; 
        const urls = req.body.urls;
        console.log("urls:",urls)
        var conect = createDataDbConnection({
            host: urls,
          });// CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        console.log("22222",user) 
         //***/// */
         User.consultid(conect,user, (err, myData) => {
 
             if (err) {
                 return res.status(501).json({
                     success: false,
                     message: 'Hubo un error con la actualisacion del usuario',
                     error: err
                 });
             }
     
            else{
             const id = myData.Id;
             console.log(id)
                 const data = {
                    
                     Id: `${myData.id}`,
                     Nombre: myData.Nombre,
                     //session_token: `JWT ${token}`
                      }  
 
                 console.log("mi datas",myData.Id)
                 User.restriccion(conect,id, (err,myDatas)=>{
 
                     if (err) {
                         return res.status(501).json({
                             success: false,
                             message: 'Hubo un error busqueda prefijo',
                             error: err
                         });
                     }else{
                         const data2 = {
                    
                            Prefijo: `${myDatas.Prefijo}`,
                            
                             //session_token: `JWT ${token}`
                              }  
                              console.log("121",myDatas.Prefijo)
                              console.log(data2)
                     return res.status(201).json({
                         
                         success: true,
                         message: 'funciona oki',
                         data: data2// EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                     });}
                 })
            
            
             
         }
             
         })
 
     
 
     },
 

    ///////*********** */
 updateN(req, res) {
        const urls = req.body.urls;
        var conect = createDataDbConnection({
             host: urls,
           });

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.updateN(conect,user,(err,data) => {
      
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }
            const urls = req.body.urls;
            var conect = createDataDbConnection({
                host: urls,
              });
            User.findByextenD(conect,data,(err,data)=>{

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }

                return res.status(201).json({
                    success: true,
                    message: 'Se actualizo correctamente',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });


            })
            
           

        });

    }, 
            
            

register(req, res) {

        const user = req.body.EstadoExtension; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });

        });

    },  

   
    //saber que es el valor que tioene que recibir la consulta  
     updateEstaRegistro(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        const urls = req.body.urls;
        const ext = req.body.ext;
        const estado =req.body.estado;
        console.log("ext",ext);
        console.log("estado",estado)
        console.log("")
        //console.log("urls:",urls)
        var conect = createDataDbConnection({
            host: urls,
          });
        User.modificarEstado(conect,ext,(err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }
           const id = req.body;
        
         User.modificarEstado1(conect,id, (err,myData)=>{

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Se actualizo correctamente',
                data: myData// EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });
        })

        });

    },  
   
   //
   selectEstados(req, res) {

    const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
    const urls = req.body.urls;
    console.log("urls:",urls)
    var conect = createDataDbConnection({
        host: urls,
      });
    
    
     User.selectEstados(conect, (err,myData)=>{

        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualisacion del usuario',
                error: err
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Se actualizo correctamente',
            data: myData// EL ID DEL NUEVO USUARIO QUE SE REGISTRO
        });
    })


}, 

selectAll(req, res) {

    const  id = req.body.id; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
    const urls = req.body.urls;
    console.log("urls:",urls)
    var conect = createDataDbConnection({
        host: urls,
      });
    
     User.selectAll(conect,id, (err,myData)=>{

        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error No muestra Estados',
                error: err
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Estados Extencion',
            data: myData// EL ID DEL NUEVO USUARIO QUE SE REGISTRO
        });
    })


},

//Función para realizar la actualización 
updateestados(req, res){
        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        const urls = req.body.urls;
        const ext = req.body.Extension;
        const estado =req.body.Estado;
        console.log("ext",ext);
        console.log("estado",estado)
        console.log("")
        var conect = createDataDbConnection({
            host: urls,
          });
        User.updateestados1(conect,ext, estado, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }
            const id = req.body;
            const ext1 = req.body.Extension;
        const estado1 =req.body.Estado;
          User.updateestados(conect,ext1,estado1, (err,myData)=>{

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualisacion del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Se actualizo correctamente',
                data: myData// EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });
        })

        });

    }, 

}