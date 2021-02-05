<template>
  <div class="pageTit">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item
        v-for="(item,index) in breadcrumbList"
        :to="{ path: item.path }"
        :key="index"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'PageTit',
  data() {
    return {
      oldPath: '',
      oldPageInfo: JSON.parse(sessionStorage.getItem('oldPageInfo')),
      breadcrumbList: [],
    }
  },
  watch: {
    $route: {
      handler(n, o) {
        if (n.meta.pageLevel == 1) {
          this.breadcrumbList.length = 0;
          this.breadcrumbList.push({
            name: this.$route.meta.title,
            path: this.$route.fullPath,
          })
        } else {
          if (o.meta.pageLevel == 1) {
            sessionStorage.setItem('oldPageInfo', JSON.stringify({
              name: o.meta.title,
              path: o.fullPath,
              pageLevel: o.meta.pageLevel,
            }))

            this.breadcrumbList.push({
              name: this.$route.meta.title,
              path: this.$route.fullPath,
            })

          }
          else {
            this.breadcrumbList.pop()

            this.breadcrumbList.push({
              name: this.$route.meta.title,
              path: this.$route.fullPath,
            })
          }
        }

      },
      deep: true,
    },
  },
  created: function () {
    if (this.breadcrumbList.length <= 1 && this.$route.meta.pageLevel == 2) {
      this.breadcrumbList.push(this.oldPageInfo)
    }

    this.breadcrumbList.push({
      name: this.$route.meta.title,
      path: this.$route.fullPath,
    })

    this.$router.beforeEach((to, from, next) => {
      next()
    })
  }

}
</script>

<style scoped lang="scss">
.pageTit {
  height: 34px;
  line-height: 34px;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  margin: 8px 6px;
}
</style>
