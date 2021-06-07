const { io } = require('../index');

//socket messages
io.on('connection', client => {

    console.log('Connected client');
// client.on es para escuchar un mensaje de un usuario
//y client.emit es para emitir un mensaje a un solo usuario
// io.emit emite un mensaje a todos los usuarios conectados
    client.on('disconnect', ()=> {

        console.log('Disconected client');
    });

    client.on('message', ( payload )=> {

        console.log('Message.!!!', payload);

        io.emit('message', {admin: 'nuevo mensaje'});
    });

});