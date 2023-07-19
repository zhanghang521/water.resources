export interface ILoginForm {
    uName: string,
    uPwd: string
}
export interface usersDataType {
    uId: number
    uName: string
    uPwd: string
    uTel: string
    rPower: string
    rName: string
    dName: string
}

export interface usersType {
    uName: string | null
    uPwd: string | null
    uTel: string | null
    uPower: string  | string[]
    rId: number  |string
    dId: number | null |string
}
export interface usersUpdType {
    uName: string | null
    uPwd: string | null
    uTel: string | null
}
export interface RuleForm {
    uName: string
    uPwd: string
    uTel: string
    uPower: string | string[]
    rId: number|string
    dId: number|string
}
}
export interface RuleFormUsersPower {
    uPower: string | string[]
}
export interface IUsersPower {
    uPower: string | string[]
}
