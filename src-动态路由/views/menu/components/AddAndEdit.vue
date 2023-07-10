<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="dialogMethod == 'add' ? '添加菜单' : '修改菜单'" @close="dialogFormClose">
            <el-form :model="menu" ref="ruleFormRef" :rules="rules">
                <el-form-item prop="nName" label="菜单名称" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="menu.nName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="nUrl" label="菜单路径" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="menu.nUrl" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="nLevel" label="菜单级别" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-select v-model="menu.nLevel" placeholder="请选择菜单级别">
                        <el-option label="1级菜单" value="1" />
                        <el-option label="2级菜单" value="2" />
                        <el-option label="3级菜单" value="3" />
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
import { menuDataType, MenuType } from "@/types/menu"
import { addNav, getOneNav, updateNav } from '@/request/menu'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
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
    nId: {
        type: String,
        default: ''
    }
})
const ruleFormRef = ref<FormInstance>()
const $emit = defineEmits(['dialogFormClose'])
const formLabelWidth = '100px'
const dialogFormVisible = ref(false)
const menu = reactive<MenuType>({
    nName: null,
    nLevel: null,
    nUrl: null
})
interface RuleForm {
    nName: string
    nUrl: string
    nLevel: string
}
const rules = reactive<FormRules<RuleForm>>({
    nName: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
    ],
    nUrl: [
        {
            required: true,
            message: '请输入菜单路径',
            trigger: 'blur',
        },
    ],
    nLevel: [
        {
            required: true,
            message: '请选择菜单级别',
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
        console.log(props.nId);
        getOneNav(props.nId).then((res: any) => {
            menu.nName = res.nName
            menu.nLevel = res.nLevel
            menu.nUrl = res.nUrl
            console.log(res);
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
                addNav(menu).then((res: any) => {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    dialogFormClose()
                })
            }else{
                //修改
                updateNav({ nId: props.nId, ...menu }).then((res: any) => {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                dialogFormClose()
            })
            }

        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>

<style scoped></style>