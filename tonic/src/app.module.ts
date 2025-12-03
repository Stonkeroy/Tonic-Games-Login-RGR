import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Esos228228*',
    database: 'userlogs',
    entities:entities,
    synchronize: true,
    logging:true,
  }),
],
  controllers: [AuthController],
  providers: [],
})

export class AppModule {}
