import { Character } from '@/domain/characters/enterprise/entities/character'
import { OriginLocation } from '@/domain/characters/enterprise/entities/values-objects/origin-location'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { Injectable } from '@nestjs/common'

export interface Input {
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
export class CreateCharacter {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(input: Input): Promise<Output> {
    const character = Character.create({
      name: input.name,
      status: input.status,
      species: input.species,
      type: input.type,
      episode: input.episode,
      gender: input.gender,
      origin: new OriginLocation({
        name: input.origin.name,
        url: input.origin.url,
      }),
      location: new OriginLocation({
        name: input.location.name,
        url: input.location.url,
      }),
      image: input.image,
      url: input.url,
    })
    try {
      await this.characterRepository.save(character)
    } catch (error) {}

    return { character }
  }
}
