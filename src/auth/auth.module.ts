import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
