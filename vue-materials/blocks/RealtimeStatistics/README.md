# realtime-statistics

简介：实时数据统计展示

实时数据统计展示

![截图](http://oetrwxnhv.bkt.clouddn.com/RealtimeStatistics.png)

数据格式:

~~~
export default {
  span: 6,
  data: [{
      title: '分类统计',
      subtitle: '实时',
      count: 7993,
      allcount: 10222,
      text: '当前分类总记录数',
      color: 'rgb(49, 180, 141)',
      key: '类',
    },
    {
      title: '附件统计',
      subtitle: '实时',
      count: 3112,
      allcount: 10222,
      text: '当前上传的附件数',
      color: 'rgb(56, 161, 242)',
      key: '附',
    },
    {
      title: '文章统计',
      subtitle: '实时',
      count: 908,
      allcount: 10222,
      text: '评论次数',
      color: 'rgb(117, 56, 199)',
      key: '评',
    },
    {
      title: '新闻统计',
      subtitle: '实时',
      count: 908,
      allcount: 10222,
      text: '评论次数',
      color: 'rgb(59, 103, 164)',
      key: '新',
    },
  ],
}

~~~
#### option属性
<table width="100%">
  <tr>
    <th width="120" height="50">参数</th>
    <th width="100">详细解释</th>
    <th width="100">类型</th>
    <th width="250">可选值</th>
    <th width="100">默认值</th>
  </tr>
  <tr>
    <td height="50">span</td>
    <td>格栅</td>
    <td>String / Number</td>
    <td>一</td>
    <td>8</td>
  </tr>
</table>  

#### data属性
<table width="100%">
  <tr>
    <th width="120" height="50">参数</th>
    <th width="100">详细解释</th>
    <th width="100">类型</th>
    <th width="250">可选值</th>
    <th width="100">默认值</th>
  </tr>
  <tr>
    <td height="50">title</td>
    <td>标题</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
  <tr>
    <td height="50">subtitle</td>
    <td>副标题</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
  <tr>
    <td height="50">count</td>
    <td>数字</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
  <tr>
    <td height="50">allcount</td>
    <td>总数</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
  <tr>
    <td height="50">text</td>
    <td>备注</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
  <tr>
    <td height="50">bgcolor</td>
    <td>背景颜色</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
  <tr>
    <td height="50">key</td>
    <td>水影</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
</table>
