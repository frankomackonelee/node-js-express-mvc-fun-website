import { Service } from 'typedi';
import { KeyCharacter } from "../../models/KeyCharacter";
import { IKeyCharacterRepository } from "../interfaces/key-character-repository";
import { KeyCharacterNotFoundError } from '../../errors/key-character-not-found-error';
import crypto from 'crypto';
import { NotAuthorisedError } from '../../errors/not-authorised-error';

@Service()
export class KeyCharacterMemoryRepository extends IKeyCharacterRepository{

    private readonly defaultIndex: number = 0;

    private _KeyCharacterStore: {
        [index in number]: KeyCharacter & {uid: string }
    } = {
        [this.defaultIndex]: {
            location: "Penzance",
            firstName: "Franko",
            lastName: "Lee",
            age: 43,
            description: "father of 2",
            uid: ""
        }
    };

    constructor(){
        super();
    }

    addKeyCharacter(character: KeyCharacter): Promise<{ id: number, uid: string }> {
        return new Promise((resolve) => {
            const currentMaxIndex = this.getMaxId();
            const nextMaxIndex: number = currentMaxIndex ? currentMaxIndex + 1 : 1 ;
            
            const uid = this.generateUID();

            this._KeyCharacterStore[nextMaxIndex] = {...character, uid};
    
            resolve({id: nextMaxIndex, uid: "abc"});
        })
    }

    editKeyCharacter(id: number, character: KeyCharacter, authorisedUids: string[]): Promise<number> {
        return new Promise((resolve, reject) => {

            if(this.isAuthorised(id, authorisedUids)){
                const currentCharacter = this._KeyCharacterStore[id];
                const uid = currentCharacter.uid;

                this._KeyCharacterStore[id] = {...character, uid};

                resolve(id);
            }else{
                reject(new NotAuthorisedError(`Request to edit ${id} is made by invalid browser`));
            }

        })
    }

    getKeyCharacter(id: number): Promise<KeyCharacter> {
        return new Promise((resolve, reject) => {
            if (!this._KeyCharacterStore) {
                reject(new Error("Memory store not instantiated."));
            } else {
                const result = this._KeyCharacterStore[id];
                if (!result) {
                    const warning = `A request has been made for a key character id (${id}) that does not exist`;
                    console.warn(warning);
                    reject(new KeyCharacterNotFoundError(warning));
                } else {
                    resolve(result);
                }
            }
        });
    }

    private isAuthorised(id: number, authorisedUids: string[]): boolean{
        //TODO: implement logic here...
        console.log(id);
        console.log(authorisedUids);
        return true;
    }

    private getMaxId(): number | null{
        let maxIndex: number | null = null;
        for (const key in this._KeyCharacterStore) {
            // Convert the key to a number as it's received as a string
            const numericKey = parseInt(key, 10);

            // Check if this key is the new maximum
            if (maxIndex === null || numericKey > maxIndex) {
                maxIndex = numericKey;
            }
        }
        return maxIndex;
    }

    private generateUID() {
        return crypto.randomBytes(16).toString('hex');
    }

}
