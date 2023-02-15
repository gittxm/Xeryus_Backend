const userController = require('../controller/userController');

module.exports = (app) =>{

    //Get => Obtener datos
    //Post-> almacenar datos
    //Put -> Actualisar datos
    //Delete -->Eliminar Datos

    app.post('/api/users/create',userController.register);
    app.post('/api/users/login', userController.login2);
    app.post('/api/users/extension', userController.extension);
    app.post('/api/users/extensionD', userController.extensionD);
    app.post('/api/users/contratos', userController.contratos);
    app.put('/api/users/update', userController.update);
    app.put('/api/users/updateN', userController.updateN);

    
}




    