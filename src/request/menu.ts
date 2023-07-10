import request from "@/utils/request";
import {menuDataType} from "@/types/menu"
const urlPre = 'nav'


//获取全部菜单信息
export function getAllNav(){
    return request<any,menuDataType[]>({
        url:`${urlPre}/getAllNav.php`,
        method:'GET'
    })
}

//添加菜单
export function addNav(params:object){
    return request({
        url:`${urlPre}/addNav.php`,
        method:'GET',
        params
    })
}

//删除菜单
export function delNav(nId:number){
    return request({
        url:`${urlPre}/delNav.php`,
        method:'GET',
        params:{
            nId
        }
    })
}

//根据id获取菜单信息
export function getOneNav(nId:number){
    return request({
        url:`${urlPre}/getOneNav.php`,
        method:'GET',
        params:{
            nId:nId
        }
    })
}
//修改菜单
export function updateNav(params:object){
    return request({
        url:`${urlPre}/updateNav.php`,
        method:'GET',
        params
    })
}