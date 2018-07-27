<template>
  <el-dropdown class="d2-mr">
    <span class="btn-text">你好 {{userInfo.name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      userInfo: state => state.d2admin.userInfo
    })
  },
  methods: {
    ...mapActions([
      'd2adminLogout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.d2adminLogout({
        vm: this,
        confirm: true
      })
    }
  }
}
</script>
