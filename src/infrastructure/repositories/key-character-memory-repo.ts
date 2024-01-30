import { KeyCharacterMemoryRepository } from "./key-character-memory-repo.test";

describe('KeyCharacterMemoryRepository', () => {
    it('should get a default character successfully', async () => {
        // Arrange
        const _systemUnderTest = new KeyCharacterMemoryRepository();

        // Act
        const response = await _systemUnderTest.getKeyCharacter(0);

        // Assert
        expect(response).toBeDefined();
    })
});
