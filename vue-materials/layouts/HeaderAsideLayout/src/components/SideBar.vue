<template>
  <scroll-bar>
    <div class="logo">
      LOGO
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      background-color="#03152a"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <template v-for="item in navs" v-if="!item.hidden && item.children">
        <router-link v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path"
          :key="item.children[0].name">
          <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
            <i v-if="item.children[0]&&item.children[0].icon" :class="item.children[0].icon"></i>
            <span v-if="item.children[0] && item.children[0].name" slot="title">{{item.children[0].name}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <i v-if="item && item.icon" :class="item.icon"></i>
            <span v-if="item && item.name" slot="title">{{item.name}}</span>
          </template>

          <template v-for="child in item.children" v-if="!child.hidden">
            <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :navs="[child]" :key="child.path"></sidebar-item>

            <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
              <el-menu-item :index="item.path+'/'+child.path">
                <i v-if="child && child.icon" :class="child.icon"></i>
                <span v-if="child && child.name" slot="title">{{child.name}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>

      </template>
    </el-menu>
  </scroll-bar>
</template>

<script>
import ScrollBar from './ScrollBar'
import navs from '../navs';

export default {
  components: { ScrollBar },
  data() {
    return {
      navs
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .logo {
    height: 64px;
    line-height: 64px;
    background: #062240;
    color: #fff;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    overflow: hidden;
  }
</style>
