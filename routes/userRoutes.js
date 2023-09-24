const usersController = require('../controllers/usersController');
const passport = require('passport')
module.exports = (app, upload) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', { session: false }), usersController.findDeliveryMen);
    app.get('/api/users/getAll', passport.authenticate('jwt', {session:false}),usersController.getAll);
 
    
    app.post('/api/users/create', usersController.register);
    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerWithImage);
    app.post('/api/users/createDeliveryWithImage', upload.array('image', 1), usersController.registerDeliveryWithImage);
    app.post('/api/users/login', usersController.login)


    app.put('/api/users/updateWithoutImage',passport.authenticate('jwt', {session:false}), usersController.updateWithoutImage);
    app.put('/api/users/update', passport.authenticate('jwt', {session:false}), upload.array('image', 1), usersController.updateWithImage);
    app.put('/api/users/updateNotificationToken', passport.authenticate('jwt', {session: false}), usersController.updateNotificationToken);

    app.delete('/api/users/delete/:id', passport.authenticate('jwt', {session: false}), usersController.delete);

} 
