import { UniqueEntityID } from '@/core/entities/unique-entity'
import { Character as raw } from '../schemas/character.schema'
import { Character } from '@/domain/characters/enterprise/entities/character'
import { OriginLocation } from '@/domain/characters/enterprise/entities/values-objects/origin-location'

export class MongoCharacterMapper {
  static toMongo(data: Character) {
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
      _id: id.toString(),
      name,
      episode,
      image,
      status,
      species,
      type,
      gender,
      origin: {
        name: origin.value.name,
        url: origin.value.url,
      },
      location: {
        name: location.value.name,
        url: location.value,
      },
      url,
      createdAt,
      updatedAt,
    }
  }

  static toDomain(data: raw) {
    const {
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
      _id,
    } = data

    return Character.create(
      {
        name,
        episode,
        image,
        status,
        species,
        type,
        gender,
        origin: new OriginLocation({ name: origin.name, url: origin.url }),
        location: new OriginLocation({
          name: location.name,
          url: location.url,
        }),
        url,
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(_id),
    )
  }
}
