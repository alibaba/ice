<template>
  <div
    class="d2-contentmenu-list"
    @click="rowClick">
    <div
      v-for="item in menulist"
      :key="item.value"
      :data-value="item.value"
      class="d2-contentmenu-item"
      flex="cross:center main:center">
      <d2-icon
        v-if="item.icon"
        :name="item.icon"/>
      <div
        class="d2-contentmenu-item-title"
        flex-box="1">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd2-contextmenu-list',
  props: {
    menulist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    rowClick (event) {
      let target = event.target
      while (!target.dataset.value) {
        target = target.parentNode
      }
      this.$emit('rowClick', target.dataset.value)
    }
  }
}
</script>

<style lang="scss">
.d2-contentmenu-list {
  .d2-contentmenu-item {
    padding: 8px 20px 8px 15px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
    .d2-contentmenu-item-title {
      margin-left: 10px;
    }
  }
}
</style>
