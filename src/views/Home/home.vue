<template>
  <div class="home">
    <el-container>
      <el-header
        class="header-box"
        height="56px"
      >
        <h2 class="login-title p-l">
          <i class="logo"></i>
        </h2>
        <div class="p-r">
          <div class="user-box p-l">
            <img
              src="../../assets/img/admin.png"
              alt=""
            >
            <span>{{ userInfo.userName }}</span>
          </div>

          <el-link
            class="p-l"
            @click="handleLogout"
          >
            退出
            <i class="el-icon-switch-button"></i>
          </el-link>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <menu-custom />
        </el-aside>
        <el-main class="main">
          <PageTit v-if="pageName != 'main'" />
          <div
            class="main-content"
            :style="mainContentStyle"
          >
            <el-scrollbar style="height:100%;overflow:hidden">
              <router-view />
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageTit from '@/components/PageTit/pageTit.vue' // nav 导航模板

export default {
  name: 'Home',
  components: {
    PageTit, // 导航模板

  },
  data() {
    return {
      pageName: this.$route.name,
      mainContentStyle: {
        height: 'calc(100vh - 56px - 34px - 12px)',
      },
      fromPath: {}
    }
  },
  watch: {
    $route: {
      handler(n, o) {
        console.log('标识pageNmae->>>>', n, this.pageName);
        this.pageName = n.name;
        if (this.pageName != 'main') {
          this.mainContentStyle.height = 'calc(100vh - 56px - 34px - 22px)';
        } else {
          this.mainContentStyle.height = 'calc(100vh - 56px - 12px)';
        }
      },
      deep: true,
    },
  },
  created: function () {
    console.log('this --------->>>', this.userInfo)
    if (this.pageName != 'main') {
      this.mainContentStyle.height = 'calc(100vh - 56px - 34px - 22px)';
    } else {
      this.mainContentStyle.height = 'calc(100vh - 56px - 12px)';
    }
  },
  methods: {
    // 系统登出
    handleLogout() {
      alert('点击退出!')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header-box {
    background-color: #fff;
    height: 50px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 74.9%, 0.21);
    margin-bottom: 4px;
    .login-title {
      height: 56px;
      line-height: 56px;
      overflow: hidden;

      span {
        font-size: 16px;
        font-weight: 400;
        // color: #333333;
        color: #fff;
        float: left;
      }

      .logo {
        width: 210px;
        height: 40px;
        vertical-align: middle;
        background: url(../../assets/img/logo2.e1c148bb.png) no-repeat 0px 0px;
        background-size: 100% 100%;
        margin: 8px 10px 8px 0px;
        float: left;
      }
    }

    div.p-r {
      .user-box {
        // overflow: hidden;
        margin: 10px 0px;
        display: flex;
        align-items: center;
        & > span {
          margin: 4px;
        }

        & > div {
          margin-left: 10px;
        }
        p {
          font-size: 14px;
          &:nth-child(2) {
            font-size: 12px;
          }
        }
      }

      & > a {
        line-height: 50px;
        margin-left: 26px;
      }
    }
  }

  .main {
    padding: 0;

    & > .main-content {
      margin: 6px;
      overflow: hidden;
    }
  }
}
</style>

<style>
.el-scrollbar__wrap:not(.el-select-dropdown__wrap) {
  overflow-x: hidden;
}
</style>
