
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new  Bands();
console.log('init server');


bands.addBand(new Band('El guajiro'));
bands.addBand(new Band('polo'));
bands.addBand(new Band('colo '));
bands.addBand(new Band('solo'));

console.log(bands);
// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());

    


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
        client.broadcast.emit('hola', payload);
    });
    client.on('vote-band', (payload) => {
        
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    client.on('add-band', (payload) => {
        const newband = new Band(payload.name);
        bands.addBand(newband);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id);
         io.emit('active-bands', bands.getBands());
    
    });
});
