<template>
  <div class="container">
    <div class="breadcrumb">
      <Breadcrumb><template #menuName> 角色管理 </template></Breadcrumb>
    </div>
    <div class="table-data">
      <div class="addMenu"><el-button type="primary" plain size="small" @click="showAddEdit('add')">+ 新增</el-button></div>
      <el-table :data="rolesDate" style="width: 100%;" :row-style="{ height: '50px' }"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266', textAlign: 'center' }">
        <el-table-column prop="rId" label="ID" width="180" />
        <el-table-column prop="rName" label="角色名称" />
        <el-table-column prop="rPower" label="菜单权限" width="400">
          <template #default="scope">
            <span v-for="(item, index) in (scope.row.rPower.split(','))" :key="index">
              <el-tag class="ml-2" type="info">{{ menusName[item] }}</el-tag> &nbsp; 
             <!--  <el-tag class="ml-2" type="info">{{ item }}</el-tag> &nbsp; -->
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ROLL_ADD" label="新增权限">
          <template #default="scope">
            <div>
              <el-tag v-if="scope.row.ROLL_ADD == 2" class="ml-2" type="success">允许</el-tag>
              <el-tag v-else class="ml-2" type="danger">禁止</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ROLE_UPDATE" label="修改权限">
          <template #default="scope">
            <div>
              <el-tag v-if="scope.row.ROLE_UPDATE == 2" class="ml-2" type="success">允许</el-tag>
              <el-tag v-else class="ml-2" type="danger">禁止</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <div>
              <el-button type="primary" link @click="showAddEdit('edit', scope.row.rId)">修改</el-button>
              <el-popconfirm title="删除后无法恢复，确认删除吗？" @confirm="romoveRoles(scope.row.rId)" confirm-button-text="确认"
                cancel-button-text="取消"
                width="250px">
                <template #reference>
                  <el-button type="danger" link>删除</el-button>
                </template>
              </el-popconfirm>

            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <AddAndEdit v-if="dialogFormVisible" :rId="rId" :dialogFormVisible="dialogFormVisible" :dialogMethod="dialogMethod"
      @dialogFormClose="closeAddEdit"></AddAndEdit>
  </div>
</template>
  
<script lang="ts" setup>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue"
import AddAndEdit from "./components/AddAndEdit.vue"
import { rolesDataType } from "@/types/roles"
import { onMounted, reactive, ref } from "vue"
import { ElMessage } from 'element-plus'
import { getAllRoles, delRoles } from "@/request/roles"
import { getAllNav } from "@/request/menu"
const rolesDate = ref<rolesDataType[]>([])
const dialogFormVisible = ref(false)
const dialogMethod = ref('')
const rId = ref()
//全部菜单名称 key:value  ===> nId:nName
interface IMenuName {
  [propName: string]: any
}
let menusName = reactive({}) as IMenuName
//显示模态框
const showAddEdit = (method: string, id = '') => {
  rId.value = id
  dialogFormVisible.value = true
  dialogMethod.value = method
}
//删除角色
const romoveRoles = (id: number) => {
  delRoles(id).then((res: string) => {
    if (res == '1') {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      getRolesList()
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
  getRolesList()
}
//获取角色列表
const getRolesList = async () => {
  getAllRoles().then((res: any) => {
    rolesDate.value = res
  })
}
onMounted(() => {
  getRolesList()
  //获取全部的菜单的nId和nName中 存到 menuName中
  getAllNav().then((res: any) => {
    res.forEach((item: any) => {
      const key = item.nId
      menusName[key] = item.nName
    })
  })
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