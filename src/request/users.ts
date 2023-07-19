import request from "@/utils/request";
const urlPre = 'users'
//登录
export function login(data:object){
    return request({
        url:'/login.php',
        method:'POST',
        data
    })
}
//获取全部员工信息
export function getAllUsers(page:number){
    return request({
        url: `${urlPre}/getAllUsers.php`,
        params:{
            page
        }
    })
}

//根据id获取用户详情信息
export function getOneUsers(uId:number){
    return request({
        url: `${urlPre}/getOneUsers.php`,
        params:{
            uId
        }
    })
}

//新增用户
export function addUsers(params:object){
    return request({
        url: `${urlPre}/addUsers.php`,
        params
    })
}

//删除用户
export function delUsers(uId:number){
    return request({
        url: `${urlPre}/delUsers.php`,
        params:{
            uId
        }
    })
}

//修改用户
export function updateUsers(params:object){
    return request({
        url: `${urlPre}/updateUsers.php`,
        params
    })
}
//自定义用户菜单权限
export function usersPower(uId:number,uPower:string){
    return request({
        url: `${urlPre}/usersPower.php`,
        params:{
            uId,
            uPower
        }
    })
}