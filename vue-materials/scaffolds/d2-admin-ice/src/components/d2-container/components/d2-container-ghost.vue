<template>
  <div class="d2-container-ghost">
    <div v-if="$slots.header" class="d2-container-ghost__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="d2-container-ghost__body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="d2-container-ghost__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>
