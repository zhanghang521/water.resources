<template>
    <div>
        <div class="common-layout">
            <el-container>
              <el-header class="header"><PageHeader @showMenu="showMenu"></PageHeader></el-header>
              <el-container>
                <el-aside style="width:auto">  <PageSides :menuList="store.state.menus" :isCollapse="isCollapse"></PageSides></el-aside>
                <el-container>
                  <el-main><router-view></router-view></el-main>
                  <el-footer style="padding-top:20px;text-align:center">江西省水利信息系统 &copy; 2023</el-footer>
                </el-container>
              </el-container>
            </el-container>
          </div>
    </div>
</template>

<script lang="ts" setup>
import PageSides from './components/PageSides.vue';
import PageHeader from './components/PageHeader.vue';
import { useStore } from "vuex"
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
//菜单展开
const isCollapse = ref(false)
const showMenu = (flag: boolean) => {
    isCollapse.value = flag
}
onMounted(() => {

})
</script>

<style>
.header {
    height: 50px;
    background-color: rgb(67, 74, 80);
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding-bottom: 10px;
}
.el-aside{
    transition: all .5s;
}
</style>