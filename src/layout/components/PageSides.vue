<template>
    <div>
        <el-menu
          style="height:100vh"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="defaultKey"
          text-color="#fff"
          :router="true"
          
          @select="selectMenu"
        >
        <h5 class="logo mb-2">河北省水利系统</h5>
         <template v-for="(item,index) in props.menuList" :key="index">
          <!-- 双层菜单 -->
            <template v-if="item.children.length>1">
              <el-sub-menu  >
                <template #title>
                  <el-icon><i class="iconfont" :class="item?.meta?.icon"></i></el-icon>
                  <span>{{item?.meta?.title || ''}}</span>
                </template>
                <template v-for="(i,index2) in item.children" :key="index2">
                  <el-menu-item :index="item.path +'/'+ i.path">{{i?.meta?.title || ''}}</el-menu-item>
                </template>
              </el-sub-menu>
            </template>
            <!-- 单层菜单 -->
          <el-menu-item v-else :index="item.path +'/'+ item.children[0].path" >
            <el-icon><i class="iconfont" :class="item.children[0]?.meta?.icon"></i></el-icon>
            <span>{{item.children[0]?.meta?.title || ''}}</span>
          </el-menu-item>
         </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue"
import { useRoute,useRouter } from "vue-router"

const props = defineProps({
  menuList:{
    type:Array
  }
})
const route = useRoute()
const router = useRouter()
const defaultKey = ref<string>('/')

const selectMenu = (index:string)=>{
    // console.log(e);
   /*  console.log( route.fullPath);
    console.log(router.currentRoute.value.fullPath); */
    defaultKey.value = router.currentRoute.value.fullPath
/*     console.log(defaultKey.value); */
}

onMounted(()=>{
    //页面刷新当前菜单保持激活状态
    console.log(route.path);
    defaultKey.value =router.currentRoute.value.fullPath
})
</script>

<style scoped>
.logo{
    box-sizing: border-box;
    background-color: rgb(67, 74, 80);
    margin: 0;
    padding: 15px;
    text-align: center;
    font-size: 16px;
    color:aliceblue;
    height: 50px;
}
.el-menu-item{
    text-align: center;
    /*justify-content: center;*/
    padding-left: 80px ;
}
.el-menu {
    border:none
}
</style>