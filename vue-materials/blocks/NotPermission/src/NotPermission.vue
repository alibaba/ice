<template>
  <div className="not-permission">
    <basic-container>
      <div class="exception-content">
        <div class="flex-container align-items-center justify-content-center exception-content">
          <img src="https://img.alicdn.com/tfs/TB1Gy4Yjv6H8KJjy0FjXXaXepXa-780-780.png" class="imgException"/>
          <div>
            <h3 class="title">抱歉，您无权限～</h3>
            <p class="description" >抱歉，您暂无权限，请看看
              <router-link to="/">其他页面</router-link>
            </p>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container'

export default {
  components: { BasicContainer },
  name: 'NotPermission',
  data() {
    return {}
  }
}

</script>

<style lang="scss" scoped>
/**flex相关 */
.flex-container{
  display: flex;
}
.align-items-center{
  align-items: center;
}
.justify-content-center{
  justify-content: center
}

.exception-content {
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
