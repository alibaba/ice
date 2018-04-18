<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :navs="navs"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    navs() {
      return [
        {
          path: '/example',
          name: 'Example',
          meta: { title: 'Example123', icon: 'example' },
          children: [
            {
              path: 'table',
              name: 'Table',
              meta: { title: 'Table', icon: 'table' },
            },
            {
              path: 'tree',
              name: 'Tree',
              meta: { title: 'Tree', icon: 'tree' },
            },
          ],
        },

        {
          path: '/form',
          children: [
            {
              path: 'index',
              name: 'Form',
              meta: { title: 'Form', icon: 'form' },
            },
          ],
        },
      ]
    },
  }
}
</script>
