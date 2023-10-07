import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const createHash = (value: string): string => {
    const salt = genSaltSync(15)
    return hashSync(value, salt)
}

export const checkHash = (value:string, hash: string): boolean => {
    return compareSync(value, hash)
}