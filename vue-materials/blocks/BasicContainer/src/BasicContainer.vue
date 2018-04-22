<template>
  <div class="basic-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'basic-container',
}
</script>

<style>
  .basic-container {
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 6px;
  }
</style>
