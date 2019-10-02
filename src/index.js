import app from './app';
import { createServer } from 'http';

const server = createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('Server listening on port', PORT));
