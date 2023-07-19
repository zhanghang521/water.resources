<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="dialogMethod == 'add' ? '添加公司' : '修改公司'" @close="dialogFormClose">
            <el-form :model="sonCom" ref="ruleFormRef" :rules="rules">
                <el-form-item prop="scName" label="公司名称" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="sonCom.scName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="scMan" label="公司负责人" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="sonCom.scMan" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="scTel" label="公司电话" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="sonCom.scTel" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="scWebUrl" label="公司网址" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="sonCom.scWebUrl" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="uId" label="公司管理员" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <!-- <el-input v-model="sonCom.uId" autocomplete="off" /> -->
                    <el-select v-model="sonCom.uId" placeholder="请选择管理员">
                        <el-option v-for="item in users" :key="item.uId" :label="item.uName" :value="item.uId" />
                        <!-- <el-option label="Zone two" value="beijing" /> -->
                    </el-select>
                </el-form-item>
                <el-form-item prop="file" label="公司LOGO" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-upload ref="upload" class="upload-demo" action="http://localhost:9999/api/sonCom/getPic.php"
                        :limit="1" :on-success="handleUpload" :before-remove="removeUpdate" :auto-upload="false"
                        :on-exceed="handleExceed">
                        <template #trigger>
                            <el-button type="primary">
                                <el-icon>
                                    <Upload />
                                </el-icon>
                            </el-button>
                        </template>
                        <el-button style="margin:-6px 0 0 10px" type="success" @click="submitUpload">
                            <el-icon>
                                <Check />
                            </el-icon>
                        </el-button>
                    </el-upload>
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
import { sonComType, RuleForm } from "@/types/sonCom"
import { addSC, getOneSC, updateSC } from '@/request/sonCom'
import { FormInstance, FormRules, genFileId, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getAllUsers } from '@/request/users'
import { fa, tr } from 'element-plus/es/locale'
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
    scId: {
        type: Number,
        default: ''
    }
})
const updSuccess = ref(false)
updSuccess.value = props.dialogMethod == 'edit' ? true : false
const ruleFormRef = ref<FormInstance>()
const $emit = defineEmits(['dialogFormClose'])
const formLabelWidth = '100px'
const dialogFormVisible = ref(false)
const sonCom = reactive<sonComType>({
    scName: null,
    scMan: null,
    scTel: null,
    scWebUrl: null,
    uId: null,
    file: null
})
//备份原LOGO
const oldFile = ref('')
const upload = ref<UploadInstance>()
//存储全部员工
const users = ref<Object[]>([])
const rules = reactive<FormRules<RuleForm>>({
    scName: [
        { required: true, message: '请输入公司名称', trigger: 'blur' },
    ],
    scMan: [
        {
            required: true,
            message: '请输入负责人',
            trigger: 'blur',
        },
    ],
    scTel: [
        {
            required: true,
            message: '请输入公司电话',
        },
    ],
    scWebUrl: [
        {
            required: true,
            message: '请输入公司网址',
        },
    ],
    uId: [
        {
            required: true,
            message: '请选择公司管理员',
        },
    ],
    file: [
        {
            required: true,
            message: '请上传公司LOGO',
        },
    ]
})

//图片上传成功的回调
const handleUpload = (res: any) => {
    sonCom.file = res
    updSuccess.value = true
}
//超出限制替换原图片
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
//删除上传列表图片
const removeUpdate = () => {
    if (props.dialogMethod == 'edit') {
        sonCom.file = oldFile.value
        updSuccess.value = true
    } else {
        sonCom.file = null
        updSuccess.value = false
    }

}

//关闭模态框
const dialogFormClose = () => {
    dialogFormVisible.value = false
    $emit('dialogFormClose', false)
}
onMounted(() => {
    dialogFormVisible.value = props.dialogFormVisible
    if (props.dialogMethod == 'edit') {
        getOneSC(props.scId).then((res: any) => {
            sonCom.scName = res.scName
            sonCom.scMan = res.scMan
            sonCom.scTel = res.scTel
            sonCom.scTel = res.scTel
            sonCom.scWebUrl = res.scWebUrl
            sonCom.uId = res.uId
            sonCom.file = res.scLogo
            oldFile.value = res.scLogo
        })
    }
    //获取全部员工
    getAllUsers(1).then((res: any) => {
        users.value = res
    })
})
//确认上传
const submitUpload = () => {
    upload.value!.submit()
}
//确认添加或修改
const AddOrEditConfirm = async (formEl: FormInstance | undefined) => {
    if (!updSuccess.value) {
        ElMessage({
            message: '请选择图片并上传',
            type: 'warning',
        })
        return
    }
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (props.dialogMethod == 'add') {
                //添加
                addSC(sonCom).then((res: any) => {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    dialogFormClose()
                })
            } else {
                //修改
                updateSC({ scId: props.scId, ...sonCom }).then((res: any) => {
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