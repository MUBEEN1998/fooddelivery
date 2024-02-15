import http from 'http';
import dotenv from 'dotenv';
import app from './index.js';

dotenv.config();

const PORT = process.env.PORT || 8080; // Default port is 8080 if PORT is not defined in .env

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
