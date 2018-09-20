<template>
  <div
    class="d2-error-log-list__expand"
    :class="className">
    <p class="d2-error-log-list__expand-title">{{title}}</p>
    <p class="d2-error-log-list__expand-value">{{value === '' ? '无数据' : value}}</p>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'log'
    },
    title: {
      default: ''
    },
    value: {
      default: ''
    }
  },
  computed: {
    className () {
      return this.type === 'log' ? 'd2-error-log-list__expand--log' : 'd2-error-log-list__expand--error'
    }
  }
}
</script>
