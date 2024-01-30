import express, { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { Container } from 'typedi';
import createError from 'http-errors';
import indexRoutes, { renderPageWithTitle } from './controllers/controllers'
import { IKeyCharacterRepositoryToken } from './infrastructure/interfaces/key-character-repository.js';
import { KeyCharacterMemoryRepository } from './infrastructure/repositories/key-character-memory-repo.js';

// Set up a DI container and register implementation...
Container.set(IKeyCharacterRepositoryToken, new KeyCharacterMemoryRepository());

import dotenv from 'dotenv';
import { KeyCharacterNotFoundError } from './errors/key-character-not-found-error';
import { NotAuthorisedError } from './errors/not-authorised-error';
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
app.use((err: unknown, req: Request, res: Response) => {
    // Set locals, only providing error in development
    const error = err as Error&{ status: number };

    res.locals.message = error.message;
    res.locals.error = process.env.ENVIRONMENT === 'development' ? err : {};

    if (err instanceof KeyCharacterNotFoundError) {

        // The browser does not navigate away from the requested url
        renderPageWithTitle(res.status(404), 'not-found', 'Not Found');

    } else if (err instanceof NotAuthorisedError) {

        // TODO: render view (maybe do redirect...)
        res.status(403).send("not authorised you naughty person");

    } if (error.status === 404) {

        // This handles the catchall case above, and leads to a 302 being sent back to client which the client follows
        // By doing this the browser navigates to /not-found
        res.redirect('/not-found');

    } else {

        res.status(500).send('Server Error');

    }

});

const port = 3000;

app.listen(port);

console.log('Server is listening on port', port);