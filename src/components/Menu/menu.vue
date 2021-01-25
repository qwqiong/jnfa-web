<template>
  <div class="menu">
    <el-scrollbar style="height:100%;overflow:hidden">
      <el-menu :router="true" :default-active="defaultActive" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
        class="el-menu-vertical">
        <div v-for="(item,index) in menuListIcon" :key="index">
          <!-- 无子菜单 -->
          <el-menu-item v-if="item.childrens && item.childrens.length == 0" :route="{path: item.path}" :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <!-- 有子菜单 -->
          <el-submenu :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(i,num) in item.childrens" :key="num" :index="i.path">{{i.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        defaultActive: this.$route.fullPath,
        menuList: [],
        menuListIcon: [{
            name: '首页',
            icon: 'iconfont icon-home-active',
            path: '/home/index',
          },
          {
            name: '门户管理',
            icon: 'iconfont icon-menhuwangzhan',
            path: '/portal/index',
          },
          {
            name: '项目管理',
            icon: 'iconfont icon-huabanbeifen',
            path: "/projectManagement",
            childrens: [{
              name: '纵向项目管理',
              path: '/projectVertical/index'
            }, {
              name: '横向项目管理',
              path: '/projectHorizontal/index'
            }, {
              name: '项目评审',
              path: '/projectEvaluate/index'
            }]
          },
          {
            name: '科研平台管理',
            icon: 'iconfont icon-jiaoyukeyan',
            path: '/platformManagement/index',
          },
          {
            name: '学科建设',
            icon: 'iconfont icon-xuekeguanli',
            path: '/course/index',
          },
          {
            name: '科研成果管理',
            icon: 'iconfont icon-chengguo',
            path: "/resultsManagement",
            childrens: [{
              name: '论文',
              path: '/resultsManagement/thesis/index'
            }, {
              name: '科技成果转化',
              path: '/resultsManagement/technologyAchievements/index',
            }, {
              name: '技术推广',
              path: '/resultsManagement/diffusion/index'
            }, {
              name: '专利成果',
              path: '/resultsManagement/patent/index'
            }, {
              name: '计算机软件著作',
              path: '/resultsManagement/computerSoftwareWritings/index',
            }, {
              name: '著作',
              path: '/resultsManagement/writings/index'
            }, {
              name: '标准',
              path: '/resultsManagement/standard/index'
            }, {
              name: '指南',
              path: '/resultsManagement/guide/index'
            }, {
              name: '共识',
              path: '/resultsManagement/consensus/index'
            }, {
              name: '会议相关',
              path: '/resultsManagement/meeting/index'
            }, {
              name: '获奖情况',
              path: '/resultsManagement/medicalAchievements/index'
            }, {
              name: '学会/协会任职',
              path: '/resultsManagement/appointment/index',
            }, {
              name: '期刊杂志任职',
              path: '/resultsManagement/journalAppointment/index'
            }]
          },
          {
            name: '绩效管理',
            icon: 'iconfont icon-jixiaokaohe',
            path: '/department/index',
          },
          {
            name: '绩效管理',
            icon: 'iconfont icon-jixiaokaohe',
            path: '/performance/index',
          },
          {
            name: '人员管理',
            icon: 'iconfont icon-xingzhuang9',
            path: '/user/index',
          },
        ]
      };
    },
    created: function() {
        this.menuList = this.menuListIcon
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped lang="scss">
  .menu {
    width: auto;
    height: calc(100vh - 56px - 16px);
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
    position: relative;
    margin: 8px;

    .el-menu-vertical .is-active:not(.is-opened) {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: #A7C9EC;

      i,
      span {
        color: #367ABF;
        vertical-align: unset;
      }
    }

    .el-menu {
      border-right: none;

      div.el-submenu__title+ul.el-menu--inline{
        li.el-menu-item{
          height: 40px;
          line-height: 40px;

          &:hover,&.is-active{
              color: #2476c2;
              background: #d6eafd;
          }
        }
      }

      .el-menu-item,
      .el-submenu {
        color: #333;
        height: auto;
        line-height: 48px;
        min-width: inherit;

        &:hover{
         width: 100%;
         // height: 48px;
         line-height: 48px;
        }
      }

      .el-submenu {
        color: #333;
        // height: 48px;
        // line-height: 48px;
        min-width: inherit;
      }

      &:not(.el-menu--collapse) {
        width: 200px;
        font-size: 14px;
      }

      .iconfont {
        font-size: 14px;
      }
    }

    .menu-collapse {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      color: #909399;
      border: 1px solid #e6e6e6;
      background-color: #fff;
      cursor: pointer;
    }
  }
</style>

<style>
  .menu .el-submenu__icon-arrow {
    right: 10px;
    top: 55%;
  }

  .menu .el-submenu__title {
    height: 48px;
    line-height: 48px;
    overflow: hidden;
  }
</style>
