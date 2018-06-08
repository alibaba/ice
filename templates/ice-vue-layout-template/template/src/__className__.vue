<template>
  <div class="{{name}}">
    <h1>{{className}}</h1>
  </div>
</template>

<script>
export default {
  name: '{{className}}',

  data() {
    return {}
  },

  created() {},

  methods: {},
};
</script>

<style>
  .{{name}} {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
