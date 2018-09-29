<template>
  <div>
    <p class="d2-mt-0">本页面路由数据</p>
    <pre>{{route}}</pre>
  </div>
</template>

<script>
export default {
  name: 'RouteInfo',
  computed: {
    route () {
      const { fullPath, hash, matched, meta, name, params, path, query } = this.$route
      return JSON.stringify({
        name,
        path,
        fullPath,
        params,
        query,
        meta,
        hash,
        matched: matched.map(m => ({
          path: m.path,
          name: m.name
        }))
      }, null, 2)
    }
  }
}
</script>
