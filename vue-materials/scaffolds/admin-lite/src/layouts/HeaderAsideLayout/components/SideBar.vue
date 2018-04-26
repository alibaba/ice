<template>
  <scroll-bar>
    <div class="logo">
      <img src="https://img.alicdn.com/tfs/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png" width="40">
      <span class="site-name">ADMIN LITE</span>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      background-color="#00142a"
      text-color="hsla(0,0%,100%,.65)"
      active-text-color="#409EFF"
    >
      <template v-for="item in menuConfig" v-if="!item.hidden && item.children">
        <router-link v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path"
          :key="item.children[0].text">
          <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
            <i v-if="item.children[0]&&item.children[0].icon" :class="item.children[0].icon"></i>
            <span v-if="item.children[0] && item.children[0].text" slot="title">{{item.children[0].text}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.text||item.path" :key="item.text">
          <template slot="title">
            <i v-if="item && item.icon" :class="item.icon"></i>
            <span v-if="item && item.text" slot="title">{{item.text}}</span>
          </template>

          <template v-for="child in item.children" v-if="!child.hidden">
            <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :menuConfig="[child]" :key="child.path"></sidebar-item>

            <router-link v-else :to="item.path+'/'+child.path" :key="child.text">
              <el-menu-item :index="item.path+'/'+child.path">
                <i v-if="child && child.icon" :class="child.icon"></i>
                <span v-if="child && child.text" slot="title">{{child.text}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>

      </template>
    </el-menu>
  </scroll-bar>
</template>

<script>
import ScrollBar from './ScrollBar';
import { menuConfig } from '../../../routesConfig';

export default {
  components: { ScrollBar },
  name: 'SideBar',
  props: {
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuConfig,
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  line-height: 64px;
  background: #002140;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
}
.site-name {
  margin-left: 10px;
}
.sidebar-container {
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  transition: width 0.28s;
  width: 256px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  a {
    display: inline-block;
    width: 100%;
  }
  .el-menu {
    padding-top: 16px;
    width: 100% !important;
    border: none;
  }
  .el-submenu .el-menu-item {
    min-width: 256px !important;
    padding-left: 48px !important;
    background-color: #000c17 !important;
    &:hover {
      color: #fff !important;
    }
  }
  .el-menu-item,
  .el-submenu .el-menu-item {
    &.is-active {
      background-color: #188fff !important;
      color: #fff !important;
    }
  }
  .el-submenu__title i {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>
