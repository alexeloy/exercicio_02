import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Character,
  CharacterSchema,
} from './repositories/mongo/schemas/character.schema'
import { CharacterRepository } from '@/domain/characters/repositories/repository'
import { MongCharacterRepository } from './repositories/mongo/mongo-character-repository'
import { CreateCharacter } from '@/domain/characters/application/use-cases/create-character'
import { DeleteCharacter } from '@/domain/characters/application/use-cases/delete-character'
import { FetchCharacter } from '@/domain/characters/application/use-cases/fetch-character'
import { FindCharacter } from '@/domain/characters/application/use-cases/find-character'
import { UpdateCharacter } from '@/domain/characters/application/use-cases/update-character'
import { CreateCharacterController } from './controllers/http/create-character.controller'
import { UpdateCharacterController } from './controllers/http/update-character.controller'
import { GetCharactersController } from './controllers/http/get-characters.controller'
import { FindCharacterController } from './controllers/http/find-character.controller'
import { DeleteCharacterController } from './controllers/http/delete-character.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  controllers: [
    CreateCharacterController,
    UpdateCharacterController,
    GetCharactersController,
    FindCharacterController,
    DeleteCharacterController,
  ],
  providers: [
    {
      provide: CharacterRepository,
      useClass: MongCharacterRepository,
    },
    CreateCharacter,
    DeleteCharacter,
    FetchCharacter,
    FindCharacter,
    UpdateCharacter,
  ],
})
export class CharactersModule {}
