import { CreateCharacter } from '.'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { faker } from '@faker-js/faker'
import { MockCharacterRepository } from '@test/repositories/mock-character-repository'

let sut: CreateCharacter
let repository: CharacterRepository
describe('Create character', () => {
  beforeEach(() => {
    repository = new MockCharacterRepository()
    sut = new CreateCharacter(repository)
  })

  it('Should be able create a character', async () => {
    await sut.execute({
      episode: [faker.word.words(), faker.word.words(), faker.word.words()],
      name: faker.word.words(),
      status: faker.word.words(),
      species: faker.word.words(),
      type: faker.word.words(),
      gender: faker.word.words(),
      origin: {
        name: faker.word.words(),
        url: faker.internet.url(),
      },
      location: {
        name: faker.word.words(),
        url: faker.internet.url(),
      },
      image: faker.internet.url(),
      url: faker.internet.url(),
    })

    const spy = await repository.findAll()
    expect(spy.length).toBeTruthy()
  })
})
