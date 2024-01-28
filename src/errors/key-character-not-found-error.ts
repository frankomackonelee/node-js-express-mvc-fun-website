export class KeyCharacterNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "KeyCharacterNotFoundError";
    }
}