import { CustomRepository } from 'src/common/decorator/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { UserModel } from '../entities/user.entity';

@CustomRepository(UserModel)
export class UserRepository extends Repository<UserModel> {}
