<template>
  <div>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
      :default-active="router.currentRoute.value.fullPath" text-color="#fff" :router="true" :collapse="props.isCollapse"
      >

      <el-menu-item  index="/warter/home">
        <!-- 单层菜单 -->
        <el-icon><i class="iconfont icon-home"></i></el-icon>
        <template #title>控制台</template>
      </el-menu-item>

      <template v-for="(item, index) in props.menuList" :key="index">

        <template v-if="item.children">
          <!-- 双层菜单 -->
          <el-sub-menu>
            <template #title>
              <el-icon><i class="iconfont" :class="item?.meta?.icon"></i></el-icon>
              <span>{{ item?.meta?.title || '' }}</span>
            </template>
            <template v-for="(i, index2) in item.children" :key="index2">
              <el-menu-item :index="item.path + '/' + i.path">{{ i?.meta?.title || '' }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <el-menu-item v-else :index="'/warter/' + item.path">
          <!-- 单层菜单 -->
          <el-icon><i class="iconfont" :class="item?.meta?.icon"></i></el-icon>
          <template #title>{{ item?.meta?.title || '' }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const props = defineProps({
  menuList: {
    type: Array
  },
  isCollapse: {
    type: Boolean
  }
})
const route = useRoute()
const router = useRouter()
const defaultKey = ref<string>('/')

onMounted(()=>{
  console.log(router.currentRoute.value.fullPath);
})
</script>

<style scoped>
.el-menu {
  border: none;
  height: calc(100vh - 50px)
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}
</style>