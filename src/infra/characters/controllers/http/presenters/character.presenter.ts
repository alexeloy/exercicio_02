import { Character } from '@/domain/characters/enterprise/entities/character'

export class CharacterPresenter {
  static toHTTP(data: Character) {
    const {
      id,
      name,
      episode,
      image,
      status,
      species,
      type,
      gender,
      origin,
      location,
      url,
      createdAt,
      updatedAt,
    } = data
    return {
      id: id.toString(),
      name,
      episode,
      image,
      status,
      species,
      type,
      gender,
      origin,
      location,
      url,
      createdAt,
      updatedAt,
    }
  }
}
