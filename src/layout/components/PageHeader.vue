<template>
    <div class="page-header">
        <div class="users">

            <div class="header-left">
                <!-- 菜单隐藏 -->
                <el-radio-group v-model="isCollapse">
                    <el-button link @click="showMenu">
                        <el-icon size="20">
                            <Expand color="#404040" v-if="isCollapse" />
                            <Fold color="#404040" v-else />
                        </el-icon>
                    </el-button>
                </el-radio-group>
                <!-- 面包屑 -->
                <div style="margin-left:30px">
                    <Breadcrumb v-if="router.currentRoute.value.name!='ScProduct'"><template #menuName> {{ route.meta.title }} </template></Breadcrumb>
                    <Breadcrumb v-else><template #menuName> 子公司管理 </template><template #menuChildern>{{ route.meta.title }}</template></Breadcrumb>
                </div>
            </div>
            <div class="header-right">
                <span class="screen" @click="screen">
                    <i class="iconfont icon-quanping" v-if="!fullScreen"></i>
                    <i class="iconfont icon-quxiaoquanping" v-else></i>
                </span>
                
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <div class="block">
                            <img class="avartr"
                                :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                            <span class="userName">{{ $store.state.uInfo.uName || '时倾' }}</span>
                        </div>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item class="clearfix" @click="logout()">
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue"
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
//全屏插件
import screenfull from 'screenfull'
const fullScreen = ref(false)

const $emit = defineEmits(['showMenu'])
const route = useRoute()
const router= useRouter()

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('uInfo')
    window.location.reload();
}

//菜单伸缩
const isCollapse = ref(false)
const showMenu = () => {
    isCollapse.value = !isCollapse.value
    $emit('showMenu', isCollapse.value)
}
//全屏显示
const screen = () => {
    if (screenfull.isEnabled) {
        ElMessage({
            type: 'error',
            message: '当前浏览器不支持全屏'
        })
    } else {
        screenfull.toggle()
        fullScreen.value = !fullScreen.value
    }


}
</script>

<style scoped>
.page-header {
    height: 100%;
}

.header-left {
    display: flex;
    justify-content: center;
    align-items: center;
}

.users {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
}

.avartr {
    width: 35px;
    height: 35px;
    vertical-align: middle;
    margin-right: 10px;
}

.userName {
    font-size: 16px;
    color: rgb(56, 56, 56);
}

.logo {
    font-size: 16px;
    color: rgb(65, 65, 65);
}
.screen{
    margin-right: 20px;
}
.screen>i{
    font-size: 30px;
    color: #404040;
}
</style>