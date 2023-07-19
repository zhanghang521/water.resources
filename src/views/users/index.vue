<template>
  <div class="container">
    <div class="table-data">
      <div class="addMenu"><el-button type="primary" plain size="small" @click="showAddEdit('add')">+ 新增</el-button></div>
      <el-table :data="usersDate" style="width: 100%;" :row-style="{ height: '50px' }"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266', textAlign: 'center' }">
        <el-table-column prop="uId" label="ID" width="50" />
        <el-table-column prop="uName" label="员工账号" width="100" />
        <el-table-column prop="uPwd" label="员工密码" width="100" />
        <el-table-column prop="uTel" label="员工电话" width="150" />
        <el-table-column prop="uPower" label="员工菜单权限" width="">
          <template #default="scope">
            <div style="display:flex;justify-content:center;align-items: center">
              <div style=" width:25%;">
                <span>角色权限:</span>
              </div>
              <div style=" width:75%;display:flex;flex-wrap: wrap;">
                <span v-for="(item, index) in (scope.row.rPower.split(','))" :key="index">
                  <el-tag class="ml-2" type="info" style="margin:5px">{{ menusName[item] }}</el-tag>
                </span>
              </div>
            </div>
            <p style="border:1px #ccc solid;margin:0;"></p>
            <div style="display:flex;justify-content:center;align-items: center">
              <div style=" width:25%;">
                <span>自定义权限:</span>
              </div>
              <div style="width:75%;display:flex;flex-wrap: wrap;">
                <span v-for="(item, index) in (filterCustomMenu(scope.row))" :key="index">
                  <el-tag class="ml-2"  style="margin:5px">{{ menusName[item] }}</el-tag>
                </span>
              </div>

            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rName" label="员工角色" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.rName">{{ scope.row.rName }}</el-tag>
            <el-tag type="info" v-else>未指定</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dName" label="员工部门" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.dName">{{ scope.row.dName }}</el-tag>
            <el-tag type="info" v-else>未指定</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="200">
          <template #default="scope">
            <div>
              <el-button type="primary" link @click="showAddEdit('edit', scope.row.uId)">修改</el-button>
              <el-popconfirm title="删除后无法恢复，确认删除吗？" @confirm="romoveUser(scope.row.uId)" confirm-button-text="确认"
                cancel-button-text="取消" width="250px">
                <template #reference>
                  <el-button type="danger" link>删除</el-button>
                </template>
              </el-popconfirm>
              <el-button type="primary" link @click="ShowCustomMenu(scope.row.uId)">自定义菜单</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    <!--   <el-pagination
      v-model:current-page="currentPage2"
      :page-sizes="[5, 10, 15]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    </div>
    <!-- 模态框 -->
    <AddAndEdit v-if="dialogFormVisible" :uId="uId" :dialogFormVisible="dialogFormVisible" :dialogMethod="dialogMethod"
      @dialogFormClose="closeAddEdit"></AddAndEdit>
    <EditUserPower v-if="dialogFormPower" :uId="uId" :dialogFormPower="dialogFormPower" 
      @dialogFormClose="closeAddEdit"></EditUserPower>
  </div>
</template>
  
<script lang="ts" setup>
import AddAndEdit from "./components/AddAndEdit.vue"
import EditUserPower from "./components/EditUserPower.vue"
import { usersDataType } from "@/types/users"
import { onMounted, reactive, ref } from "vue"
import { ElMessage } from 'element-plus'
import { delUsers, getAllUsers } from "@/request/users"
import { getAllNav } from "@/request/menu"
const usersDate = ref<usersDataType[]>([])
const dialogFormVisible = ref(false)
const dialogFormPower = ref(false)
const dialogMethod = ref('')
const uId = ref()
//全部菜单名称 key:value  ===> nId:nName
interface IMenuName {
  [propName: string]: string
}
//全部角色菜单权限  key:value  ===> rid:rPower
/* interface IRolesPower {
  [propName: string]: string[]
} */
let menusName = reactive({}) as IMenuName
/* let rolesPower = reactive({}) as IRolesPower */
//显示模态框
const showAddEdit = (method: string, id = '') => {
  uId.value = id
  dialogFormVisible.value = true
  dialogMethod.value = method
}
const ShowCustomMenu= (id:number)=>{
  uId.value = id
  dialogFormPower.value = true
}
//删除员工
const romoveUser = (id: number) => {
  delUsers(id).then((res: any) => {
    if (res == '1') {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      getUsersList()
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error',
      })
    }

  })
}
//关闭模态框
const closeAddEdit = () => {
  dialogFormVisible.value = false
  dialogFormPower.value = false
  getUsersList()
}
//获取员工列表
const getUsersList = () => {
  getAllUsers(1).then((res: any) => {
    console.log(res);
    usersDate.value = res
  })
}
//upower去重
const filterCustomMenu = (row: any) => {
  let rPower = row.rPower.split(',')
  let uPower = row.uPower.split(',').filter((item: string) => {
    if (rPower != undefined) {
      if (!rPower.includes(item)) {
        return item
      }
    }
  })
  return uPower

}
onMounted(() => {
  getUsersList()
  //获取全部的菜单的nId和nName中 存到 menuName中
  getAllNav().then((res: any) => {
    res.forEach((item: any) => {
      const key = item.nId
      menusName[key] = item.nName
    })
  })
 /*  //获取全部角色菜单权限 存到 rolesPower 中
  getAllRoles().then((res: any) => {
    res.forEach((item: any) => {
      const key = item.rId
      rolesPower[key] = item.rPower.split(',')
    })
  }) */
})



</script>
  
<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.breadcrumb {

  padding-bottom: 10px;
  border-bottom: #ccc 1px solid;
}

.table-data {
  margin-top: 20px;
}

.addMenu {
  margin-bottom: 10px;
}
</style>