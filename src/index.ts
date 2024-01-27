import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Container } from 'typedi';
import indexRoutes from './routes/router.js'
import { IKeyCharacterRepository, IKeyCharacterRepositoryToken } from './infrastructure/interfaces/key-character-repository.js';
import { KeyCharacterMemoryRepository } from './infrastructure/repositories/key-character-memory-repo.js';

// Set up a DI container and register implementation...
Container.set(IKeyCharacterRepositoryToken, new KeyCharacterMemoryRepository());


const app = express();

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs');

// Middleware to parse the body of the POST request
// Must proceed route definitions
app.use(express.urlencoded({ extended: true }));

app.use( indexRoutes );

// To make public files available to the client ui
app.use(express.static(join(__dirname, 'public')))

const port = 3000;

app.listen(port);
console.log('Server is listening on port', port);