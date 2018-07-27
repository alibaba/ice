<template>
  <div class="page-cover">
    <div class="page-cover__logo">
      <slot/>
    </div>
    <p class="page-cover__title">{{title}}</p>
    <p class="page-cover__sub-title d2-mt-0">{{subTitle}}</p>
    <slot name="footer"/>
    <a target="blank" href="https://github.com/d2-projects/d2-admin">
      <img
        style="position: absolute; top: 0; right: 0; border: 0; width: 150px;"
        src="./image/darkblue@2x.png"
        alt="Fork me on GitHub">
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title'
    },
    subTitle: {
      type: String,
      required: false,
      default: 'subTitle'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page-index-article-header {
  overflow: hidden;
  .page-index-article-header__title {
    display: inline-block;
    padding: 12px 20px;
  }
}
.page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .page-cover__logo {
    img {
      width: 200px;
    }
  }
  .page-cover__title {
    color: $color-text-main;
  }
  .page-cover__sub-title {
    color: $color-text-sub;
  }
}
</style>
