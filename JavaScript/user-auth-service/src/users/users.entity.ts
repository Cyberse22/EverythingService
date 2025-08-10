import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'text',  // dùng 'text' thay vì 'enum' cho SQLite
        default: UserRole.USER,
    })
    role: UserRole;
}
