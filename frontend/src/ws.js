import { io } from 'socket.io-client';

export function connectWS() {
    // Check if the current browser window is running on Render
    const isProduction = window.location.hostname.includes('onrender.com');
    
    // REPLACE 'your-backend-name' with your actual Render backend service URL name
    const BACKEND_URL = isProduction 
        ? 'https://your-backend-name.onrender.com' 
        : 'http://localhost:4600';

    return io(BACKEND_URL);
}