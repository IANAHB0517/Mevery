import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserModel } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ENV_JWT_SECRET_KEY } from 'src/common/const/env-keys.const';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  // Header에 포함되어 있는 토큰을 추출하는 메서드
  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new BadRequestException('잘못된 토큰입니다.');
    }

    const token = splitToken[1];

    return token;
  }

  // BasicToken에 base64로 인코딩 되어있는 이메일 주소와 비밀번호를 디코딩하고 반환하는 메서드
  decodeBasicToken(token: string): { email: string; password: string } {
    const decoded = Buffer.from(token, 'base64').toString('utf8');

    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new BadRequestException('잘못된 토큰입니다.');
    }

    const email = split[0];
    const password = split[1];

    return { email, password };
  }

  // 이메일과 비밀번호로 가입된 사용자가 맞는지 확인하는 메서드
  async authenticateWithEmailAndPassword(
    user: Pick<UserModel, 'email' | 'password'>,
  ) {
    const existigUser = await this.userService.getUserByEmail(user.email);

    if (!existigUser) {
      throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
    }

    const passOk = await bcrypt.compare(user.password, existigUser.password);

    if (!passOk) {
      throw new BadRequestException('잘못된 비밀번호 입니다.');
    }

    return existigUser;
  }

  // 토큰을 검증하는 메서드
  verifyToken(token: string) {
    const secret = this.configService.get<string>(ENV_JWT_SECRET_KEY);
    try {
      return this.jwtService.verify(token, {
        secret: secret,
      });
    } catch (error) {
      throw new UnauthorizedException('토큰이 만료되었거나 잘못되었습니다.');
    }
  }

  // 유저생성 메소드
  registerUser(dto: CreateUserDto) {
    return this.userService.registerUserByEmail(dto);
  }
}
