import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UserRole } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    // Register User
    async register(email: string, password: string, role: UserRole = UserRole.USER) {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.usersService.create({
            email,
            password: hashedPassword,
            role
        });

        return {
            message: "User registered successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
            }
        };
    }

    // Validate User
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException("Invalid credentials");
    }

    // Login User
    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
