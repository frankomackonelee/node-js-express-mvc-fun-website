import express, { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { Container } from 'typedi';
import createError from 'http-errors';
import indexRoutes from './routes/router.js'
import { IKeyCharacterRepository, IKeyCharacterRepositoryToken } from './infrastructure/interfaces/key-character-repository.js';
import { KeyCharacterMemoryRepository } from './infrastructure/repositories/key-character-memory-repo.js';

// Set up a DI container and register implementation...
Container.set(IKeyCharacterRepositoryToken, new KeyCharacterMemoryRepository());

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.ENVIRONMENT);

const app = express();

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs');

// Middleware to parse the body of the POST request
// Must proceed route definitions
app.use(express.urlencoded({ extended: true }));

app.use( indexRoutes );

// To make public files available to the client ui
app.use(express.static(join(__dirname, 'public')))

// Catch-all middleware this is a fall through to create 404 Not Found if unmatched
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

// Error handling middleware
// Initially this is just used to manage unmatched url requests
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.ENVIRONMENT === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);

    if (err.status === 404) {
        res.redirect('/not-found');
    } else {
        res.send('Error');
    }
});

const port = 3000;

app.listen(port);

console.log('Server is listening on port', port);