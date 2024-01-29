import { Token } from "typedi";
import { KeyCharacter } from "../../models/KeyCharacter";

export abstract class IKeyCharacterRepository{
    
    abstract addKeyCharacter(character: KeyCharacter): Promise<{ id: number, uid: string }>;

    abstract editKeyCharacter(id: number, character: KeyCharacter, authorisedUids: string[]): Promise<number>;

    abstract getKeyCharacter(id: number): Promise<KeyCharacter>;

}

export const IKeyCharacterRepositoryToken = new Token<IKeyCharacterRepository>()