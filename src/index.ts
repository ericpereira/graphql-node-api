import * as http from 'http'
require('dotenv').config()

import app from './app'
import { normalizePort, onError, onListening } from './utils/utils'

const server = http.createServer(app)
const port = normalizePort(process.env.port || 3333)

server.listen(port)
server.on('error', onError(server))
server.on('listening', onListening(server))