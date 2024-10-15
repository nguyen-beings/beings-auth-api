export interface UserDto {
    id: string
    lastName: string
    firstName: string
    username: string
    password: string
    systemRoles: Array<number>
    orgId: string
}
