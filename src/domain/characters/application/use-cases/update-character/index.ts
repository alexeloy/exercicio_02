import { ResourceNotFound } from '@/core/errors/resource-not-found-exists.error'
import { Character } from '@/domain/characters/enterprise/entities/character'
import { OriginLocation } from '@/domain/characters/enterprise/entities/values-objects/origin-location'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { Injectable } from '@nestjs/common'

export interface Input {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
}

export interface Output {
  character: Character
}

@Injectable()
export class UpdateCharacter {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(input: Input): Promise<Output> {
    const character = await this.characterRepository.findById(input.id)
    if (!character) throw new ResourceNotFound('Character not found')

    character.name = input.name
    character.status = input.status
    character.species = input.species
    character.type = input.type
    character.gender = input.gender
    character.origin = new OriginLocation({
      name: input.origin.name,
      url: input.origin.url,
    })
    character.location = new OriginLocation({
      name: input.location.name,
      url: input.location.url,
    })
    character.image = input.image
    character.episode = input.episode
    character.url = input.url

    try {
      await this.characterRepository.save(character)
    } catch (error) {}

    return { character }
  }
}
