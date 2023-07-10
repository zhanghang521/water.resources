import request from "@/utils/request";

export function login(data:object){
    return request({
        url:'/login.php',
        method:'POST',
        data
    })
}