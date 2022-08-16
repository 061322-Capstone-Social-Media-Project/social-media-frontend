export interface Token {
    sub: string
    roles: string[]
    iss: string
    exp: number
    id: number
}