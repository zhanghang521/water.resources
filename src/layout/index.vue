<template>
    <el-row :gutter="0">
        <el-col :span="3">
            <PageSides :menuList="store.state.menus"></PageSides>
        </el-col>
        <el-col :span="21" style="position:relative">
            <el-row style="margin:0">
                <el-col class="header">
                   <PageHeader></PageHeader>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <router-view></router-view>
                </el-col>
            </el-row>
            <div class="footer">
                <div>河北水利系统 &copy; 2023</div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import PageSides from './components/PageSides.vue';
import PageHeader from './components/PageHeader.vue';
import {useStore} from "vuex"
import { onMounted } from 'vue';
import {initMenu} from '@/utils/menus'
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
onMounted(()=>{

})
</script>

<style>
.header{
    height: 50px;
    background-color: rgb(67, 74, 80);
}
.footer{
   position: absolute;
   bottom: 0;
   width: 100%;
   text-align: center;
   font-size: 14px;
   padding-bottom: 10px;
}
</style>