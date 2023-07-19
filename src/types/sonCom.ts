export interface sonComDataType {
    scId: number
    scName: string
    scMan: string
    scTel: string
    scWebUrl: string
    scLogo: string
    uId: number
}

export interface sonComType {
    scName: string | null
    scMan: string | null
    scTel: string | null
    scWebUrl: string | null
    uId: number | null 
    file: string | null
}

export interface RuleForm {
    scName: string
    scMan: string
    scTel: string
    scWebUrl: string
    uId: number 
    file: string
}