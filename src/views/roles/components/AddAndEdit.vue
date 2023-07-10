<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="dialogMethod == 'add' ? '添加菜单' : '修改菜单'" @close="dialogFormClose">
            <el-form :model="rolse" ref="ruleFormRef" :rules="rules">
                <el-form-item prop="rName" label="角色名称" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="rolse.rName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="rPower" label="菜单权限" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-checkbox-group v-model="rolse.rPower"
                        style="border:1px solid#dcdfe6;padding:20px;border-radius:5px">
                        <div v-for="(item) in menusGroup" :key="item.nId" style="display:inline-block;margin-left:20px">
                            <el-checkbox :label="item.nId" name="rPower">{{ item.nName }}</el-checkbox>
                        </div>
                    </el-checkbox-group>
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
import { rolesType, RuleForm } from "@/types/roles"
import { menuDataType } from "@/types/menu"
import {  getAllNav } from '@/request/menu'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { addRoles, getOneRoles, updateRoles } from '@/request/roles'
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
    rId: {
        type: Number,
        default: ''
    }
})
const ruleFormRef = ref<FormInstance>()
const $emit = defineEmits(['dialogFormClose'])
const formLabelWidth = '100px'
const dialogFormVisible = ref(false)
const rolse = reactive<rolesType>({
    rName: null,
    rPower: [],
})
//获取全部菜单
const menusGroup = ref<menuDataType[]>([])
const rules = reactive<FormRules<RuleForm>>({
    rName: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
    rPower: [
        {
            required: true,
            message: '请选择菜单权限',
            trigger: 'blur',
        },
    ],
})



//关闭模态框
const dialogFormClose = () => {
    dialogFormVisible.value = false
    $emit('dialogFormClose', false)
}
onMounted(() => {
    //封装menu列表
    getAllNav().then((res: any) => {
        menusGroup.value = res
    })

    dialogFormVisible.value = props.dialogFormVisible
    if (props.dialogMethod == 'edit') {
        getOneRoles(props.rId).then((res: any) => {
            rolse.rName = res.rName
            rolse.rPower = res.rPower as string
            //将字符串 rPower 转成数组
            rolse.rPower = rolse.rPower.split(',')
        })
    }
})
//确认添加或修改
const AddOrEditConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //将 数组rPower 转成 字符串 
            let str = ''
            const arr = rolse.rPower as string[]
            arr.forEach((item: string) => {
                str = str + item + ','
            })
            str = str.substring(0, str.length - 1);
            rolse.rPower = str

            if (props.dialogMethod == 'add') {
                //添加
                addRoles(rolse).then((res: any) => {
                    if (res == 1) {
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                        dialogFormClose()
                    }
                })
            } else {
                //修改
                updateRoles({ rId: props.rId, ...rolse }).then((res: any) => {
                    if (res == 1) {
                        ElMessage({
                            message: '修改成功',
                            type: 'success',
                        })
                        dialogFormClose()
                    } else {
                        ElMessage({
                            message: '修改失败',
                            type: 'error',
                        })
                    }
                })
            }

        }
    })
}

</script>

<style scoped></style>