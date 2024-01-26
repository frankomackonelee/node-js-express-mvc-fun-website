import { Router } from 'express';

const router = Router()

router.get('/', async (req, res) => res.render('index', {title: "My first website", p1: "This website uses ejs syntax to interpolate data into ejs files which create html pages"}))
router.get('/about', async (req, res) => res.render('about', {title: "About"}))
router.get('/contact', async (req, res) => res.render('contact', {title: "Contact"}))

router.post('/submit-form', (req, res) => {
    const { email, message } = req.body;
    
    // Process the data here (e.g., save to database, send an email, etc.)
    
    // Redirect or send a response after processing
    res.send('Form submitted successfully!');
});

export default router;