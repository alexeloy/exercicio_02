import { Entity } from '@/core/entities/entity'
import { OriginLocation } from './values-objects/origin-location'
import { Optional } from '@/core/helpers/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity'

export interface CharacterProps {
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: OriginLocation
  location: OriginLocation
  image: string
  episode: string[]
  url: string
  createdAt: Date
  updatedAt?: Date
}

export class Character extends Entity<CharacterProps> {
  static create(
    props: Optional<CharacterProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new Character(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get status() {
    return this.props.status
  }

  set status(value: string) {
    this.props.status = value
    this.touch()
  }

  get species() {
    return this.props.species
  }

  set species(value: string) {
    this.props.species = value
    this.touch()
  }

  get type() {
    return this.props.type
  }

  set type(value: string) {
    this.props.type = value
    this.touch()
  }

  get gender() {
    return this.props.gender
  }

  set gender(value: string) {
    this.props.gender = value
    this.touch()
  }

  get origin() {
    return this.props.origin
  }

  set origin(value: OriginLocation) {
    this.props.origin = value
    this.touch()
  }

  get location() {
    return this.props.location
  }

  set location(value: OriginLocation) {
    this.props.location = value
    this.touch()
  }

  get image() {
    return this.props.image
  }

  set image(value: string) {
    this.props.image = value
    this.touch()
  }

  get episode() {
    return this.props.episode
  }

  set episode(value: string[]) {
    this.props.episode = value
    this.touch()
  }

  get url() {
    return this.props.url
  }

  set url(value: string) {
    this.props.url = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
