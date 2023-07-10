<template>
    <div class="page-header">
        <div class="users">
            <!-- 菜单隐藏 -->
            <div>
                <el-radio-group v-model="isCollapse" >
                    <el-button link @click="showMenu">
                        <el-icon size="30" color="#FFFFFF">
                            <Expand v-if="isCollapse"/>
                            <Fold v-else/>
                        </el-icon>
                    </el-button>
                </el-radio-group>
            </div>
            <h5 class="logo mb-2">江西省水利信息系统</h5>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <div class="block">
                        <img class="avartr" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"/>
                        <span class="userName">{{$store.state.uInfo.uName||'时倾'}}</span>
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
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const $emit = defineEmits(['showMenu'])

const logout=()=>{
    localStorage.removeItem('token')
    window.location.reload();
}

//菜单伸缩
const isCollapse = ref(false)
const showMenu=()=>{
    isCollapse.value = !isCollapse.value
    $emit('showMenu',isCollapse.value)
}

</script>

<style scoped>
.page-header{
    height: 100%;
}
.users{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
}
.avartr{
    width: 35px;
    height: 35px;
    vertical-align: middle;
    margin-right: 10px;
}
.userName{
    font-size: 16px;
    color: aliceblue;
}
.logo{
    font-size: 16px;
    color: rgb(255, 255, 255);
}
</style>