import { Router } from 'express';
import { IKeyCharacter } from '../models/KeyCharacter';

const router = Router()

router.get('/', async (req, res) => res.render('index', {title: "My first website", p1: "This website uses ejs syntax to interpolate data into ejs files which create html pages"}))
router.get('/about', async (req, res) => res.render('about', {title: "About"}))

const story: IKeyCharacter = {
    location: "Penzance",
    firstName: "Francis",
    lastName: "Malone-Lee",
    age: 43,
    description: "father of 2"
}

router.get('/create-story', async (req, res) => res.render('create-story', {title: "Create Story"}))
router.get('/example', async (req, res) => res.render('story', story))

router.post('/submit-form', (req, res) => {
    const body = req.body;
    
    // Process the data here (e.g., save to database, send an email, etc.)
    
    // Redirect or send a response after processing
    res.render('story')
});

export default router;