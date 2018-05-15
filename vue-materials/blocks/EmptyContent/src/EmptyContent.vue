<template>
  <div className="empty-content">
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
import BasicContainer from '@vue-materials/basic-container'

const imgSrc =
  'https://img.alicdn.com/tfs/TB1WNNxjBHH8KJjy0FbXXcqlpXa-780-780.png';
const emptyContentTitle = '页面暂无内容';
const emptyContentDescription = '抱歉，页面暂无内容，请看看<router-link to="/">其他页面</router-link>继续浏览';

export default {
  components: { BasicContainer },
  name: 'EmptyContent',
  data() {
    return {
      imgSrc,
      title:emptyContentTitle,
      description:emptyContentDescription
    }
  }
}

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