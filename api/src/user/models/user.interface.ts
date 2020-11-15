export interface User {
    id?: number,
    email?: string,
    username?: string,
    password?: string,
    role: UserRole,
    currency?: string
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}