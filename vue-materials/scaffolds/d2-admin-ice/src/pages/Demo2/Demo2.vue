<template>
  <d2-container>
    <template slot="header">WELCOME</template>
    <el-row class="d2-mb-10">
      <el-button>测试按钮</el-button>
      <el-button type="primary">主要</el-button>
      <el-button type="success">成功</el-button>
      <el-button type="info">信息</el-button>
      <el-button type="warning">警告</el-button>
      <el-button type="danger">危险</el-button>
    </el-row>
    <route-info/>
    <template slot="footer">
      <footer-link/>
    </template>
  </d2-container>
</template>

<script>
import RouteInfo from './componnets/RouteInfo'
import FooterLink from './componnets/FooterLink'
export default {
  // 如果需要缓存页面
  // name 字段需要设置为和本页路由 name 字段一致
  name: 'demo2',
  components: {
    RouteInfo,
    FooterLink
  }
}
</script>
