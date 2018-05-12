<template>
  <div className=example-layout>
    <h1>ExampleLayout</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'ExampleLayout',

  data() {
    return {}
  },

  created() {},

  methods: {},
};
</script>

<style>
  .example-layout {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
