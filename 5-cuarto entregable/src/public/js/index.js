const socketClient = io();
socketClient.on('saludoDesdeBack', (msg) => {
    console.log(msg);
})