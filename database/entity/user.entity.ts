import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Exclusion } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({name: "Id"})
    id: number

    @Column({name: "Mail", length: 330, nullable: false, default: ''})
    mail: string

    @Column({name: 'Password', length: 72, nullable: false, default: ''})
    password: string

    @Column({name: "FirstName", length: 50, nullable: true})
    firstName: string

    @Column({name: "LastName", length: 50, nullable: true})
    lastName: string

    @Column({name: "Age", nullable: true})
    age: number

}