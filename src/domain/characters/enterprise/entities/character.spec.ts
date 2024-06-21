import { faker } from '@faker-js/faker'
import { Character } from './character'
import { OriginLocation } from './values-objects/origin-location'

describe('Character', () => {
  it('should be able to create a character', () => {
    const sut = Character.create({
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

    expect(sut).toBeTruthy()
  })
})
