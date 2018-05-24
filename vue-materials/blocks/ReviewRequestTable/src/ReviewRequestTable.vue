<template>
  <div class="review-request-table">
    <basic-container>
      <el-table
        :data="tableData">
        <el-table-column
          label="被邀请人"
          min-width="20%">
          <div class="invite" slot-scope="scope">
            <span class="avatar-wrapper"><img class="avatar" :src=scope.row.invite.avatar></span>
            <span>{{ scope.row.invite.name }}</span>
          </div>
        </el-table-column>
        <el-table-column
          prop="email"
          label="被邀请人邮件"
          min-width="20%">
        </el-table-column>
        <el-table-column
          label="邀请人"
          min-width="20%">
          <div class="sent" slot-scope="scope">
            <span class="avatar-wrapper"><img class="avatar" :src=scope.row.sent.avatar></span>
            <span>{{ scope.row.sent.name }}</span>
          </div>
        </el-table-column>
        <el-table-column
          prop="date"
          label="邀请时间"
          min-width="20%">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="20%">
        </el-table-column>
      </el-table>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer },
  name: 'ReviewRequestTable',

  data() {
    return {
      tableData: [
        {
          invite: {
            name: '李经理',
            avatar:
              'https://img.alicdn.com/tfs/TB1j159r21TBuNjy0FjXXajyXXa-499-498.png_80x80.jpg',
          },
          email: 'hi@example.com',
          sent: {
            name: '王总',
            avatar:
              'https://img.alicdn.com/tfs/TB1Daimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          date: '2018年3月12日',
          status: '已发送',
        },
        {
          invite: {
            name: '王经理',
            avatar:
              'https://img.alicdn.com/tfs/TB1j159r21TBuNjy0FjXXajyXXa-499-498.png_80x80.jpg',
          },
          email: 'hi@example.com',
          sent: {
            name: '张总',
            avatar:
              'https://img.alicdn.com/tfs/TB1FGimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          date: '2018年3月11日',
          status: '等待接受',
        },
        {
          invite: {
            name: '张经理',
            avatar:
              'https://img.alicdn.com/tfs/TB1AdOerVOWBuNjy0FiXXXFxVXa-499-498.png_80x80.jpg',
          },
          email: 'hi@example.com',
          sent: {
            name: '于总',
            avatar:
              'https://img.alicdn.com/tfs/TB1Daimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          date: '2018年3月10日',
          status: '已完成',
        },
        {
          invite: {
            name: '于经理',
            avatar:
              'https://img.alicdn.com/tfs/TB1Daimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          email: 'hi@example.com',
          sent: {
            name: '马总',
            avatar:
              'https://img.alicdn.com/tfs/TB1AdOerVOWBuNjy0FiXXXFxVXa-499-498.png_80x80.jpg',
          },
          date: '2018年3月9日',
          status: '已发送',
        },
        {
          invite: {
            name: '马经理',
            avatar:
              'https://img.alicdn.com/tfs/TB1FGimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          email: 'hi@example.com',
          sent: {
            name: '刘总',
            avatar:
              'https://img.alicdn.com/tfs/TB1FWimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          date: '2018年3月8日',
          status: '已发送',
        },
        {
          invite: {
            name: '刘经理',
            avatar:
              'https://img.alicdn.com/tfs/TB1Daimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          email: 'hi@example.com',
          sent: {
            name: '陈总',
            avatar:
              'https://img.alicdn.com/tfs/TB1FGimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          date: '2018年3月6日',
          status: '已发送',
        },
        {
          invite: {
            name: '陈经理',
            avatar:
              'https://img.alicdn.com/tfs/TB1FWimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg',
          },
          email: 'hi@example.com',
          sent: {
            name: '许总',
            avatar:
              'https://img.alicdn.com/tfs/TB1AdOerVOWBuNjy0FiXXXFxVXa-499-498.png_80x80.jpg',
          },
          date: '2018年3月3日',
          status: '已完成',
        },
      ],
    };
  },
};
</script>

<style>
.invite, .sent{
  display: flex;
  align-items: center;
}
.avatar-wrapper{
  border-radius: 40px;
  overflow: hidden;
  display: inline-block;
  margin-right: 10px;
}
.avatar{
  display: block;
  width: 40px;
  height: 40px;
}
</style>
