<template>
  <el-dropdown placement="bottom" size="small" @command="handleChange">
    <el-button class="d2-mr btn-text can-hover" type="text">
      <d2-icon name="font" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="default">
        <d2-icon :name="iconName('default')" class="d2-mr-5"/>默认
      </el-dropdown-item>
      <el-dropdown-item command="medium">
        <d2-icon :name="iconName('medium')" class="d2-mr-5"/>中
      </el-dropdown-item>
      <el-dropdown-item command="small">
        <d2-icon :name="iconName('small')" class="d2-mr-5"/>小
      </el-dropdown-item>
      <el-dropdown-item command="mini">
        <d2-icon :name="iconName('mini')" class="d2-mr-5"/>最小
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'd2-header-size',
  computed: {
    ...mapState('d2admin/size', [
      'value'
    ])
  },
  watch: {
    // 注意 这里是关键
    // 因为需要访问 this.$ELEMENT 所以只能在这里使用这种方式
    value: {
      handler (val) {
        if (this.$ELEMENT.size !== val) {
          // 设置 element 全局尺寸
          this.$ELEMENT.size = val
          // 清空缓存设置
          this.pageKeepAliveClean()
          // 刷新此页面
          this.$router.replace('/refresh')
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      pageKeepAliveClean: 'd2admin/page/keepAliveClean'
    }),
    ...mapActions({
      sizeSet: 'd2admin/size/set'
    }),
    handleChange (value) {
      this.sizeSet(value)
    },
    iconName (name) {
      return name === this.value ? 'dot-circle-o' : 'circle-o'
    }
  }
}
</script>
