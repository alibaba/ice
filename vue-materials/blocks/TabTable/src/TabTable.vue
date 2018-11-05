<template>
  <div class="tab-table">
    <basic-container>
      <el-tabs v-model="tabKey" @tab-click="handleClick">
        <el-tab-pane
          v-for="tab in tabs"
          :label="tab.tab"
          :name="tab.key"
          :key="tab.key">
          <el-table
            :data="dataSource[tab.key]"
            style="width: 100%">
            <el-table-column
              v-for="item in columns"
              :key="item.key"
              :label="item.title"
              :prop="item.dataIndex"
              :width="item.key !== 'action' ? (item.width || 150) : item.width">
              <template slot-scope="scope">
                <span v-if="item.key !== 'action'">{{scope.row[item.dataIndex]}}</span>
                <edit-dialog :row="scope.row" :key-name.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleMod="handleMod"></edit-dialog>
                <delete-balloon :key-name.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleRemove="handleRemove"></delete-balloon>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import DeleteBalloon from './components/DeleteBalloon';
import EditDialog from './components/EditDialog';
import response from './tab-table.json';

export default {
  components: {
    BasicContainer,
    DeleteBalloon,
    EditDialog,
  },
  name: 'TabTable',

  data() {
    return {
      tabKey: 'all',
      dataSource: [],
      tabs: [
        { tab: '全部', key: 'all' },
        { tab: '已发布', key: 'inreview' },
        { tab: '审核中', key: 'released' },
        { tab: '已拒绝', key: 'rejected' },
      ],
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '发布时间',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '操作',
          key: 'action',
        },
      ],
      visible: false,
    };
  },

  created() {},

  mounted() {
    this.dataSource = response.data;
  },

  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    handleRemove(index, tabKey) {
      this.dataSource[tabKey].splice(index, 1);
    },
    handleMod(row, index, tabKey) {
      this.$set(this.dataSource[tabKey], index, row);
    },
  },
}

</script>

<style>
  .tab-table {

  }
</style>
