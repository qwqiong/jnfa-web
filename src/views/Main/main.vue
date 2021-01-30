<template>
  <div class="main">
    首页
  </div>
</template>

<script>
  import {
    GetSearchthisyearprojectsum, // 查询本年度的项目总数
    GetDcinfoadministrationpiechart, // 学科建设餅图
    GetSradministrationpiechart, // 科研成果餅图
    PostHomepageadministrationbarchart, // 首頁的柱狀圖
    GetTransverseProjectSum, // 横向统计
    GetPortraitProjectSum, // 纵向统计
    GetSearchpushcontent, // 用户查看待办事项
    PostUpdpushcontent, // 用户查看待办事项设置为已读
  } from "@/api/home.js"


  export default {
    name: 'Main',
    data: function() {
      return {
        activeName: 'first',
        backlogList: [], // 代办事项 list
        researchTrendsSelectTime: '', // 科研动态的时间选择
        templateList: [],
        templateListTotal: '',
        dialogTipsVisible: false, // 代办事项提示内容
        tipsForm: {}, // 代办事项提示内容详情

        projectsTotal: {}, // 项目总数
        projectsTypeTotal: {}, // 不同类型的项目总数

        xkjsDataPie: [], // 学科建设饼图
        xkjsDataOption: '', // 学科建设选择时间
        xkjsLegendDataPie: {
          1: '学科专科',
          2: '学科方向',
        }, // 学科建设饼图

        kycgDataPie: [], // 科研成果饼图
        kycgDataOption: '', // 科研成果选择时间
        kycgLegendDataPie: {
          1: '论文',
          2: '科技成果转化',
          3: '技术推广',
          4: '专利成果',
          5: '计算机软件著作权',
          6: '著作',
          7: '标准',
          8: '指南',
          9: '共识',
          10: '会议相关',
          11: '医学科技成果奖励',
          12: '学会/协会任职',
          13: '期刊杂志任职',
          14: '学科建设',
          15: '科研平台管理',
          16: '横向项目',
          17: '纵向项目',
        }, // 科研成果饼图

        selectTimeBarUser: '', // 科室 Bar 选择时间范围
        selectTimeBarAdmin: '', // 科室 Bar 选择时间范围
        departmentRankingList: [], // 科室排名
      }
    },
  }
</script>

