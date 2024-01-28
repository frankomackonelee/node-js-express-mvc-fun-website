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

interface creatPageData extends KeyCharacter {
    title: string,
    isEditMode: boolean,
    id: number,
    uid: string,
}

function renderCreateStoryPage(res: Response, data: creatPageData) {
    res.render("create-story", { ...data });
}

function renderFormSubmission(res: Response, data: { title: string, id: number }) {
    res.render("form-submission", { ...data, baseUrl: process.env.BASE_URL });
}

const router = Router()

router.get('/', async (req, res) => renderPageWithTitle(res, 'index', 'My Node Website'))

router.get('/about', async (req, res) => renderPageWithTitle(res, "about", "About"))

router.get('/create-story', async (req, res) => {
    const data: creatPageData = {
        title: "Create Story",
        isEditMode: false,
        id: 0,
        uid: '',
        location: '',
        firstName: '',
        lastName: '',
        age: 0,
        description: ''
    }
    renderCreateStoryPage(res, data)
});

router.get('/example', async (req, res) => {

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    const story = await keyCharacterRepo.getKeyCharacter(0);
    
    renderStory(res, story);
});

router.get('/local-news/:id', async (req, res) => {
    // Accessing the id parameter from the URL and converting it to a number
    const id = parseInt(req.params.id, 10);

    // Check if id is a valid number
    if (isNaN(id)) {
        return res.status(400).send('Story number must be a valid number');
    }

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    const savedStory = await keyCharacterRepo.getKeyCharacter(id);

    renderStory(res, savedStory);

});

router.get('/submit-form/:id', async (req, res) => {

    const id = parseInt(req.params.id, 10);

    const uid = '';

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    const character = await keyCharacterRepo.getKeyCharacter(id);

    const data: creatPageData = {
        title: "Edit Story",
        isEditMode: true,
        id,
        uid,
        ...character
    };

    renderFormSubmission(res, data);
    
});

router.get('/not-found', (req, res) => {

    renderPageWithTitle(res.status(404),'not-found','Not Found');
    
});

router.post('/submit-form/:id', async (req, res) => {

    if(req.body._method !== "PUT"){
        return res.status(400).send('Invalid request');
    }

    const id = parseInt(req.params.id, 10);
    const uid = req.body.uid;

    const character: KeyCharacter = req.body;  
    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    await keyCharacterRepo.editKeyCharacter(id, character);

    const data: creatPageData = {
        title: "Edit Story",
        isEditMode: true,
        id,
        uid,
        ...character
    };

    renderFormSubmission(res, data);
    
});

router.post('/submit-form', async (req, res) => {
    const character: KeyCharacter = req.body;  

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    
    const newStoryKey = await keyCharacterRepo.addKeyCharacter(character);
    const newStory = await keyCharacterRepo.getKeyCharacter(newStoryKey);

    const data: creatPageData = {
        title: "Edit Story",
        isEditMode: true,
        id: newStoryKey,
        uid: "abcde",
        ...newStory
    }

    renderFormSubmission(res, data);
    
});

export default router;