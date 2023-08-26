import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({name: "Id"})
    id: number

    @Column({name: "FirstName", length: 50, nullable: true})
    firstName: string

    @Column({name: "LastName", length: 50, nullable: true})
    lastName: string

    @Column({name: "Age", nullable: true})
    age: number

}