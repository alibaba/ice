import io from 'socket.io-client';

const ioAddress = 'http://127.0.0.1:7001';
const ioParams = {

};

const socket = io(ioAddress, ioParams);

export default socket;

