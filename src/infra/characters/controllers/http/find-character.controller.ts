import { FindCharacter } from '@/domain/characters/application/use-cases/find-character'
import { Controller, Get, Logger, Param } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CharacterPresenter } from './presenters/character.presenter'

@ApiTags('Character')
@Controller('character/:id')
export class FindCharacterController {
  private readonly logger = new Logger(FindCharacterController.name)
  constructor(private readonly findCharacter: FindCharacter) {}

  @Get()
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiBadRequestResponse()
  async handler(@Param('id') id: string) {
    const { character } = await this.findCharacter.execute({ id })

    return CharacterPresenter.toHTTP(character)
  }
}
