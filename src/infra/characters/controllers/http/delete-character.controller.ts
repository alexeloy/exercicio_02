import { DeleteCharacter } from '@/domain/characters/application/use-cases/delete-character'
import { Controller, Delete, Logger, Param } from '@nestjs/common'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Character')
@Controller('character/:id')
export class DeleteCharacterController {
  private readonly logger = new Logger(DeleteCharacterController.name)
  constructor(private readonly deleteCharacter: DeleteCharacter) { }

  @Delete()
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async handler(@Param('id') id: string) {
    return await this.deleteCharacter.execute({ id })
  }
}
