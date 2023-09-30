// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

import { config, noteApi, folderApi } from 'joplin-api'

config.baseUrl = process.env.JOPLIN_URL
config.token = process.env.JOPLIN_TOKEN
const folders = await folderApi.list()
console.log("Folders:", folders)
const notes = await noteApi.list()
console.log("Notes:", notes)
