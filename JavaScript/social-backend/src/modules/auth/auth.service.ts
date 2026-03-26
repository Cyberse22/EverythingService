import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existing = await this.userService.findByEmail(dto.email);
      if (existing) {
        throw new BadRequestException('Email already exists');
      }

      const user = await this.userService.create(dto);

      return this.generateTokens(user);
    } catch (error) {
      console.error('AUTH REGISTER ERROR:', error);

      throw error; // 👈 giữ nguyên nếu đã là HttpException
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return this.generateTokens(user);
  }

  private generateTokens(user: any) {
    const payload = {
      sub: user._id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '15m',
      }),

      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }
}