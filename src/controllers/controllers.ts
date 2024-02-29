import { Router, Response, Request } from 'express';
import QueryString from 'qs'; 
import { KeyCharacter } from '../models/KeyCharacter';
import Container from 'typedi';
import { IKeyCharacterRepositoryToken } from '../infrastructure/interfaces/key-character-repository';

const auth_cookie_name: string =  "story_uids";

function renderStory(res: Response, story: KeyCharacter) {
    res.render('story', story);
}

export function renderPageWithTitle(res: Response, page: string, title: string) {
    res.render(page, { title });
}

function getStoryUidsFromRequest(req: Request<object, object, object, QueryString.ParsedQs, Record<string, object>>): string[]{
    let currentUids: string[] = [];

    if (req.cookies && req.cookies.story_uids) {
        // Assuming the cookie is a JSON string array
        currentUids = JSON.parse(req.cookies.story_uids);
  
        // Validate if it's an array of strings
        if (!Array.isArray(currentUids) || !currentUids.every(uid => typeof uid === 'string')) {
          throw new Error('Invalid format');
        }
    }

    return currentUids;
    
}

interface creatPageData extends KeyCharacter {
    title: string,
    isEditMode: boolean,
    id: number,
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

router.get('/local-news/:id', async (req, res, next) => {
    try{
        // Accessing the id parameter from the URL and converting it to a number
        const id = parseInt(req.params.id, 10);

        // Check if id is a valid number
        if (isNaN(id)) {
            return res.status(400).send('Story number must be a valid number');
        }

        const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);

        const savedStory = await keyCharacterRepo.getKeyCharacter(id);

        renderStory(res, savedStory);
    }catch(error){

        next(error)

    }

});

router.get('/submit-form/:id', async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);

        const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);

        const character = await keyCharacterRepo.getKeyCharacter(id);

        const data: creatPageData = {
            title: "Edit Story",
            isEditMode: true,
            id,
            ...character
        };
    
        renderCreateStoryPage(res, data);

    }catch(error){

        next(error)

    }



    
});

router.get('/not-found', (req, res) => {

    renderPageWithTitle(res.status(404),'not-found','Not Found');
    
});

router.post('/submit-form', async (req, res) => {

    const currentUids = getStoryUidsFromRequest(req);

    const character: KeyCharacter = req.body;  

    const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
    
    const { id, uid } = await keyCharacterRepo.addKeyCharacter(character);
    const newStory = await keyCharacterRepo.getKeyCharacter(id);

    const data: creatPageData = {
        title: "Edit Story",
        isEditMode: true,
        id,
        ...newStory
    }

    const updated_uids: string[] = [...currentUids,uid];

    res.cookie(auth_cookie_name, JSON.stringify(updated_uids), { httpOnly: true }); // You can add more cookie options as needed

    renderFormSubmission(res, data);
    
});

router.post('/submit-form/:id', async (req, res, next) => {
    
    try{
        
        if(req.body._method !== "PUT"){
            return res.status(400).send('Invalid request');
        }

        const currentUids = getStoryUidsFromRequest(req);
    
        const id = parseInt(req.params.id, 10);
    
        const character: KeyCharacter = req.body;  
        const keyCharacterRepo = Container.get(IKeyCharacterRepositoryToken);
        // TODO: Reading the cookies needed here
        await keyCharacterRepo.editKeyCharacter(id, character, currentUids);
    
        const data: creatPageData = {
            title: "Edit Story",
            isEditMode: true,
            id,
            ...character
        };
    
        renderFormSubmission(res, data);
        
    }catch(error){

        next(error)

    }

});



export default router;