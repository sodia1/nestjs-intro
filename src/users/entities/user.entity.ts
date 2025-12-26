import { PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Entity } from "typeorm";
import { Post } from "../../posts/entities/post.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    lastName: string;

    @Column({ 
        unique: true,
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    password: string;

        //@OneToMany(() => Post, post => post.author)
    //posts: Post[];
}