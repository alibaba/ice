<template>
  <div class="data-display">
    <basic-container>
      <el-row :span="24">
        <el-col v-for="(item,index) in option.data" :key="index" :span="option.span">
          <div class="item" :style="{color:option.color}">
            <h5 class="count">{{item.count}}</h5>
            <span class="splitLine" />
            <p class="title">{{item.title}}</p>
          </div>
        </el-col>
      </el-row>

    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
export default {
  components: { BasicContainer },
  name: 'DataDisplay',
  data() {
    return {
      option: {
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
};
</script>
<style lang="scss" scoped>
@import './DataDisplay.scss';
</style>

