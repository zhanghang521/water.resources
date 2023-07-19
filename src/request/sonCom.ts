import request from "@/utils/request";
const urlPre = 'sonCom'

//获取所有子公司
export function getAllSC(){
    return request({
        url:`${urlPre}/getAllSC.php`,
        method:'GET'
    })
}

//添加子公司
export function addSC(data:any){
    return request({
        url:`${urlPre}/addSC.php`,
        method:'POST',
        data
    })
}
//删除子公司
export function delSC(scId:number){
    return request({
        url:`${urlPre}/delSC.php`,
        method:'GET',
        params:{
            scId
        }
    })
}
//根据ID获取一个子公司详情
export function getOneSC(scId:number){
    return request({
        url:`${urlPre}/getOneSC.php`,
        method:'GET',
        params:{
            scId
        }
    })
}
//修改子公司信息
export function updateSC(data:any){
    return request({
        url:`${urlPre}/updateSC.php`,
        method:'POST',
        data
    })
}
//文件上传
export function getPic(file:any){
    return request({
        url:`${urlPre}/getPic.php`,
        method:'POST',
        data:{
            file
        }
    })
}