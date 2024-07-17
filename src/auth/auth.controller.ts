import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  // redirect google login page
  async googleAuth(): Promise<void> {}

  @Post('regist/user')
  @IsPublic()
  // 쿼리러너는 2차적으로 구현 할것
  postUser(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }
}
