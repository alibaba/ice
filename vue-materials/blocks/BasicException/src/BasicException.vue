<template>
<div className="basic-exception">
  <basic-container>
    <div class="exception-content">
      <img :src="imgSrc" class="imgException"/>
      <div>
        <h3 class="title" v-text="title"></h3>
        <p class="description" v-html="description"></p>
      </div>
    </div>
  </basic-container>
</div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';

const imgSrc =
  'https://img.alicdn.com/tfs/TB1w4M7bNrI8KJjy0FpXXb5hVXa-260-260.png';
const exceptionTitle = '抱歉，服务器出错了';
const exceptionDescription = '服务器出错了，请重新刷新页面或返回<router-link to="/">首页</router-link>';

export default {
  components: { BasicContainer },
  name: 'BasicException',
  data() {
    return {
      imgSrc,
      title:exceptionTitle,
      description:exceptionDescription
    };
  },
};
</script>

<style lang="scss" scoped>
$container-height: 70vh;

.exception-content {
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    color: rgb(51, 51, 51);
  }
  .description {
    color: rgb(102, 102, 102);
  }
}

@media screen and (max-width: 1199px) and (min-width: 721px) {
  .exception-content {
    .imgException {
      max-width: 180px;
      margin-right: 30px;
    }
    .title {
      font-size: 20px;
      margin: 10px 0;
    }
    .description {
      font-size: 14px;
    }
  }
}
@media screen and (min-width: 1200px) {
  .exception-content {
    min-height: $container-height;

    .imgException {
      max-width: 260px;
      margin-right: 50px;
    }
    .title {
      font-size: 24px;
      margin: 20px 0;
    }
    .description {
      font-size: 16px;
    }
  }
}
</style>