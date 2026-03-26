import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;
}