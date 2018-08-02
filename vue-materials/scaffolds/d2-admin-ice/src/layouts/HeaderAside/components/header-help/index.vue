<template>
  <div>
    <el-tooltip effect="dark" content="疑问" placement="bottom">
      <el-button class="d2-ml-0 d2-mr btn-text can-hover" type="text" @click="dialogVisible = true">
        <d2-icon name="question-circle" style="font-size: 20px"/>
      </el-button>
    </el-tooltip>
    <el-dialog title="帮助" width="600px" :visible.sync="dialogVisible">
      <div style="margin-top: -25px; margin-bottom: -25px;">
        <el-button-group class="d2-mb">
          <el-button @click="$open('https://github.com/d2-projects/d2-admin')">
            <d2-icon name="github" class="d2-mr-5"/>
            主页
          </el-button>
          <el-button @click="$open('http://d2admin.fairyever.com/zh/')">
            <d2-icon name="book" class="d2-mr-5"/>
            中文文档
          </el-button>
          <el-button @click="$open('https://github.com/d2-projects/d2-admin/issues')">
            <d2-icon name="question" class="d2-mr-5"/>
            issues
          </el-button>
          <el-button @click="$open('https://github.com/d2-projects/d2-admin/issues/new')">
            <d2-icon name="plus" class="d2-mr-5"/>
            new issues
          </el-button>
        </el-button-group>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-alert :closable="false" type="info" title="扫码进 QQ 群" class="d2-mb"/>
            <img src="./image/qq.jpg" style="width: 100%;">
          </el-col>
          <el-col :span="12">
            <el-alert :closable="false" type="info" title="作者微信 加好友拉进微信群" class="d2-mb"/>
            <img src="./image/we.jpg" style="width: 100%;">
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
