<template>
  <div class="container">
    <div class="breadcrumb">
      <Breadcrumb><template #menuName> 菜单管理 </template></Breadcrumb>
    </div>
    <div class="table-data">
      <div class="addMenu"><el-button type="primary" plain size="small" @click="showAddEdit('add')">+ 新增</el-button></div>
      <el-table :data="menuDate" style="width: 100%;" :row-style="{ height: '50px' }"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266', textAlign: 'center' }">
        <el-table-column prop="nId" label="ID" width="180" />
        <el-table-column prop="nName" label="菜单名称" />
        <el-table-column prop="nLevel" label="菜单级别" />
        <el-table-column prop="nUrl" label="菜单路径" />
        <el-table-column prop="nPid" label="菜单Pid" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <div>
              <el-button type="primary" link @click="showAddEdit('edit', scope.row.nId)">修改</el-button>
              <el-popconfirm title="删除后无法恢复，确认删除吗？" @confirm="delMenu(scope.row.nId)" confirm-button-text="确认" cancel-button-text="取消">
                <template #reference>
                  <el-button type="danger" link >删除</el-button>
                </template>
              </el-popconfirm>
              
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <AddAndEdit v-if="dialogFormVisible" :nId="nId" :dialogFormVisible="dialogFormVisible" :dialogMethod="dialogMethod"
      @dialogFormClose="closeAddEdit"></AddAndEdit>
  </div>
</template>
  
<script lang="ts" setup>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue"
import AddAndEdit from "./components/AddAndEdit.vue"
import { menuDataType, MenuType } from "@/types/menu"
import { onMounted, reactive, ref } from "vue"
import { delNav, getAllNav, getOneNav } from "@/request/menu"
import { Alignment } from "element-plus/es/components/table-v2/src/constants"
import { ElMessage } from 'element-plus'
const menuDate = ref<menuDataType[]>([])
const dialogFormVisible = ref(false)
const dialogMethod = ref('')
const nId = ref('')
//显示模态框
const showAddEdit = (method: string, id = '') => {
  nId.value = id
  console.log(id);
  dialogFormVisible.value = true
  dialogMethod.value = method
}
//删除菜单
const delMenu = (id: string) => {
  delNav(id).then((res: any) => {
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
    getMenusList()
  })
}
//关闭模态框
const closeAddEdit = () => {
  dialogFormVisible.value = false
  getMenusList()
}
//获取菜单列表
const getMenusList = () => {
  getAllNav().then((res: any) => {
    menuDate.value = res
  })
}
onMounted(() => {
  getMenusList()
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