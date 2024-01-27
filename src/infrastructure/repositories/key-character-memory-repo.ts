import { Service } from 'typedi';
import { KeyCharacter } from "../../models/KeyCharacter";
import { IKeyCharacterRepository } from "../interfaces/key-character-repository";

@Service()
export class KeyCharacterMemoryRepository extends IKeyCharacterRepository{

    private readonly defaultIndex: number = 0;

    private _KeyCharacterStore: {
        [index in number]: KeyCharacter
    } = {
        [this.defaultIndex]: {
            location: "Penzance",
            firstName: "Franko",
            lastName: "Lee",
            age: 43,
            description: "father of 2"
        }
    };

    constructor(){
        super();
    }

    addKeyCharacter(character: KeyCharacter): Promise<number> {
        return new Promise((resolve, reject) => {
            const currentMaxIndex = this.getMaxId();
            const nextMaxIndex: number = currentMaxIndex ? currentMaxIndex + 1 : 1 ;
            
            this._KeyCharacterStore[nextMaxIndex] = character;
    
            resolve(nextMaxIndex);
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
                    reject(new Error(warning));
                } else {
                    resolve(result);
                }
            }
        });
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

}