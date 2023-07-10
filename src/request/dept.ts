import request from "@/utils/request";
const urlPre = 'dept'
//获取全部部门信息
export function getAllDept() {
    return request({
        url: `${urlPre}/getAllDept.php`,
        method: 'GET'
    })
}

//根据Id获取部门详情
export function getOneDept(dId:number) {
    return request({
        url: `${urlPre}/getOneDept.php`,
        method: 'GET',
        params:{
            dId: dId
        }
    })
}


//新增部门
/**
 *  dName, 
    dCount, 
    dAddr,
    uId : 默认1
 */
export function addDept(params:object) {
    return request({
        url: `${urlPre}/addDept.php`,
        method: 'GET',
        params:{
            ...params
        }
    })
}

//修改部门
export function updateDept(params:object) {
    return request({
        url: `${urlPre}/updateDept.php`,
        method: 'GET',
        params:{
            ...params
        }
    })
}


//删除部门
export function delDept(dId:number) {
    return request({
        url: `${urlPre}/delDept.php`,
        method: 'GET',
        params:{
            dId: dId
        }
    })
}
