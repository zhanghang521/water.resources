<template>
    <div>
        <el-dialog v-model="dialogFormPower" :title="'请设置' + userName + '的自定义权限'" @close="dialogFormClose">
            <el-form :model="userPower" ref="ruleFormRef" :rules="rules">
                <el-form-item prop="uPower" label="菜单权限" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-checkbox-group v-model="userPower.uPower"
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
                    <el-button type="primary" @click="EditUserPower(ruleFormRef)">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { getAllNav } from '@/request/menu'
import { getOneUsers, usersPower } from '@/request/users'
import { menuDataType } from '@/types/menu'
import { IUsersPower, RuleFormUsersPower } from '@/types/users'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
//接受参数
const props = defineProps({
    dialogFormPower: {
        type: Boolean
    },
    uId: {
        type: Number,
        default: 0
    }
})
const store = useStore()
const ruleFormRef = ref<FormInstance>()
const $emit = defineEmits(['dialogFormClose'])
const formLabelWidth = '100px'
const dialogFormPower = ref(false)
dialogFormPower.value = props.dialogFormPower
const userName = ref('')
//用于修改的数据结构
const userPower = reactive<IUsersPower>({
    uPower: []
})
//存储全部菜单
const menusGroup = ref<menuDataType[]>([])

const rules = reactive<FormRules<RuleFormUsersPower>>({
    uPower: [
        {
            required: true,
            message: '请选择菜单权限',
            trigger: 'blur',
        },
    ]


})

//关闭模态框
const dialogFormClose = () => {
    dialogFormPower.value = false

    $emit('dialogFormClose', false)
}
onMounted(() => {
    //获取menu列表
    getAllNav().then((res: any) => {
        menusGroup.value = res
    })
    //获取当前员工信息
    getOneUsers(props.uId).then((res: any) => {
        userName.value = res.uName
        userPower.uPower = res.uPower.split(',')
    })
   
})
//确认添加或修改
const EditUserPower = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //将 数组uPower 转成 字符串 
            let str = ''
            const arr = userPower.uPower as string[]
            arr.forEach((item: string) => {
                str = str + item + ','
            })
            str = str.substring(0, str.length - 1);
            userPower.uPower = str

            usersPower(props.uId, userPower.uPower).then((res: any) => {
                if (res == 1) {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                    store.dispatch('addRouter')
                    dialogFormClose()
                    /* setTimeout(() => {
                        location.reload()
                    }, 100); */
                } else {
                    ElMessage({
                        message: '修改失败',
                        type: 'error',
                    })
                }
            })


        }
    })
}

</script>

<style scoped></style>