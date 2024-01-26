console.log('Hello world')
// const express = require('express');
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

import indexRoutes from './routes/router.js'

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(join(__dirname, 'views'));

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