<template>
  <el-popover
    placement="bottom"
    width="160"
    v-model="visible">
    <p>确认删除？</p>
    <div style="text-align: left; margin: 0">
      <el-button type="danger" size="mini" @click="handleHide(1)" round>确认</el-button>
      <el-button size="mini" @click="handleHide(0)" round>关闭</el-button>
    </div>
    <el-button type="danger" size="mini" round v-if="keyName === 'action'" slot="reference">删除</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  props: {
    keyName: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    tabKey: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleHide(code) {
      if (parseInt(code) === 1) {
        this.$emit('handleRemove', this.index, this.tabKey);
      }
      this.visible = false;
    },
  },
};
</script>
