import { IsString } from 'class-validator';
import { BaseModel } from 'src/common/entities/base.entity';
import { Column } from 'typeorm';
import { Social } from '../const/social.enum';

export class UserModel extends BaseModel {
  @IsString()
  @Column()
  nickname: string;

  @IsString()
  @Column({ nullable: true })
  password: string;

  @Column({ type: 'enum', enum: Social, nullable: true, default: null })
  social: Social | null;
}
