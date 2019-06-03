<template>
  <div class="example-component">{{this.text}}</div>
</template>

<script>
export default {
  name: 'ExampleComponent',

  data() {
    return {};
  },

  props: {
    text: {
      type: String,
      default: 'ExampleComponent',
    },
  },

  computed: {},

  created() {},

  methods: {},
};
</script>

<style>
.example-component {
  border: 1px solid gray;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.example-component:hover {
  border-color: #3080fe;
  color: #3080fe;
}
</style>


