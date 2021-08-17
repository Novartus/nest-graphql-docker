import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { TypeOrmConfig } from './config/typeorm.config';
import { CommonModule } from './common/common.module';
import { AuthModule } from './web/auth/auth.module';
import { UsersModule } from './web/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message || error.extensions.exception.response.message,
          locations: error.locations,
          extensions:
            error.extensions.exception.response || error.extensions.code,
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
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
