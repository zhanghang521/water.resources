<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="dialogMethod == 'add' ? '添加员工' : '修改员工'" @close="dialogFormClose">
            <el-form :model="users" ref="ruleFormRef" :rules="rules">
                <el-form-item prop="uName" label="员工用户名" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="users.uName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="uPwd" label="员工密码" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="users.uPwd" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="uTel" label="员工电话" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="users.uTel" autocomplete="off" />
                </el-form-item>
                <div v-if="props.dialogMethod == 'add'">
                    <el-form-item prop="rId" label="员工角色" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                        <el-select v-model="users.rId" placeholder="请选择员工角色">
                            <el-option v-for="item in rolesGroup" :key="item.rId" :label="item.rName" :value="item.rId" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="dId" label="员工部门" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                        <el-select v-model="users.dId" placeholder="请选择员工部门">
                            <el-option v-for="item in deptGroup" :key="item.dId" :label="item.dName" :value="item.dId" />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item prop="uPower" label="菜单权限" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-checkbox-group v-model="users.uPower"
                        style="border:1px solid#dcdfe6;padding:20px;border-radius:5px">
                        <div v-for="(item) in menusGroup" :key="item.nId" style="display:inline-block;margin-left:20px">
                            <el-checkbox :label="item.nId" name="rPower">{{ item.nName }}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item> -->
                </div>
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
import { usersType, RuleForm, usersUpdType } from "@/types/users"
import { menuDataType } from "@/types/menu"
import { rolesDataType } from "@/types/roles"
import { getAllNav } from '@/request/menu'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { addRoles, getAllRoles, getOneRoles, updateRoles } from '@/request/roles'
import { getAllDept } from '@/request/dept'
import { addUsers, getOneUsers, updateUsers } from '@/request/users'
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
    uId: {
        type: Number,
        default: ''
    }
})
const ruleFormRef = ref<FormInstance>()
const $emit = defineEmits(['dialogFormClose'])
const formLabelWidth = '100px'
const dialogFormVisible = ref(false)
//用于新增的数据结构
const users = reactive<usersType>({
    uName: null,
    uPwd: null,
    uTel: null,
    uPower: ['1'],
    rId: '1',
    dId: '1',
})
//用于修改的数据结构
const usersUpd = reactive<usersUpdType>({
    uName: null,
    uPwd: null,
    uTel: null
})
//存储全部菜单
const menusGroup = ref<menuDataType[]>([])
//存储全部部门
const deptGroup = ref<deptDataType[]>([])
//存储全部角色
const rolesGroup = ref<rolesDataType[]>([])
//全部角色菜单权限  key:value  ===> rid:rPower
interface IRolesPower {
    [propName: string]: string[]
}
let rolesPower = reactive({}) as IRolesPower

const rules = reactive<FormRules<RuleForm>>({
    uName: [
        { required: true, message: '请输入员工用户名', trigger: 'blur' },
    ],
    uPwd: [
        {
            required: true,
            message: '请输入员工密码',
            trigger: 'blur',
        },
    ],
    uTel: [
        {
            required: true,
            message: '请输入员工密码',
            trigger: 'blur',
        },
    ],
    uPower: [
        {
            required: true,
            message: '请选择菜单权限',
            trigger: 'blur',
        },
    ],
    rId: [
        {
            required: true,
            message: '请选择员工角色',
            trigger: 'blur',
        },
    ],
    dId: [
        {
            required: true,
            message: '请选择员工部门',
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
    //获取menu列表
    getAllNav().then((res: any) => {
        menusGroup.value = res
    })
    //获取全部角色
    getAllRoles().then((res: any) => {
        rolesGroup.value = res
        res.forEach((item: any) => {
            const key = item.rId
            rolesPower[key] = item.rPower.split(',')
        })
    })
    //获取全部部门
    getAllDept().then((res: any) => {
        deptGroup.value = res
    })

    dialogFormVisible.value = props.dialogFormVisible
    if (props.dialogMethod == 'edit') {
        getOneUsers(props.uId).then((res: any) => {
            console.log(res);
            users.uName = res.uName
            users.uPwd = res.uPwd
            users.uTel = res.uTel
            users.rId = res.rId
            users.dId = res.dId
            users.uPower = res.uPower as string
            //将字符串 rPower 转成数组
            if (users.uPower) {
                users.uPower = users.uPower.split(',')
            }

        })
    }
})
//确认添加或修改
const AddOrEditConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //根据rId设置uPower
       
            //将 数组rPower 转成 字符串 
            let str = ''
            const arr = rolesPower[users.rId]
            arr.forEach((item: string) => {
                str = str + item + ','
            })
            str = str.substring(0, str.length - 1);
            users.uPower = str

            if (props.dialogMethod == 'add') {
                //添加
                addUsers(users).then((res: any) => {
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
                usersUpd.uName = users.uName
                usersUpd.uPwd = users.uPwd
                usersUpd.uTel = users.uTel
                updateUsers({ uId: props.uId, ...usersUpd }).then((res: any) => {
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