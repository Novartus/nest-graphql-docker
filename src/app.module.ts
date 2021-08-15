import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
