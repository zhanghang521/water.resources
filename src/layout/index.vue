<template>
    <div class="common-layout">
      <el-container>
        <!-- <el-aside style="width:auto">  <PageSides :menuList="router.options.routes[2].children" :isCollapse="isCollapse"></PageSides></el-aside> -->
        <el-aside style="width:auto">  <PageSides :menuList="store.state.menus" :isCollapse="isCollapse"></PageSides></el-aside>
        <el-container>
          <el-header class="header"><PageHeader @showMenu="showMenu"></PageHeader></el-header>
          <el-main><router-view></router-view></el-main>
          <el-footer style="padding-top:20px;text-align:center">江西省水利信息系统 &copy; 2023</el-footer>
        </el-container>
      </el-container>
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

<style scoped>
.common-layout{
  height: 100vh;
}
.header {
    height: 50px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
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