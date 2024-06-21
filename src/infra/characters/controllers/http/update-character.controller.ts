import { Body, Controller, Logger, Param, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import { z } from 'zod'
import { UpdateCharacter } from '@/domain/characters/application/use-cases/update-character'

const updateCharacterBodySchema = z.object({
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string(),
  episode: z.array(z.string()),
  url: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(updateCharacterBodySchema)

type UpdateCharacterBodySchema = z.infer<typeof updateCharacterBodySchema>

@ApiTags('Character')
@Controller('character/:id')
export class UpdateCharacterController {
  private readonly logger = new Logger(UpdateCharacterController.name)
  constructor(private readonly updateCharacter: UpdateCharacter) {}

  @Put()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        status: { type: 'string' },
        species: { type: 'string' },
        type: { type: 'string' },
        gender: { type: 'string' },
        origin: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
          },
        },
        location: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
          },
        },
        image: { type: 'string' },
        episode: { type: 'array', items: { type: 'string' } },
        url: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiBadRequestResponse()
  async handler(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: UpdateCharacterBodySchema,
  ) {
    await this.updateCharacter.execute({ id, ...body })
  }
}
