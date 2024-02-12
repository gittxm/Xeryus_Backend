const userController = require('../controller/userController');

module.exports = (app) =>{

    //Get => Obtener datos
    //Post-> almacenar datos
    //Put -> Actualisar datos
    //Delete -->Eliminar Datos

    
    
    
    app.put('/api/users/restriccion', userController.restriccion);
    app.post('/api/users/restriccion', userController.restriccion);
    app.post('/api/users/updateestados', userController.updateEstaRegistro)
    
    //activo
    
    app.put('/api/users/update', userController.update);
    app.put('/api/users/updateestados',userController.updateestados);
    app.post('/api/users/urls', userController.urls);
    app.post('/api/users/login', userController.login2);
    app.put('/api/users/updateN', userController.updateN);
    app.post('/api/users/create',userController.register);
    app.post('/api/users/selectall',userController.selectAll);
    app.post('/api/users/contratos', userController.contratos);
    app.post('/api/users/extension', userController.extension);
    app.post('/api/users/extensionD', userController.extensionD);
    app.post('/api/users/estados_select',userController.selectEstados);
}




    