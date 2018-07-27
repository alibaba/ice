<template>
  <d2-container>
    <template slot="header">WELCOME</template>
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
