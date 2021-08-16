import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './web/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message || error.extensions.exception.response.message,
          locations: error.locations,
          extensions: error.extensions.exception.response,
          path: error.path,
        };
        return graphQLFormattedError;
      },
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
