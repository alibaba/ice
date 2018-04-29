<template>
  <div className="data-display">
    <el-row :span="24">
      <el-col v-for="(item,index) in option.data" :key="index" :span="option.span || 8">
        <div class="item" :style="{color:option.color}">
          <h5 class="count">{{item.count}}</h5>
          <span class="splitLine" />
          <p class="title">{{item.title}}</p>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'DataDisplay',
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {},

  methods() {},
};
</script>

<style lang="scss" scoped>
@import './DataDisplay.scss';
</style>