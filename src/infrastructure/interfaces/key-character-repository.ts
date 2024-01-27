import { Token } from "typedi";
import { KeyCharacter } from "../../models/KeyCharacter";

export abstract class IKeyCharacterRepository{
    
    abstract addKeyCharacter(character: KeyCharacter): number;

    abstract getKeyCharacter(id: number): KeyCharacter;

}

export const IKeyCharacterRepositoryToken = new Token<IKeyCharacterRepository>()