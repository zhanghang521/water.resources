<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="dialogMethod == 'add' ? '添加部门' : '修改部门'" @close="dialogFormClose">
            <el-form :model="dept" ref="ruleFormRef" :rules="rules">
                <el-form-item prop="dName" label="部门名称" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="dept.dName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="dCount" label="部门人数" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model.number="dept.dCount" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="dAddr" label="部门地址" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="dept.dAddr" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="uId" label="部门负责人" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-select v-model="dept.uId" placeholder="请选择部门负责人">
                        <el-option label="admins" value="1" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormClose">取消</el-button>
                    <el-button type="primary" @click="AddOrEditConfirm(ruleFormRef)">
                        {{ dialogMethod == 'add' ? '添加' : '修改' }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {  deptType,RuleForm } from "@/types/dept"
import { addNav, getOneNav, updateNav } from '@/request/menu'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { addDept, getOneDept, updateDept } from '@/request/dept'
//接受参数
const props = defineProps({
    //添加或修改
    dialogMethod: {
        type: String
    },
    //是否显示
    dialogFormVisible: {
        type: Boolean
    },
    dId: {
        type: Number,
        default: ''
    }
})
const ruleFormRef = ref<FormInstance>()
const $emit = defineEmits(['dialogFormClose'])
const formLabelWidth = '100px'
const dialogFormVisible = ref(false)
const dept = reactive<deptType>({
    dName:null,
    dCount:null,
    dAddr:null,
    uId:null,
})

const rules = reactive<FormRules<RuleForm>>({
    dName: [
        { required: true, message: '请输入部门名称', trigger: 'blur' },
    ],
    dCount: [
        {
            required: true,
            message: '请输入部门人数',
            trigger: 'blur',
        },
    ],
    dAddr: [
        {
            required: true,
            message: '请输入部门地址',
        },
    ],
    uId: [
        {
            required: true,
            message: '请选择部门负责人',
        },
    ]
})



//关闭模态框
const dialogFormClose = () => {
    dialogFormVisible.value = false
    $emit('dialogFormClose', false)
}
onMounted(() => {
    dialogFormVisible.value = props.dialogFormVisible
    if (props.dialogMethod == 'edit') {
        getOneDept(props.dId).then((res: any) => {
            dept.dName = res.dName
            dept.dCount = res.dCount
            dept.dAddr = res.dAddr
            dept.uId = res.uId
        })
    }
})
//确认添加或修改
const AddOrEditConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (props.dialogMethod == 'add') {
                //添加
                addDept(dept).then((res: any) => {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    dialogFormClose()
                })
            }else{
                //修改
                updateDept({ dId: props.dId, ...dept }).then((res: any) => {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                dialogFormClose()
            })
            }

        }
    })
}

</script>

<style scoped></style>