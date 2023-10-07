import { checkHash, createHash } from "../utils/cipher";

test('Should generate a hash', () => {
    const hash = createHash('Test1234*')
    expect(hash.substring(0, 4)).toBe('$2b$')
    expect(hash.length).toBe(60)
})

test('Should verify a hash', () => {
    const value= 'Test123*'
    const hash = createHash(value)

    const isOk = checkHash(value, hash)
    expect(isOk).toBe(true)
})

test('Should not be equal to hash', () => {
    const value= 'Test123*'
    const hash = createHash('Test1234*')

    const isOk = checkHash(value, hash)
    expect(isOk).toBe(false)
})