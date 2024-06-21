import { Character } from '../enterprise/entities/character'

export abstract class CharacterRepository {
  abstract save(character: Character): Promise<void>
  abstract findAll(): Promise<Character[]>
  abstract findById(id: string): Promise<Character | null>
  abstract delete(id: string): Promise<void>
}
