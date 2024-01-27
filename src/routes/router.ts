import { Router } from 'express';
import { KeyCharacter } from '../models/KeyCharacter';
import Container from 'typedi';
import { IKeyCharacterRepository, IKeyCharacterRepositoryToken } from '../infrastructure/interfaces/key-character-repository';

const router = Router()

router.get('/', async (req, res) => res.render('index', {title: "My first website", p1: "This website uses ejs syntax to interpolate data into ejs files which create html pages"}))
router.get('/about', async (req, res) => res.render('about', {title: "About"}))

router.get('/create-story', async (req, res) => res.render('create-story', {title: "Create Story"}))
router.get('/example', async (req, res) => {
    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    const story = keyCharacterRepo.getKeyCharacter(0);
    res.render('story', story)
})
router.get('/local-news/:storyNumber', async (req, res) => {
    // Accessing the storyNumber parameter from the URL and converting it to a number
    const storyNumber = parseInt(req.params.storyNumber, 10);

    // Check if storyNumber is a valid number
    if (isNaN(storyNumber)) {
        return res.status(400).send('Story number must be a valid number');
    }

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    const savedStory = keyCharacterRepo.getKeyCharacter(storyNumber);
    res.render('story', savedStory);
})

router.post('/submit-form', (req, res) => {
    const body: KeyCharacter = req.body;

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    
    // TODO: update this, to show the form that's just been submitted along with a url to the story
    // Possiblity to PUT request to the form
    const newStoryKey = keyCharacterRepo.addKeyCharacter(body);
    console.log(`Current story number: ${newStoryKey}`)
    const newStory = keyCharacterRepo.getKeyCharacter(newStoryKey);
    res.render('story', newStory)
    
});

export default router;