<template>
  <div class="{{name}}">
    <basic-container>
      <h1>{{className}}</h1>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container'

export default {
  components: { BasicContainer },
  name: '{{className}}',

  data() {
    return {}
  },

  created() {},

  methods: {}
}

</script>

<style>
  .{{name}} {

  }
</style>
