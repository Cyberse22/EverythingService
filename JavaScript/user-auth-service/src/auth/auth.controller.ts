import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import * as bcrypt from "bcryptjs";
import { LoginDto, RegisterDto } from "src/common/dtos/auth.dto";
import { UserRole } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @Post('register')
    @ApiBody({ type: RegisterDto})
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    async register(@Body() body: { name: string; email: string; password: string }) {
        const { name, email, password } = body;

        // Check if email already exists
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
            role: UserRole.USER, // use enum for role
        });

        // Return user without password
        const { password: _, ...result } = user;
        return result;
    }

    @Post('login')
    @ApiBody({ type: LoginDto})
    @ApiResponse({ status: 201 })
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }
}
