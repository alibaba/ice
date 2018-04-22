<template>
  <el-menu class="navbar" mode="horizontal">
    <el-dropdown class="user-profile-container" trigger="click">
      <div class="user-profile-content">
        <img class="user-avatar" src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png">
        <div class="user-profile-body">
          <span class="user-name">淘小宝</span>
          <span class="user-department">技术部</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>
            我的主页
          </el-dropdown-item>
        </router-link>
        <router-link to="/">
          <el-dropdown-item>
            个人设置
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>

export default {
  name: 'NavBar',
  methods: {
    logout() {
      console.log('Logout');
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 64px;
  .user-profile-container {
    position: absolute;
    right: 20px;
    cursor: pointer;
    .user-profile-content {
      display: flex;
      margin: 12px 0;
    }
    .user-profile-body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-right: 14px;
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      margin-right: 12px;
      border-radius: 4px;
    }
    .user-name {
      color: #333;
    }
    .user-department {
      font-size: 12px;
      color: #666;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: 0;
      top: 13px;
      font-size: 12px;
    }
  }
}
</style>

