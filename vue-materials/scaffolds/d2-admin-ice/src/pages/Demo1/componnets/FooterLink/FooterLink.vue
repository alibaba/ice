<template>
  <span class="footer-link">
    欢迎使用 D2Admin 这些链接会对你有帮助：
    <a class="footer-link_link" href="https://doc.d2admin.fairyever.com/zh/" target="blank">中文文档</a> |
    <a class="footer-link_link" href="https://d2admin.fairyever.com" target="blank">完整版演示</a> |
    <a class="footer-link_link" href="https://github.com/d2-projects/d2-admin" target="blank">完整版仓库</a>
  </span>
</template>

<script>
export default {
  name: 'FooterLink'
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.footer-link {
  .footer-link_link {
    color: $color-primary;
  }
}
</style>