<style lang="scss" scoped>
  .main {
    .main-group {

      // 评审员
      &.main-group-assessor {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 4px;

        &>div {
          overflow: hidden;
        }

        .head-icon {
          background: #1890FF;
          color: #FFF;
        }
      }

      // 普通用户
      &.main-group-user {
        ul.header {
          overflow: hidden;
          width: 100%;
          height: 104px;
          background: url(../../assets/img/home_bac.png) no-repeat 0px 0px;
          background-size: 100% 100%;
          color: #fff;
          padding: 24px 0px 21px 42px;

          .head-icon {
            background: #fff;
            color: #0CBDC0;
            margin-right: 22px;
          }

          li {
            width: 12.5%;
            float: right;

            div.p-l {

              p:last-child {
                font-size: 14px;
                margin-top: 6px;
              }
            }

            strong {
              font-size: 20px;
            }

            hr {
              margin: 6px 0;
              width: 30px;
              border: 1px solid #fff;
              background-color: #fff;
            }

            span {
              font-size: 12px;
            }
          }
        }

        .el-row {
          margin-top: 6px;

          .el-col {
            span.bar-select-box {
              position: absolute;
              right: 10px;
              top: 5px;
              z-index: 999;
            }

            &>div {
              padding: 0px 12px;
              background-color: #fff;
            }

            .list-head {
              height: 32px;
              line-height: 32px;
              overflow: hidden;
            }

            div.list {
              font-size: 14px;
              color: #666;
              margin-top: 20px;
              padding-bottom: 8px;
              height: 180px;

              .list-item {
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
                position: relative;

                &:hover {
                  cursor: pointer;
                  background: #eaeaea;
                }


              }

              &>div {
                height: 30px;
                line-height: 30px;

                span {
                  overflow: hidden;
                }

                .icon-xiangqing1 {
                  float: right;
                  font-size: 14px;
                  margin-right: 2%;
                }
              }

              i.project {
                width: 20px;
                height: 20px;
                background: url(../../assets/img/project.png) no-repeat 0px 0px;
                background-size: 100% 100%;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                left: 8px;
              }
            }

            div.echars-box {
              width: 100%;
              height: 260px;

              div {
                width: 100%;
                min-width: 500px;
              }
            }
          }
        }
      }

      &.main-group-admin {
        ul.header {
          overflow: hidden;
          width: 100%;
          height: 147px;
          background: url(../../assets/img/home_bac.png) no-repeat 0px 0px;
          background-size: 100% 100%;
          color: #fff;
          padding: 24px 0px 21px 42px;

          .head-icon {
            background: #fff;
            color: #0CBDC0;
            margin-right: 22px;
          }

          li {
            width: 12.5%;
            float: right;

            div.p-l {

              p:last-child {
                font-size: 14px;
                margin-top: 6px;
              }
            }

            strong {
              font-size: 20px;
            }

            hr {
              margin: 6px 0;
              width: 30px;
              border: 1px solid #fff;
              background-color: #fff;
            }

            span {
              font-size: 12px;
            }
          }
        }

        ul.number-list {
          width: 100%;
          overflow: hidden;
          margin-top: -38px;

          li {
            width: calc(20% - 14px);
            height: 124px;
            float: left;
            margin: 0 7px;
            background-color: #fff;
            padding: 20px 14px 5px;
            font-size: 14px;
            position: relative;

            span:first-child {
              color: #999999;
            }

            strong {
              font-size: 24px;
              color: #333333;
              position: absolute;
              left: 14px;
              top: 45px;
            }

            i {
              margin: auto;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 10px;

            }

            &:nth-child(1) {
              i {
                width: 199px;
                height: 27px;
                background: url(../../assets/img/home_one.png) no-repeat 0px 0px;
                background-size: 100% 100%;
              }
            }

            &:nth-child(2) {
              i {
                width: 199px;
                height: 27px;
                background: url(../../assets/img/home_two.png) no-repeat 0px 0px;
                background-size: 100% 100%;
              }
            }

            &:nth-child(3) {
              i {
                width: 199px;
                height: 27px;
                background: url(../../assets/img/home_three.png) no-repeat 0px 0px;
                background-size: 100% 100%;
              }
            }

            &:nth-child(4) {
              i {
                width: 199px;
                height: 27px;
                background: url(../../assets/img/home_four.png) no-repeat 0px 0px;
                background-size: 100% 100%;
              }
            }

            &:nth-child(5) {
              i {
                width: 199px;
                height: 27px;
                background: url(../../assets/img/home_five.png) no-repeat 0px 0px;
                background-size: 100% 100%;
              }
            }

          }

        }

        .echars-list-admin {
          padding: 12px 20px;
          margin-top: 10px;
          background-color: #fff;

          .select-time {
            position: absolute;
            top: 12px;
            right: 24px;
            z-index: 999;
          }

          .tabs-box {
            width: 80%;
            float: left;

            .echars-box {
              height: 240px;
            }

          }

          .department-ranking {
            width: 20%;
            float: right;
            overflow: hidden;
            margin-top: 38px;
            border-top: 2px solid #E4E7ED;
            padding-top: 22px;

            .department-ranking-tit {
              overflow: hidden;
              line-height: 20px;

              b {
                font-size: 16px;
              }

              span.icon-xiangqing1 {
                font-size: 14px;
              }
            }

            .department-ranking-list {
              margin-top: 26px;

              li {
                margin: 10px 0px;

                span {
                  font-size: 14px;
                }

                span:first-child {
                  width: 16px;
                  height: 16px;
                  background: #F6F6F6;
                  border-radius: 50%;
                  color: #CCCCCC;
                  text-align: center;
                  font-size: 12px;
                }
              }

              span:nth-child(2) {
                margin-left: 22px;
              }

              span:last-child {
                float: right;
              }

              li:nth-child(1),
              li:nth-child(2),
              li:nth-child(3) {
                span:first-child {
                  background: #1890FF;
                  color: #fff;
                }
              }
            }

          }
        }

        .echars-pie-list-admin {
          margin-top: 6px;

          .el-col>div {
            background-color: #fff;

            &>div {
              height: 56px;
              line-height: 56px;
              border-bottom: 1px solid #EFF3F6;
              padding: 0 30px;
            }

            .echars-box {
              height: 325px;
              padding: 0;
              background: #FFFFFF;
            }
          }
        }
      }
    }



    .head-icon {
      display: inline-block;
      width: 44px;
      height: 44px;
      line-height: 44px;
      border-radius: 50%;
      margin-right: 8px;
      text-align: center;
    }

    span.announcement-type {
      // 公告类型
      font-size: 14px;
      font-style: inherit;
      padding: 0px 8px;
      height: 30px;
      line-height: 30px;
      margin-bottom: 5px;
      margin-left: 8px;

      &.trends {
        // 科研动态
        color: #1990FF;
        background-color: #CAE2F9;
      }

      &.info {
        // 科研信息
        color: #0DBEC0;
        background-color: #C8EBEC;
      }

      &.notice {
        // 通知通告
        color: #FE5A28;
        background-color: #F8D7CD;
      }
    }
  }
</style>
