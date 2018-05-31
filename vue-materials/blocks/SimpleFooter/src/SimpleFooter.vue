<template>
  <div class="simple-footer">
    <basic-container>
      <div class="footer-row">
        <a class="footer-brand" href="">
          <img class="footer-logo" :src="logo" alt="logo">
        </a>
        <ul class="footer-list">
          <li class="footer-list-item" v-for="(item,index) in navList" :key="index">
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer },
  name: 'SimpleFooter',

  data() {
    return {
      logo: 'https://img.alicdn.com/tfs/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png',
      navList: [
        { title: 'Home', link: '#' },
        { title: 'Shop', link: '#' },
        { title: 'Blog', link: '#' },
        { title: 'Service', link: '#' },
        { title: 'About', link: '#' },
        { title: 'Contact', link: '#' },
      ],
    };
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
@import '~normalize.css/normalize.css';

.simple-footer {
  overflow: hidden;
  .footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-logo {
      width: 86px;
    }
    .footer-list {
      display: flex;
      justify-content: flex-start;
      text-align: right;
      font-size: 14px;
      &-item {
        list-style: none;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
        & > a {
          text-decoration: none;
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
  }
}
</style>
