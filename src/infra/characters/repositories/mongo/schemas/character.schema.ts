import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export class OriginLocation {
  name: string
  url: string
}

@Schema()
export class Character extends Document {
  @Prop({ type: String })
  _id: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  status: string

  @Prop({ required: true })
  species: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  gender: string

  @Prop({ type: Object, required: true })
  origin: {
    name: string
    url: string
  }

  @Prop({ type: Object, required: true })
  location: {
    name: string
    url: string
  }

  @Prop({ required: true })
  image: string

  @Prop({ type: [String], required: true })
  episode: string[]

  @Prop({ required: true })
  url: string

  @Prop({ required: true, default: Date.now })
  createdAt: Date

  @Prop({})
  updatedAt: Date
}

export const CharacterSchema = SchemaFactory.createForClass(Character)
