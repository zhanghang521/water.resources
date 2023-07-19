<template>
    <div>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主控台</el-breadcrumb-item>
            <el-breadcrumb-item><slot name="menuName"></slot></el-breadcrumb-item>
            <el-breadcrumb-item v-if="router.currentRoute.value.name=='ScProduct'"><slot name="menuChildern"></slot></el-breadcrumb-item>
          </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>

</style>