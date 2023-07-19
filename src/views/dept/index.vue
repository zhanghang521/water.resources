<template>
  <div class="container">
    <div class="table-data">
      <div class="addMenu"><el-button type="primary" plain size="small" @click="showAddEdit('add')">+ 新增</el-button></div>
      <el-table :data="deptDate" style="width: 100%;" :row-style="{ height: '50px' }"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266', textAlign: 'center' }">
        <el-table-column prop="dId" label="部门ID" width="180" />
        <el-table-column prop="dName" label="部门名称" />
        <el-table-column prop="dCount" label="部门人数" />
        <el-table-column prop="dAddr" label="部门地址" />
        <el-table-column prop="uId" label="部门负责人" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <div>
              <el-button type="primary" link @click="showAddEdit('edit', scope.row.dId)">修改</el-button>
              <el-popconfirm width="250px" title="删除后无法恢复，确认删除吗？" @confirm="removeDept(scope.row.dId)" confirm-button-text="确认" cancel-button-text="取消">
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
    <AddAndEdit v-if="dialogFormVisible" :dId="dId" :dialogFormVisible="dialogFormVisible" :dialogMethod="dialogMethod"
      @dialogFormClose="closeAddEdit"></AddAndEdit>
  </div>
</template>
  
<script lang="ts" setup>
import AddAndEdit from "./components/AddAndEdit.vue"
import { deptDataType } from "@/types/dept"
import { onMounted, ref } from "vue"
import { delDept, getAllDept } from "@/request/dept"
import { ElMessage } from 'element-plus'
const deptDate = ref<deptDataType[]>([])
const dialogFormVisible = ref(false)
const dialogMethod = ref('')
const dId = ref()
//显示模态框
const showAddEdit = (method: string, id = '') => {
  dId.value = id
  dialogFormVisible.value = true
  dialogMethod.value = method
}
//删除部门
const removeDept = (id: number) => {
  delDept(id).then((res: any) => {
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
  getDeptList()
  })
}
//关闭模态框
const closeAddEdit = () => {
  dialogFormVisible.value = false
  getDeptList()
}
//获取部门列表
const getDeptList = () => {
  getAllDept().then((res: any) => {
    deptDate.value = res
  })
}
onMounted(() => {
  getDeptList()
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