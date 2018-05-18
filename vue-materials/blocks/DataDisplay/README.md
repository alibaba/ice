# data-display

简介：数据展示

用于简单数据的模板展示

![截图](https://img.alicdn.com/tfs/TB1IKT9jfDH8KJjy1XcXXcpdXXa-1892-324.png)

数据格式:

~~~
export default {
  span: 8,
  color: '#15A0FF',
  data: [{
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
    }
  ]
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
  <tr>
    <td height="50">color</td>
    <td>颜色</td>
    <td>String</td>
    <td>一</td>
    <td>#15A0FF</td>
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
    <td height="50">count</td>
    <td>数字</td>
    <td>String / Number</td>
    <td>一</td>
    <td>一</td>
  </tr>
</table>