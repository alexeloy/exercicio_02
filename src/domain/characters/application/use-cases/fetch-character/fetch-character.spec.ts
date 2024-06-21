import { Character } from '@/domain/characters/enterprise/entities/character'
import { FetchCharacter } from '.'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { faker } from '@faker-js/faker'
import { MockCharacterRepository } from '@test/repositories/mock-character-repository'
import { OriginLocation } from '@/domain/characters/enterprise/entities/values-objects/origin-location'

let sut: FetchCharacter
let repository: CharacterRepository
describe('Fetch character', () => {
  beforeEach(() => {
    repository = new MockCharacterRepository()
    sut = new FetchCharacter(repository)
  })

  it('Should be able fetch characters', async () => {
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

    const spy = await sut.execute()

    expect(spy.characters).toBeTruthy()
  })
})
