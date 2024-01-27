import { Router, Response } from 'express';
import { KeyCharacter } from '../models/KeyCharacter';
import Container from 'typedi';
import { IKeyCharacterRepository, IKeyCharacterRepositoryToken } from '../infrastructure/interfaces/key-character-repository';

function renderStory(res: Response, story: KeyCharacter) {
    res.render('story', story);
}

function renderPageWithTitle(res: Response, page: string, title: string) {
    res.render(page, { title });
}

const router = Router()

router.get('/', async (req, res) => renderPageWithTitle(res, 'index', 'My Node Website'))

router.get('/about', async (req, res) => renderPageWithTitle(res, "about", "About"))

router.get('/create-story', async (req, res) => renderPageWithTitle(res, "create-story", "Create Story"));

router.get('/example', async (req, res) => {
    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    const story = await keyCharacterRepo.getKeyCharacter(0);
    
    renderStory(res, story);
});

router.get('/local-news/:storyNumber', async (req, res) => {
    // Accessing the storyNumber parameter from the URL and converting it to a number
    const storyNumber = parseInt(req.params.storyNumber, 10);

    // Check if storyNumber is a valid number
    if (isNaN(storyNumber)) {
        return res.status(400).send('Story number must be a valid number');
    }

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    const savedStory = await keyCharacterRepo.getKeyCharacter(storyNumber);

    renderStory(res, savedStory);

});

router.post('/submit-form', async (req, res) => {
    const character: KeyCharacter = req.body;  

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    
    // TODO: update this, to show the form that's just been submitted along with a url to the story
    // Possiblity to PUT request to the form
    const newStoryKey = await keyCharacterRepo.addKeyCharacter(character);
    const newStory = await keyCharacterRepo.getKeyCharacter(newStoryKey);

    renderStory(res, newStory);
    
});

export default router;