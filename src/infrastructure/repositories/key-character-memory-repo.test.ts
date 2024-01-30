import { KeyCharacterMemoryRepository } from "./key-character-memory-repo";

describe('KeyCharacterMemoryRepository', () => {

    it('should get a default character with location Penzance successfully', async () => {
        // Arrange
        const _systemUnderTest = new KeyCharacterMemoryRepository();

        // Act
        const response = await _systemUnderTest.getKeyCharacter(0);

        // Assert
        expect(response).toBeDefined();
        expect(response.location).toBe("Penzance")
    })

});