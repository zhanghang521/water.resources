<template>
  <div class="container">
    <div class="table-data">
      <div class="addMenu"><el-button type="primary" plain size="small" @click="showAddEdit('add')">+ 新增</el-button></div>
      <el-table :data="sonComDate" style="width: 100%;" :row-style="{ height: '50px' }"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266', textAlign: 'center' }">
        <el-table-column prop="scId" label="ID" width="50" />
        <el-table-column prop="scName" label="公司名称" />
        <el-table-column prop="scMan" label="公司负责人" />
        <el-table-column prop="scTel" label="公司电话" />
        <el-table-column prop="scWebUrl" label="公司网址" />
        <el-table-column prop="scLogo" label="公司LOGO" >
          <template #default="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.scLogo"
                :zoom-rate="1.2"
                fit="cover"
                z-index="1000"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="uName" label="公司管理员" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <div>
              <el-button type="primary" link @click="showAddEdit('edit', scope.row.scId)">修改</el-button>
              <el-popconfirm width="250px" title="删除后无法恢复，确认删除吗？" @confirm="delSonCom(scope.row.scId)" confirm-button-text="确认" cancel-button-text="取消">
                <template #reference>
                  <el-button type="danger" link >删除</el-button>
                </template>
              </el-popconfirm>
              <router-link :to="{name:'ScProduct',params:{id:scope.row.scId}}">
                <el-button type="primary" link >产品管理</el-button>
              </router-link>
              
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <AddAndEdit v-if="dialogFormVisible" :scId="scId" :dialogFormVisible="dialogFormVisible" :dialogMethod="dialogMethod"
      @dialogFormClose="closeAddEdit"></AddAndEdit>
  </div>
</template>
  
<script lang="ts" setup>
import AddAndEdit from "./components/AddAndEdit.vue"
import { sonComDataType } from "@/types/sonCom"
import { onMounted, ref } from "vue"
import { delSC, getAllSC } from "@/request/sonCom"
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"
const sonComDate = ref<sonComDataType[]>([])
const dialogFormVisible = ref(false)
const dialogMethod = ref('')
const scId = ref()
const router = useRouter()
//显示模态框
const showAddEdit = (method: string, id = '') => {
  scId.value = id
  dialogFormVisible.value = true
  dialogMethod.value = method
}
//删除公司
const delSonCom = (id: number) => {
  delSC(id).then((res: any) => {
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
    getSonComList()
  })
}
//关闭模态框
const closeAddEdit = () => {
  dialogFormVisible.value = false
  getSonComList()
}
//获取公司列表
const getSonComList = () => {
  getAllSC().then((res: any) => {
    sonComDate.value = res
  })
}
onMounted(() => {
  getSonComList()
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