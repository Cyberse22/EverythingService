import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ example: 'email' })
  email: string;

  @MinLength(6)
  @ApiProperty({ example: 'password' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'me' })
  username: string;
}