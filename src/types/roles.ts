export interface rolesDataType {
    rId: string
    rName: string
    rPower: string
    ROLE_UPDATE: number
    ROLL_ADD: number
}

export interface rolesType {
    rName: string | null
    rPower: string | null | string[]
}
export interface RuleForm {
    rName: string
    rPower: string
}
