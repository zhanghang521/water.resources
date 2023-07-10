<template>
    <div class="login">
        <div id="login_box">
            <h2>河北省水利系统</h2>
            <el-form :model="loginForm" :rules="rules" ref="formRef">
                <el-form-item prop="uName">
                    <el-input type="text" v-model="loginForm.uName" suffix-icon="el-icon-user-solid"
                        placeholder="请输入您的账号"></el-input>
                </el-form-item>
                <el-form-item prop="uPwd" style="background:transparent;">
                    <el-input type="password" v-model="loginForm.uPwd" suffix-icon="el-icon-lock"
                        placeholder="请输入您的密码"></el-input>
                </el-form-item>
            </el-form>
            <el-button id="sign_in" @click="submitForm()">登录</el-button>
            <el-button class="shou" @click="showAddWin()">注册</el-button>
            <br>
            <div id="sign_up">
                <a href="javascript:;">忘记密码?</a>
            </div>
        </div>
        <Vcode :show="isShow" @success="success" @close="close" @fail="fail"></Vcode>
    </div>
</template>

<script setup lang="ts">
import Vcode from "vue3-puzzle-vcode";
import { ref, reactive, onMounted } from 'vue'
import { ILoginForm } from '@/types/users'
import { FormInstance, FormRules ,ElMessage } from 'element-plus'
import { login } from '@/request/users'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";
import {initMenu} from "@/utils/menus"

const store = useStore()
onMounted(() => {
})
const loginForm = reactive<ILoginForm>({
    uName: 'admins',
    uPwd: '123456'
})
const rules = reactive<FormRules<ILoginForm>>({
    uName: [
        {
            required: true,
            message: '请输入用户名',
        }
    ],
    uPwd: [
        {
            required: true,
            message: '请输入密码',
        },
    ],
})
//滑块验证
const isShow = ref(false);
const submit = () => {
    isShow.value = true;
};
const success = (msg) => {
    store.dispatch('login', loginForm).then(res => {
        if (typeof res == 'object') {
            ElMessage({
                message:'登录成功',
                type:'success'
            })
            
            if (!route.query) {
                router.push({ path: '/' })
            } else {
                router.push({ path: `${route.query.redirect}` })
            }

        } else if (res == 'errors') {
            ElMessage({
                message:'用户名不存在',
                type:'error'
            })
        } else {
            ElMessage({
                message:'密码错误',
                type:'error'
            })
        }
        close()
    })
}
// 用户点击遮罩层，应该关闭模态框
const close = () => {
    isShow.value = false;
};
// 用户验证失败
const fail = () => {
    console.log("验证失败");
};
const router = useRouter()
const route = useRoute()
const formRef = ref();
const submitForm = () => {
    formRef.value.validate((valid: any) => {
        if (valid) {
            // alert('submit!');
            submit()
        } else {
            // console.log('');
            return false;
        }
    });

}
const resetForm = () => {
    formRef.value.resetFields();
}
</script>

<style scoped>
.login {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/login.png') no-repeat;
    background-size: 100% auto;
    padding-top: 10%;
}

#login_box {
    width: 20%;
    height: 400px;
    background-color: #00000060;
    margin: auto;
    text-align: center;
    border-radius: 10px;
    padding: 50px 50px;
}

#login_box input,
#login_box button {
    outline: none;
}

#login_box h2 {
    color: #ffffff90;
    margin-top: 5%;
}

#login_box #form #input_box {
    margin-top: 5%;
}

#login_box #form #input_box input {
    border: 0;
    width: 60%;
    font-size: 15px;
    color: #ffffff;
    background: #ffffff00;
    border-bottom: 2px solid #ffffff;
    padding: 5px 10px;
    margin-top: 10px;
}

#login_box button {
    margin-top: 50px;
    width: 40%;
    height: 20px;
    border-radius: 10px;
    border: 0;
    color: #fff;
    font-size: 15px;
    background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
    cursor: pointer;
}

#login_box #sign_up {
    margin-top: 45%;
}

#login_box #sign_up a {
    color: #b94648;
}
</style>