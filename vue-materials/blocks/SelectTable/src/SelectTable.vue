<template>
  <div class="select-table">
    <basic-container>
      <el-row v-show="selections.length > 0" :gutter="10">
        <el-col :span="2">
          <el-button 
            :disabled="selections.length !== 1"
            @click="handleView(selections[0])"
            type="primary"
            size="small">查看</el-button>
        </el-col>
        <el-col :span="2">
          <el-button 
            @click="handleDelete(selections.map(i => i.id))"
            type="danger"
            size="small">删除</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品单价（人民币）"
          width="200">
        </el-table-column>
        <el-table-column
          prop="date"
          label="入库日期">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button 
              @click="handleView(scope.row)"
              type="primary"
              size="small">查看</el-button>
            <el-button 
              @click="handleDelete([scope.row].map(i => i.id))"
              type="danger"
              size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer },
  name: 'SelectTable',
  data() {
    return {
      tableData: [{
        id: 0,
        name: '矿泉水',
        price: '1',
        date: '2018-05-02',
      }, {
        id: 1,
        name: '吹风机',
        price: '125',
        date: '2018-05-04',
      }, {
        id: 2,
        name: '显示器',
        price: '998',
        date: '2018-05-01',
      }, {
        id: 3,
        name: '水杯',
        price: '23',
        date: '2018-05-03',
      }, {
        id: 4,
        name: '笔记本',
        price: '5',
        date: '2018-05-02',
      }, {
        id: 5,
        name: '鼠标垫',
        price: '37',
        date: '2018-05-04',
      }, {
        id: 6,
        name: '插线板',
        price: '78',
        date: '2018-05-01',
      }, {
        id: 7,
        name: '耳机',
        price: '166',
        date: '2018-05-03',
      }],
      selections: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selections = val;
    },
    handleDelete(idArray) {
      this.tableData = this.tableData.filter(i => !idArray.includes(i.id));
    },
    handleView(row) {
      const content = `
        <div>商品名称：${row.name}</div>
        <div>商品单价：¥ ${row.price}</div>
        <div>入库日期：${row.date}</div>
      `;
      const title = '商品详情';
      this.$alert(
        content,
        title,
        {
          dangerouslyUseHTMLString: true,
          callback: () => {
            // TODO: MessageBox callback;
          },
        },
      );
    },
  },
};
</script>

<style>
.select-table {
}
</style>
