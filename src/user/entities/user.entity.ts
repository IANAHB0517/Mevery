import { IsEmail, IsString } from 'class-validator';
import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Social } from '../const/social.enum';

@Entity()
export class UserModel extends BaseModel {
  // 기본정보
  @IsString()
  @Column()
  userName: string;

  @IsEmail()
  @Column({ nullable: false })
  email: string;

  @IsString()
  @Column({ nullable: true })
  password: string;

  // 소셜 로그인 정보
  @Column({ type: 'enum', enum: Social, nullable: true, default: null })
  social: Social | null;

  // 조인 컬럼
  // 작성한 포스트
  // 작성한 댓글

  // 언어별 등급
}
