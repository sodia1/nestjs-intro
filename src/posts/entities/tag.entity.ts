import { Column, Entity } from "typeorm";

@Entity()
export class Tag {
    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        unique: true,
    })
    name: string;
}