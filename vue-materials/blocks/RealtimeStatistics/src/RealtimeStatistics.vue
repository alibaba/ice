<template>
  <div class="realtime-statistics">
    <el-row :span="24">
      <el-col :span="option.span" v-for="(item,index) in option.data" :key="index">
        <div class="item" :style="{background:item.bgcolor}">
          <div class="item-border">
            <div class="item-header">
              <p>{{item.title}}</p>
              <span>{{item.subtitle}}</span>
            </div>
            <div class="item-body">
              <h2>{{item.count}}</h2>
            </div>
            <div class="item-footer">
              <span>{{item.allcount}}</span>
              <p>{{item.text}}</p>
            </div>
          </div>
          <p class="item-tip">{{item.key}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer },
  name: 'RealtimeStatistics',

  data() {
    return {
      option: {
        span: 6,
        data: [
          {
            title: '分类统计',
            subtitle: '实时',
            count: 7993,
            allcount: 10222,
            text: '当前分类总记录数',
            bgcolor: 'rgb(49, 180, 141)',
            key: '类',
          },
          {
            title: '附件统计',
            subtitle: '实时',
            count: 3112,
            allcount: 10222,
            text: '当前上传的附件数',
            bgcolor: 'rgb(56, 161, 242)',
            key: '附',
          },
          {
            title: '文章统计',
            subtitle: '实时',
            count: 908,
            allcount: 10222,
            text: '评论次数',
            bgcolor: 'rgb(117, 56, 199)',
            key: '评',
          },
          {
            title: '新闻统计',
            subtitle: '实时',
            count: 908,
            allcount: 10222,
            text: '评论次数',
            bgcolor: 'rgb(59, 103, 164)',
            key: '新',
          },
        ],
      },
    };
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
@import './RealtimeStatistics.scss';
</style>


