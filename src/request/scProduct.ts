import request from "@/utils/request";
const urlPre = 'scComProduct'


//获取全部菜单全部产品
export function getAllProduct(scId:number|string){
    return request({
        url:`${urlPre}/getAllProduct.php`,
        method:'GET',
        params:{
            scId
        }
    })
}

//新增产品
export function addProduct(data:any){
    return request({
        url:`${urlPre}/addProduct.php`,
        method:'POST',
        data,
    })
}
//删除产品
export function delProduct(pId:number){
    return request({
        url:`${urlPre}/delProduct.php`,
        method:'GET',
        params:{
            pId
        }
    })
}
//获取产品详情
export function getOneProduct(pId:number){
    return request({
        url:`${urlPre}/getOneProduct.php`,
        method:'GET',
        params:{
            pId
        }
    })
}
//修改产品
export function updateProduct(data:any){
    return request({
        url:`${urlPre}/updateProduct.php`,
        method:'POST',
        data,
    })
}
