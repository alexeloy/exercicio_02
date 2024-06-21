import { Body, Controller, Logger, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateCharacter } from '@/domain/characters/application/use-cases/create-character'

const createCharacterBodySchema = z.object({
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

const bodyValidationPipe = new ZodValidationPipe(createCharacterBodySchema)

type CreateCharacterBodySchema = z.infer<typeof createCharacterBodySchema>

@ApiTags('Character')
@Controller('character')
export class CreateCharacterController {
  private readonly logger = new Logger(CreateCharacterController.name)
  constructor(private readonly createCharacter: CreateCharacter) {}

  @Post()
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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse()
  async handler(@Body(bodyValidationPipe) body: CreateCharacterBodySchema) {
    await this.createCharacter.execute(body)
  }
}
