import { PickType } from '@nestjs/mapped-types';
import { UserModel } from '../entities/user.entity';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto extends PickType(UserModel, ['email']) {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  password: string;
}
