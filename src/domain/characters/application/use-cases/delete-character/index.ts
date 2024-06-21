import { ResourceNotFound } from '@/core/errors/resource-not-found-exists.error'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { Injectable } from '@nestjs/common'

export interface Input {
  id: string
}

@Injectable()
export class DeleteCharacter {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute({ id }: Input): Promise<void> {
    const character = await this.characterRepository.findById(id)
    if (!character) throw new ResourceNotFound('Character not found')

    try {
      await this.characterRepository.delete(id)
    } catch (error) {}
  }
}
