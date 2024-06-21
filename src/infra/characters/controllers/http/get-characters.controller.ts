import { FetchCharacter } from '@/domain/characters/application/use-cases/fetch-character'
import { Controller, Get, Logger } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CharacterPresenter } from './presenters/character.presenter'

@ApiTags('Character')
@Controller('character')
export class GetCharactersController {
  private readonly logger = new Logger(GetCharactersController.name)
  constructor(private readonly fetchCharacter: FetchCharacter) {}

  @Get()
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiBadRequestResponse()
  async handler() {
    const { characters } = await this.fetchCharacter.execute()
    return characters.map((character) => CharacterPresenter.toHTTP(character))
  }
}
