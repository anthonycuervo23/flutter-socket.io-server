const Client = require('socket.io/lib/client');
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ));
bands.addBand( new Band( 'Heroes del Silencio' ));
bands.addBand( new Band( 'Bon Jovi' ));
bands.addBand( new Band( 'Metallica' ));

// console.log(bands);

//socket messages
io.on('connection', client => {

    console.log('Connected client');

    client.emit('current-bands', bands.getBands());
// client.on es para escuchar un mensaje de un usuario
//y client.emit es para emitir un mensaje a un solo usuario
// io.emit emite un mensaje a todos los usuarios conectados
//client.broadcast.emit //emite a todos menos al que esta enviando
    client.on('disconnect', ()=> {

        console.log('Disconected client');
    });

    client.on('message', ( payload )=> {

        console.log('Message.!!!', payload);

        io.emit('message', {admin: 'nuevo mensaje'});
    });

    client.on('vote-band', ( payload )=>{
        bands.voteBand(payload.id);
        io.emit('current-bands', bands.getBands());
    });

    client.on('add-band', ( payload )=>{
        bands.addBand(new Band(payload.name));
        io.emit('current-bands', bands.getBands());
    });

    client.on('delete-band', ( payload )=>{
        bands.deleteBand(payload.id);
        io.emit('current-bands', bands.getBands());
    });

});