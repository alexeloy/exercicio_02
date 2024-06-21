import { ResourceNotFound } from '@/core/errors/resource-not-found-exists.error'
import { Character } from '@/domain/characters/enterprise/entities/character'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { Injectable } from '@nestjs/common'

export interface Input {
  id: string
}

export interface Output {
  character: Character
}

@Injectable()
export class FindCharacter {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const character = await this.characterRepository.findById(id)
    if (!character) throw new ResourceNotFound('Character not found')
    return { character }
  }
}
