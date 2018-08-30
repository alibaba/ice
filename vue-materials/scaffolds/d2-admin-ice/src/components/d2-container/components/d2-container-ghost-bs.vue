<template>
  <div class="d2-container-ghost-bs">
    <div v-if="$slots.header" class="d2-container-ghost-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="d2-container-ghost-bs__body" ref="wrapper">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="d2-container-ghost-bs__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'
export default {
  name: 'd2-container-card-bs',
  mixins: [
    bs
  ]
}
</script>
