<template>
    <div class="page-header">
        <div class="users">
            <!-- 菜单隐藏 -->
            <div>

            </div>
           
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <div class="block">
                        <img class="avartr" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"/>
                        <span class="userName">{{$store.state.uName||'时倾'}}</span>
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
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

const logout=()=>{
    localStorage.removeItem('token')
    window.location.reload();
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
</style>