import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Index()
    @Column({ unique: true })
    login: string;
    @Column()
    password: string;
}