import { Character } from '@/domain/characters/enterprise/entities/character'
import { CharacterRepository } from '@/domain/characters/repositories/repository'

export class MockCharacterRepository implements CharacterRepository {
  mockCharacters: Character[] = []

  async findAll(): Promise<Character[]> {
    return this.mockCharacters
  }

  async delete(id: string): Promise<void> {
    const index = this.mockCharacters.findIndex((f) => f.id.toString() === id)
    this.mockCharacters.splice(index, 1)
  }

  async findById(filter: string): Promise<Character | null> {
    const result = this.mockCharacters.find((f) => f.id.toString() === filter)
    return result ?? null
  }
  async save(data: Character) {
    const index = this.mockCharacters.findIndex((f) => f.id === data.id)
    index >= 0
      ? (this.mockCharacters[index] = data)
      : this.mockCharacters.push(data)
  }
}
