import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async whoami(user: UserEntity): Promise<UserEntity> {
    const userProfile = await this.UserRepository.findOne({
      where: {
        id: user.id,
        deleted_at: IsNull(),
      },
    });
    return userProfile;
  }
}
