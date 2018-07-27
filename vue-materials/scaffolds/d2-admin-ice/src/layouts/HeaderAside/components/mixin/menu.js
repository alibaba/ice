export default {
  methods: {
    handleMenuSelect (index) {
      if (/^d2-menu-empty-\d+$/.test(index)) {
        this.$message.warning('临时菜单')
      } else {
        this.$router.push({
          path: index
        })
      }
    }
  }
}
