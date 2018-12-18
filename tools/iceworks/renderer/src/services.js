import { remote } from 'electron';
const services = remote.getGlobal('services');

export default services;
