import request from "@/utils/request";
const urlPre = 'roles'
//添加角色
export function addRoles(params:any){
    return request({
        url:`${urlPre}/addRoles.php`,
        params
    })
}
//删除角色
export function delRoles(rId:number){
    return request<string,string>({
        url:`${urlPre}/delRoles.php`,
        params:{
            rId
        }
    })
}
//根据id获取角色详情
export function getOneRoles(rId:number){
    return request({
        url:`${urlPre}/getOneRoles.php`,
        params:{
            rId
        }
    })
}
//获取全部角色
export function getAllRoles(){
    return request({
        url:`${urlPre}/getAllRoles.php`,
    })
}
//修改角色信息
export function updateRoles(params:any){
    return request({
        url:`${urlPre}/updateRoles.php`,
        params
    })
}
//添加角色
export function setRolesPower(params:any){
    return request({
        url:`${urlPre}/setRolesPower.php`,
        params
    })
}