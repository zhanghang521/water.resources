<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="dialogMethod == 'add' ? '添加产品' : '修改产品'" @close="dialogFormClose">
            <el-form :model="scProduct" ref="ruleFormRef" :rules="rules">
                <el-form-item prop="pName" label="产品名称" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="scProduct.pName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="pFalg" label="产品pFalg" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="scProduct.pFalg" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="pPrice" label="产品价格" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="scProduct.pPrice" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="pInfo" label="产品介绍" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-input v-model="scProduct.pInfo" autocomplete="off" />
                </el-form-item>
                <el-form-item v-if="props.dialogMethod=='add' " prop="scId" label="所属公司" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <!-- <el-input v-model="sonCom.uId" autocomplete="off" /> -->
                    <el-select v-model="scProduct.scId" placeholder="请选择管理员">
                        <el-option  :label="scName" :value="props.scId" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="pImg" label="产品图片" :label-width="formLabelWidth" style="width:60%;margin:20px auto">
                    <el-upload ref="upload" class="upload-demo" action="http://localhost:9999/api/sonCom/getPic.php"
                        :limit="1" :on-success="handleUpload"  :before-remove="removeUpdate" :auto-upload="false"
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
import { scProductType, RuleForm } from "@/types/scProduct"
import { addProduct, getOneProduct, updateProduct } from '@/request/scProduct'
import { FormInstance, FormRules, genFileId, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getOneSC } from '@/request/sonCom'
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
        type: String,
        default: ''
    },
    pId: {
        type: String,
        default: ''
    }
})
const updSuccess = ref(false)
updSuccess.value = props.dialogMethod == 'edit' ? true : false
const ruleFormRef = ref<FormInstance>()
const $emit = defineEmits(['dialogFormClose'])
const formLabelWidth = '100px'
const dialogFormVisible = ref(false)
const scProduct = reactive<scProductType>({
    pName: '',
    pFalg: '',
    pImg: '',
    pPrice: '',
    pInfo: '',
    scId: ''
})
const scName = ref('')
//备份原图片路径
const oldFile = ref('')
const upload = ref<UploadInstance>()
const rules = reactive<FormRules<RuleForm>>({
    pName: [
        { required: true, message: '请输入公司名称', trigger: 'blur' },
    ],
    pFalg: [
        {
            required: true,
            message: '请输入pFalg',
            trigger: 'blur',
        },
    ],
    pImg: [
        {
            required: true,
            message: '请选择产品图片',
        },
    ],
    pPrice: [
        {
            required: true,
            message: '请输入产品价格',
        },
    ],
    pInfo: [
        {
            required: true,
            message: '请输入产品介绍',
        },
    ],
    scId: [
        {
            required: true,
            message: '请选择所属公司',
        },
    ]
})

//图片上传成功的回调
const handleUpload = (res: any) => {
    scProduct.pImg = res
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
const removeUpdate = (file:any) => {
    if (props.dialogMethod == 'edit') {
        scProduct.pImg = oldFile.value
        updSuccess.value = true
    } else {
        scProduct.pImg = ''
        updSuccess.value = false
    }
}

//关闭模态框
const dialogFormClose = () => {
    dialogFormVisible.value = false
    $emit('dialogFormClose', false)
}
onMounted(() => {
    scProduct.scId = props.scId
    dialogFormVisible.value = props.dialogFormVisible
    getOneSC(parseInt(props.scId)).then((res:any)=>{
        scName.value = res.scName
    })
    if (props.dialogMethod == 'edit') {
        getOneProduct(parseInt(props.pId)).then((res: any) => {
            scProduct.pName = res.pName
            scProduct.pFalg = res.pFalg
            scProduct.pImg = res.pImg
            scProduct.pPrice = res.pPrice
            scProduct.pInfo = res.pInfo
            scProduct.scId = res.scId
            oldFile.value = res.pImg
        })
    }
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
                addProduct(scProduct).then((res: any) => {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    dialogFormClose()
                })
            } else {
                //修改
                updateProduct({pId:props.pId,...scProduct,file:scProduct.pImg}).then((res: any) => {
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