<template>
  <el-button class="d2-mr btn-text can-hover" type="text" @click="handleClick">
    <d2-icon name="search" style="font-size: 18px;"/>
  </el-button>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
