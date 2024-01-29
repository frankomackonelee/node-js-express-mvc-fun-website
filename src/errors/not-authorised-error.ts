export class NotAuthorisedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotAuthorisedError";
    }
}