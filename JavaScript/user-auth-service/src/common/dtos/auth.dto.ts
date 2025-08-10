import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ enum: ['USER', 'ADMIN'], default: 'USER' })
    role?: string;
}

export class LoginDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
