<template>
  <div className="data-display">
    <basic-container>
      <DataDisplay :option="Option"></DataDisplay>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import Option from '../mock/data-display.js';
import DataDisplay from './components/DataDisplay';
export default {
  components: { BasicContainer, DataDisplay },
  name: 'Index',
  data() {
    return {
      Option: Option,
    };
  },

  created() {},

  methods() {},
};
</script>

