import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  // 유저 등록 메서드
  async registerUserByEmail(dto: CreateUserDto) {
    // 0. 소셜로그인 인지 검사
    // 1. 해당 이메일로 중복된 유저가 있는지 검사
    // 2. 유저를 세이브 해준뒤 리턴

    const existEmail = await this.userRepository.find({
      where: {
        email: dto.email,
      },
    });

    if (existEmail.length > 0) {
      throw new BadRequestException(
        `${dto.email}은 이미 가입된 이메일 주소입니다.`,
      );
    }

    const newUser = await this.userRepository.create({
      ...dto,
    });

    await this.userRepository.save(newUser);

    return this.getUserById(newUser.id);
  }
  ///
  async findAll() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('해당 id의 고객이 존재하지 않습니다.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
