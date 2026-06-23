import { io } from 'socket.io-client';

export function connectWS() {
    const isProduction = window.location.hostname.includes('onrender.com');
    
    // Using your actual live backend address
    const BACKEND_URL = isProduction 
        ? 'https://mini-webchat-app.onrender.com' 
        : 'http://localhost:4600';

    return io(BACKEND_URL);
}