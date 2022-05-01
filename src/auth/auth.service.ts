import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.entity';
import { RegisterUserDto, LoginUserDto } from './dtos/users.dtos';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterUserDto) {
    const hashPassword = await bcrypt.hash(data.password, 10);

    try {
      const newUser = this.userRepo.create({ ...data, password: hashPassword });
      const { password, ...response } = await this.userRepo.save(newUser);

      console.log('---------------------error.code');
      console.log(response);

      return response;

    } catch (error) {
      console.log(error.code);

      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    return null;
  }
  async login(data: LoginUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: data.username },
    });

    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);
      console.log(isMatch);

      if (isMatch) {
        return this.generateJwt(user);
      } else {
        throw new UnauthorizedException('not allow');
      }
    } else {
      throw new UnauthorizedException('not allow');
    }
  }

  generateJwt(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
