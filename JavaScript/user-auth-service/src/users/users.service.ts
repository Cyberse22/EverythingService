import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(userData: Partial<User>): Promise<User> {
        const user = this.repo.create(userData);
        return this.repo.save(user);
    }

    async findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    async findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async findAll(): Promise<User[]> {
        return this.repo.find();
    }
}