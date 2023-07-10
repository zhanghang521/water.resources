<template>
    <div>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主控台</el-breadcrumb-item>
            <el-breadcrumb-item><slot name="menuName"></slot></el-breadcrumb-item>
          </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
</script>

<style scoped>

</style>