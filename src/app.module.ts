import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/providers/env/env'
import { EnvModule } from './infra/providers/env/env.module'
import { CharactersModule } from './infra/characters/character.module'
import { DataBaseModule } from './infra/providers/database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    CharactersModule,
    DataBaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
