<template>
  <div class="container-component" ref="container">
    <!-- [card] 卡片容器 -->
    <d2-container-card v-if="type === 'card' && !betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </d2-container-card>
    <!-- [card] 卡片容器 滚动优化 -->
    <d2-container-card-bs v-bind="$attrs" v-if="type === 'card' && betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </d2-container-card-bs>
    <!-- [ghost] 隐形容器 -->
    <d2-container-ghost v-if="type === 'ghost' && !betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </d2-container-ghost>
    <!-- [ghost] 隐形容器 滚动优化 -->
    <d2-container-ghost-bs v-bind="$attrs" v-if="type === 'ghost' && betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </d2-container-ghost-bs>
    <!-- [container-full] 填充 -->
    <d2-container-full v-if="type === 'full' && !betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </d2-container-full>
    <!-- [container-full-bs] 填充 滚动优化 -->
    <d2-container-full-bs v-bind="$attrs" v-if="type === 'full' && betterScroll">
      <slot v-if="$slots.header" name="header" slot="header"/>
      <slot/>
      <slot v-if="$slots.footer" name="footer" slot="footer"/>
    </d2-container-full-bs>
  </div>
</template>

<script>
// 组件
import d2ContainerFull from './components/d2-container-full.vue'
import d2ContainerFullBs from './components/d2-container-full-bs.vue'
import d2ContainerGhost from './components/d2-container-ghost.vue'
import d2ContainerGhostBs from './components/d2-container-ghost-bs.vue'
import d2ContainerCard from './components/d2-container-card.vue'
import d2ContainerCardBs from './components/d2-container-card-bs.vue'
export default {
  name: 'd2-container',
  components: {
    'd2-container-full': d2ContainerFull,
    'd2-container-full-bs': d2ContainerFullBs,
    'd2-container-ghost': d2ContainerGhost,
    'd2-container-ghost-bs': d2ContainerGhostBs,
    'd2-container-card': d2ContainerCard,
    'd2-container-card-bs': d2ContainerCardBs
  },
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    },
    // 滚动优化
    betterScroll: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
