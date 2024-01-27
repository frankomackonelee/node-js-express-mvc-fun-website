import { Token } from "typedi";
import { KeyCharacter } from "../../models/KeyCharacter";

export abstract class IKeyCharacterRepository{
    
    abstract addKeyCharacter(character: KeyCharacter): Promise<number>;

    abstract getKeyCharacter(id: number): Promise<KeyCharacter>;

}

export const IKeyCharacterRepositoryToken = new Token<IKeyCharacterRepository>()