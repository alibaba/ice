<template>
  <el-submenu :index="menu.path || uniqueId">
    <template slot="title">
      <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
      <d2-icon-svg v-else-if="menu.iconSvg" :name="menu.iconSvg"/>
      <i v-else class="fa fa-folder-o"></i>
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <d2-layout-header-aside-menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"/>
      <d2-layout-header-aside-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
// 组件
import d2LayoutMainMenuItem from '../menu-item'

export default {
  name: 'd2-layout-header-aside-menu-sub',
  components: {
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      uniqueId: uniqueId('d2-menu-empty-')
    }
  }
}
</script>
