<template>
  <div className="data-display">
    <basic-container>
      <index :option="Option"></index>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import index from './components/index';
export default {
  components: { BasicContainer, index },
  name: 'Index',
  data() {
    return {
      Option: {
        span: 8,
        color: '#15A0FF',
        data: [
          {
            count: 100,
            title: '日活跃数',
          },
          {
            count: '3,000',
            title: '月活跃数',
          },
          {
            count: '20,000',
            title: '年活跃数',
          },
        ],
      },
    };
  },

  created() {},

  methods() {},
};
</script>

