<template>
  <div id="app">
    <ul id="nav">
      <li v-for="item in headerMenuConfig" :key="item.path">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
// @ is an alias to /src
import { headerMenuConfig } from '@/menuConfig';

export default {
  data: () => {
    return { headerMenuConfig }
  }
};
</script>
