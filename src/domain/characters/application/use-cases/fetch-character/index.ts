import { Character } from '@/domain/characters/enterprise/entities/character'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { Injectable } from '@nestjs/common'

export interface Output {
  characters: Character[]
}

@Injectable()
export class FetchCharacter {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(): Promise<Output> {
    const characters = await this.characterRepository.findAll()

    return { characters }
  }
}
