<template> 
  <div :style="style.editDialog">
    <el-button @click="handleColumnClick(row)" type="primary" size="mini" round v-if="keyName === 'action'">编辑</el-button>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formRow" :rules="rules" ref="ruleForm">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="formRow.title"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="formRow.author"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-input v-model="formRow.status"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth" prop="date">
          <el-input v-model="formRow.date"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style: {
        editDialog: {
          display: 'inline-block',
          marginRight: '5px',
        },
      },
      dialogFormVisible: false,
      rules: {
        title: [
          { required: true, message: '必填选项', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '必填选项', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '必填选项', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '必填选项', trigger: 'blur' }
        ],
      },
      formLabelWidth: '80px',
    };
  },
  computed: {
    formRow() {
      return Object.assign({}, this.row);
    },
  },
  props: {
    row: {
      type: Object,
      default: {},
    },
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
    handleColumnClick(row) {
      this.dialogFormVisible = true;
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.$emit('handleMod', this.formRow, this.index, this.tabKey);
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>
