import { Character } from '@/domain/characters/enterprise/entities/character'
import { FindCharacter } from '.'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { faker } from '@faker-js/faker'
import { MockCharacterRepository } from '@test/repositories/mock-character-repository'
import { OriginLocation } from '@/domain/characters/enterprise/entities/values-objects/origin-location'
import { ResourceNotFound } from '@/core/errors/resource-not-found-exists.error'

let sut: FindCharacter
let repository: CharacterRepository
describe('Find character', () => {
  beforeEach(() => {
    repository = new MockCharacterRepository()
    sut = new FindCharacter(repository)
  })

  it('Should be able find a character', async () => {
    const character = Character.create({
      episode: [faker.word.words(), faker.word.words(), faker.word.words()],
      name: faker.word.words(),
      status: faker.word.words(),
      species: faker.word.words(),
      type: faker.word.words(),
      gender: faker.word.words(),
      origin: new OriginLocation({
        name: faker.word.words(),
        url: faker.internet.url(),
      }),
      location: new OriginLocation({
        name: faker.word.words(),
        url: faker.internet.url(),
      }),
      image: faker.internet.url(),
      url: faker.internet.url(),
    })

    await repository.save(character)

    const spy = await sut.execute({ id: character.id.toString() })

    expect(spy.character).toBeTruthy()
  })

  it('Should be able throw an error when character no exists', async () => {
    expect(async () => {
      await sut.execute({
        id: 'invalid-id',
      })
    }).rejects.toThrow(ResourceNotFound)
  })
})
