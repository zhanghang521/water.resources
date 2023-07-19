<template>
  <div class="container">
    <div class="table-data">
      <div class="addMenu"><el-button type="primary" plain size="small" @click="showAddEdit('add')">+ 新增</el-button></div>
      <el-table :data="scProductDate" style="width: 100%;" :row-style="{ height: '50px' }"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266', textAlign: 'center' }">
        <el-table-column prop="pId" label="ID" width="180" />
        <el-table-column prop="pName" label="产品名称" />
        <el-table-column prop="pFalg" label="pFalg" />
        <el-table-column prop="pImg" label="产品图片" >
          <template #default="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.pImg"
                :zoom-rate="1.2"
                fit="cover"
                z-index="1000"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pPrice" label="产品价格" />
        <el-table-column prop="pInfo" label="产品介绍" />
        <el-table-column prop="scId" label="所属公司" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <div>
              <el-button type="primary" link @click="showAddEdit('edit', scope.row.pId)">修改</el-button>
              <el-popconfirm width="250px" title="删除后无法恢复，确认删除吗？" @confirm="delSCProduct(scope.row.pId)" confirm-button-text="确认" cancel-button-text="取消">
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
    <AddAndEdit v-if="dialogFormVisible" :scId="scId" :pId='pId' :dialogFormVisible="dialogFormVisible" :dialogMethod="dialogMethod"
      @dialogFormClose="closeAddEdit"></AddAndEdit>
  </div>
</template>
  
<script lang="ts" setup>
import AddAndEdit from "./components/AddAndEdit.vue"
import { scProductDataType } from "@/types/scProduct"
import { onMounted, ref } from "vue"
import {  delProduct, getAllProduct } from "@/request/scProduct"
import { ElMessage } from 'element-plus'
import { useRoute } from "vue-router"
const scProductDate = ref<scProductDataType[]>([])
const dialogFormVisible = ref(false)
const dialogMethod = ref('')
const scId = ref('')
const pId = ref()
const route = useRoute()
//显示模态框
const showAddEdit = (method: string, id = '') => {
  pId.value = id
  dialogFormVisible.value = true
  dialogMethod.value = method
}
//删除产品
const delSCProduct = (id: number) => {
  delProduct(id).then((res: any) => {
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
  getSCProductList()
  })
}
//关闭模态框
const closeAddEdit = () => {
  dialogFormVisible.value = false
  getSCProductList()
}
//获取产品列表
const getSCProductList = () => {
  scId.value= route.params.id as string
  getAllProduct(scId.value).then((res:any)=>{
    scProductDate.value = res
  })
}
onMounted(() => {
  getSCProductList()
})


</script>
  
<style scoped>
.container {
  width: 100%;
  height: 100%;
}


.table-data {
  margin-top: 20px;
}

.addMenu {
  margin-bottom: 10px;
}
</style>