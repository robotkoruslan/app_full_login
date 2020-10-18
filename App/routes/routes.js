
module.exports = (app) => {
    const userConttoller = require('./UserController.js');

    app.post('/users', userConttoller.create);
    app.get('/users', userConttoller.findAll);
    app.get('/users/:userId', userConttoller.findOne);
    app.put('/users/:userId', userConttoller.update);
    app.delete('/users/:userId', userConttoller.delete);
    app.post('/useradd', userConttoller.createadd);
    app.put('/useradd/:userId', userConttoller.addFriends);

}