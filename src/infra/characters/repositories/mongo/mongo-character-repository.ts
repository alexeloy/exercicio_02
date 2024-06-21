import { Character } from '@/domain/characters/enterprise/entities/character'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { Character as ModelSchema } from './schemas/character.schema'
import { Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MongoCharacterMapper } from './mappers/mongo-character-mapper'

export class MongCharacterRepository implements CharacterRepository {
  private readonly logger = new Logger(MongCharacterRepository.name)
  constructor(
    @InjectModel(ModelSchema.name)
    private readonly characterModel: Model<ModelSchema>,
  ) {}

  async save(character: Character): Promise<void> {
    try {
      const raw = MongoCharacterMapper.toMongo(character)
      this.logger.log(`Saving character `)
      await this.characterModel
        .updateOne({ _id: raw._id }, raw, { upsert: true })
        .exec()
    } catch (error) {
      this.logger.error(`Error saving character ${error}`)
    }
  }
  async findAll(): Promise<Character[]> {
    const raw = await this.characterModel.find().exec()
    return raw.map((r) => MongoCharacterMapper.toDomain(r.toObject()))
  }

  async findById(id: string): Promise<Character | null> {
    const raw = await this.characterModel.findOne({ _id: id }).exec()
    return raw ? MongoCharacterMapper.toDomain(raw.toObject()) : null
  }

  async delete(id: string): Promise<void> {
    await this.characterModel.findByIdAndDelete(id).exec()
  }
}
