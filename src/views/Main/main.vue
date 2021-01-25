<template>
  <div class="main">
    <!-- -------------------------------------------------  assessor 评审员 Start  --------------------------------------------------- -->
    <div class="main-group main-group-assessor" v-if="userInfo.userRole.indexOf('评审员') != -1">
      <div>
        <span class="head-icon p-l">JOVI</span>
        <div class="p-l">
          <p style="font-weight: bold;">{{ handleShowHour() }} {{ userInfo.userName }}，祝您开心每一天！</p>
          <p style="color: #333333;font-size: 14px;">{{ userInfo.userRole }} &emsp; {{ userInfo.deptNaming }}</p>
        </div>
      </div>
    </div>
    <!-- -------------------------------------------------  assessor 评审员 End  --------------------------------------------------- -->

    <!-- -------------------------------------------------  user 用户 Start  --------------------------------------------------- -->
    <div class="main-group main-group-user" v-if="userInfo.userRole.indexOf('普通用户') != -1">
      <ul class="header">
        <li class="p-l" style="width: 50%;margin-top: 8px;">
          <div>
            <span class="head-icon p-l">JOVI</span>
            <div class="p-l">
              <p style="font-weight: bold;">{{ handleShowHour() }} {{ userInfo.userName }}，祝您开心每一天！</p>
              <p>{{ userInfo.userRole }} &emsp; {{ userInfo.deptNaming }}</p>
            </div>
          </div>
        </li>
        <li>
          <strong>{{ projectsTotal.xmgl }}</strong>
          <hr />
          <span>科研项目总数</span>
        </li>
        <li>
          <strong>{{ projectsTotal.kypt }}</strong>
          <hr />
          <span>科研平台总数</span>
        </li>
        <li>
          <strong>{{ projectsTotal.xkjs }}</strong>
          <hr />
          <span>学科建设总数</span>
        </li>
        <li>
          <strong>{{ projectsTotal.kycg }}</strong>
          <hr />
          <span>科研成果总数</span>
        </li>
      </ul>
      <el-row :gutter="6">
        <el-col :span="14">
          <div>
            <div class="list-head">
              <span class="p-l">待办事项（{{backlogList.length}}）</span>
              <span class="p-r" style="color: #FFAB18;">
                <i class="iconfont icon-icon-"></i>
                {{ (backlogList.filter(item => item.type == 0).length ) }}条待办未读
              </span>
            </div>
            <div class="list">
              <el-scrollbar style="height:100%;overflow:hidden">
                <div v-for="(item,index) in backlogList" :key="index" class="list-item" @click="dialogTipsVisible = true; tipsForm = item; axiosPostUpdpushcontent({id:''})">
                  <i class="project"></i>
                  <span style="width: calc(54% - 40px);margin-left: 38px;">{{ item.projectName }}</span>
                  <span style="width: 10%; color: #999999;">{{ item.receiver }}</span>
                  <span style="width: 26%; white-space: nowrap;text-overflow: ellipsis;">{{ item.pushContent }}</span>
                  <i class="iconfont icon-xiangqing1"></i>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <div class="list-head">
              <span class="p-l">科研动态 （{{templateListTotal}}）</span>
              <span class="p-r">
                <el-date-picker v-model="researchTrendsSelectTime" value-format="yyyy-MM-dd" type="daterange" size="mini"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleResearchTrends">
                </el-date-picker>
              </span>
            </div>
            <div class="list">
              <el-scrollbar style="height:100%;overflow:hidden">
                <div v-for="(item,index) in templateList" class="list-item" :key="`templateList-${index}`" @click="handleTemplateItemToDetailPage(item)">
                  <span class="announcement-type trends" v-if="item.announcementType == 1">
                    科研动态
                  </span>
                  <span class="announcement-type info" v-else-if="item.announcementType == 2">
                    科研信息
                  </span>
                  <span class="announcement-type notice" v-else-if="item.announcementType ==3">
                    通知通告
                  </span>
                  <span>{{ item.announcementName }}</span>
                  <span style="color: #999999; float: right;margin-right:2%">{{ item.announcementUpdateTime }}</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="3">
        <el-col :span="24">
          <span class="bar-select-box">
            <el-date-picker class="select-time" v-model="selectTimeBarUser" value-format="yyyy-MM-dd" type="daterange"
              size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleSelectTimeBar">
            </el-date-picker>
          </span>
          <el-tabs v-model="activeName" @tab-click="handleTabChange">
            <el-tab-pane label="科研成果" name="first">
              <div class="echars-box" id="myChart1" ref="myChart1"></div>
            </el-tab-pane>
            <el-tab-pane label="科研平台" name="second">
              <div class="echars-box" id="myChart2" ref="myChart2"></div>
            </el-tab-pane>
            <el-tab-pane label="学科建设" name="third">
              <div class="echars-box" id="myChart3" ref="myChart3"></div>
            </el-tab-pane>
            <el-tab-pane label="科研项目" name="fourth">
              <div class="echars-box" id="myChart4" ref="myChart4"></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <!-- -------------------------------------------------   user 用户 End  --------------------------------------------------- -->

    <!-- -------------------------------------------------  admin Start  --------------------------------------------------- -->
    <div class="main-group main-group-admin" v-if="userInfo.userRole.indexOf('项目管理员') != -1">
      <ul class="header">
        <li class="p-l" style="width: 50%;margin-top: 8px;">
          <div>
            <span class="head-icon p-l">JOVI</span>
            <div class="p-l">
              <p style="font-weight: bold;">{{ handleShowHour() }} {{ userInfo.userName }}，祝您开心每一天！</p>
              <p>{{ userInfo.userRole }} &emsp; {{ userInfo.deptNaming }}</p>
            </div>
          </div>
        </li>
        <li>
          <strong>{{ projectsTotal.xmgl }}</strong>
          <hr />
          <span>科研项目总数</span>
        </li>
        <li>
          <strong>{{ projectsTotal.kypt }}</strong>
          <hr />
          <span>科研平台总数</span>
        </li>
        <li>
          <strong>{{ projectsTotal.xkjs }}</strong>
          <hr />
          <span>学科建设总数</span>
        </li>
        <li>
          <strong>{{ projectsTotal.kycg }}</strong>
          <hr />
          <span>科研成果总数</span>
        </li>
      </ul>
      <ul class="number-list">
        <li>
          <div>
            <p>
              <span>立项项目数</span>
              <span class="p-r">本月立项项目：{{ projectsTypeTotal.thismonth }}</span>
            </p>
            <strong>{{ projectsTypeTotal.projectCount }}</strong>
            <i></i>
          </div>
        </li>
        <li>
          <div>
            <p>
              <span>正常在研项目总数</span>
            </p>
            <strong>{{ projectsTypeTotal.underStudy }}</strong>
            <i></i>
          </div>
        </li>
        <li>
          <div>
            <p>
              <span>在研（延期）项目总数</span>
            </p>
            <strong>{{ projectsTypeTotal.delay }}</strong>
            <i></i>
          </div>
        </li>
        <li>
          <div>
            <p>
              <span>逾期项目总数</span>
            </p>
            <strong>{{ projectsTypeTotal.beOverdue }}</strong>
            <i></i>
          </div>
        </li>
        <li>
          <div>
            <p>
              <span>结题项目总数</span>
            </p>
            <strong>{{ projectsTypeTotal.conclusion }}</strong>
            <i></i>
          </div>
        </li>
      </ul>
      <el-row :gutter="3" class="echars-list-admin">
        <el-col :span="24">
          <div>
            <span class="p-r">
              <el-date-picker class="select-time" v-model="selectTimeBarAdmin" value-format="yyyy-MM-dd" type="daterange"
                size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleSelectTimeBar">
              </el-date-picker>
            </span>
            <el-tabs v-model="activeName" @tab-click="handleTabChange" class="tabs-box">
              <el-tab-pane label="科研成果" name="first">
                <div class="echars-box" id="myChart1" ref="myChart1"></div>
              </el-tab-pane>
              <el-tab-pane label="科研平台" name="second">
                <div class="echars-box" id="myChart2" ref="myChart2"></div>
              </el-tab-pane>
              <el-tab-pane label="学科建设" name="third">
                <div class="echars-box" id="myChart3" ref="myChart3"></div>
              </el-tab-pane>
              <el-tab-pane label="科研项目" name="fourth">
                <div class="echars-box" id="myChart4" ref="myChart4"></div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="department-ranking">
            <div class="department-ranking-tit">
              <b class="p-l">科室排名</b>
              <span class="iconfont icon-xiangqing1 p-r"></span>
            </div>
            <ol class="department-ranking-list">
              <li v-for="(item,index) in departmentRankingList">
                <span>{{ index + 1 }}</span>
                <span>{{ item.deptName }}</span>
                <span>{{ item.sum }}</span>
              </li>
            </ol>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="6" class="echars-pie-list-admin">
        <el-col :span="10">
          <div>
            <div>
              <span class="p-l">
                学科建设
              </span>
              <span class="p-r">
                <el-date-picker class="select-time" value-format="yyyy-MM-dd" v-model="xkjsDataOption" type="daterange"
                  size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleXkjsPieChange">
                </el-date-picker>
              </span>
            </div>
            <div class="echars-box" id="myChart5"></div>
          </div>

        </el-col>
        <el-col :span="14">
          <div>
            <div>
              <span class="p-l">
                科研成果
              </span>
              <span class="p-r">
                <el-date-picker class="select-time" value-format="yyyy-MM-dd" v-model="kycgDataOption" type="daterange"
                  size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleKycgPieChange">
                </el-date-picker>
              </span>
            </div>
            <div class="echars-box" id="myChart6"></div>
          </div>

        </el-col>
      </el-row>
    </div>
    <!-- -------------------------------------------------  admin End  --------------------------------------------------- -->

    <el-dialog title="提示内容" :visible.sync="dialogTipsVisible">
      <el-form :model="tipsForm">
        <el-form-item label="项目名称">
          <el-input v-model="tipsForm.projectName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提醒内容">
          <el-input v-model="tipsForm.pushContent" type="textarea" autosize autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTipsVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTipsVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
    mounted() {
      this.showDrawBar([]);

      if (this.userInfo.userRole.indexOf('项目管理员') != -1) { // 管理员
        this.showXkjsDrawPie([]) // 学科建设餅图
        this.showKycgDrawPie([]); // 科研成果餅图
      }

      let postDate = {
        start: '',
        end: '',
        userId: this.userInfo.userRole.indexOf('项目管理员') != -1 ? '' : this.userInfo.userId,
      };

      this.axiosGetSearchthisyearprojectsum({
        userId: this.userInfo.userId,
      }); // 查询本年度的项目总数

      this.axiosGetDcinfoadministrationpiechart(postDate); // 学科建设餅图
      this.axiosGetSradministrationpiechart(postDate); // 科研成果餅图

      this.axiosPostHomepageadministrationbarchart({
        "start": "",
        "end": "",
        "userId": this.userInfo.userId,
        "types": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      }); // 首頁的柱狀圖

      this.axiosGetTransverseProjectSum({
        userId: this.userInfo.userId,
      }); // 横
      this.axiosGetPortraitProjectSum({
        userId: this.userInfo.userId,
      }); // 纵

      if (this.userInfo.userRole.indexOf('普通用户') != -1) { // 普通用户
        this.axiosGetSearchpushcontent({
          receiverId: '',
          type: 0
        }); //  用户查看待办事项
      }


      // this.axiosGetQueryAnnouncementList({
      //   announcementName: '',
      //   announcementType: '',
      //   announcementStatus: '',
      //   start: '',
      //   end: '',
      //   pageNum: 0,
      //   pageSize: 0,
      // }); // 用户查看科研动态
    },
    methods: {
      //  用户查看待办事项设置为已读
      axiosPostUpdpushcontent(postData) {
        console.log('postData ------>>>', postData)
        PostUpdpushcontent(postData)
          .then((res) => {
            this.axiosGetSearchpushcontent({
              receiverId: '',
              type: 0
            }); //  用户查看待办事项

          })
          .catch((error) => {
            console.error(error);
          });
      },

      // 用户查看科研动态
      // axiosGetQueryAnnouncementList(postData) {
      //   GetQueryAnnouncementList(postData)
      //     .then((res) => {
      //       this.templateList = res.dataObject.dataList;
      //       this.templateListTotal = res.dataObject.total;
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // },

      // 用户查看待办事项
      axiosGetSearchpushcontent(postDate) {
        GetSearchpushcontent(postDate).then(res => {
            if (res.status == '200') {
              console.log('200 --->>>', res)
              this.backlogList = res.dataObject
            }
          })
          .catch(err => {

          })
      },

      // 横
      axiosGetTransverseProjectSum(postDate) {
        GetTransverseProjectSum(postDate).then(res => {
            if (res.status == '200') {
              if (Object.keys(this.projectsTypeTotal).length == 0) {
                this.projectsTypeTotal = res.dataObject
              } else {
                Object.keys(res.dataObject).map((item, index) => {
                  if (this.projectsTypeTotal.hasOwnProperty(item)) {
                    this.projectsTypeTotal[item] += res.dataObject[item]
                  }
                })
              }
            }
          })
          .catch(err => {

          })
      },

      // 纵
      axiosGetPortraitProjectSum(postDate) {
        GetPortraitProjectSum(postDate).then(res => {
            if (res.status == '200') {
              if (Object.keys(this.projectsTypeTotal).length == 0) {
                this.projectsTypeTotal = res.dataObject
              } else {
                Object.keys(res.dataObject).map((item, index) => {
                  if (this.projectsTypeTotal.hasOwnProperty(item)) {
                    this.projectsTypeTotal[item] += res.dataObject[item]
                  }
                })
              }
            }
          })
          .catch(err => {

          })
      },

      // 查询本年度的项目总数
      axiosGetSearchthisyearprojectsum(postDate) {
        GetSearchthisyearprojectsum(postDate).then(res => {
            if (res.status == '200') {
              this.projectsTotal = res.dataObject
            }
          })
          .catch(err => {

          })
      },

      // 学科建设餅图
      axiosGetDcinfoadministrationpiechart(params) {
        GetDcinfoadministrationpiechart(params).then(res => {
            if (res.status == 200) {
              let xkjsDataPieArr = [];
              res.dataObject.map(item => {
                xkjsDataPieArr.push({
                  value: item.num,
                  name: this.xkjsLegendDataPie[item.type]
                })
              })

              this.showXkjsDrawPie(xkjsDataPieArr)
            }
          })
          .catch(err => {

          })
      },

      // 科研成果餅图
      axiosGetSradministrationpiechart(params) {
        GetSradministrationpiechart(params).then(res => {
            if (res.status == 200) {
              let kycgDataPieArr = [];
              res.dataObject.map(item => {
                kycgDataPieArr.push({
                  value: item.num,
                  name: this.kycgLegendDataPie[item.type]
                })
              })

              this.showKycgDrawPie(kycgDataPieArr)
            }
          })
          .catch(err => {

          })
      },

      // 首頁的柱狀圖
      axiosPostHomepageadministrationbarchart(params) {
        PostHomepageadministrationbarchart(params).then(res => {
            if (res.status == 200) {
              this.showDrawBar(Object.values(res.dataObject.month));
              this.departmentRankingList = res.dataObject.top;
            }
          })
          .catch(err => {

          })
      },

      // 获取时间显示上午下午
      handleShowHour() {
        let now = new Date(),
          hour = now.getHours();
        if (hour < 6) {
          return "凌晨好！"
        } else if (hour < 9) {
          return "早上好！"
        } else if (hour < 12) {
          return "上午好！"
        } else if (hour < 14) {
          return "中午好！"
        } else if (hour < 17) {
          return "下午好！"
        } else if (hour < 19) {
          return "傍晚好！"
        } else if (hour < 22) {
          return "晚上好！"
        } else {
          return "夜里好！"
        }
      },

      // 科研动态跳转到详情页
      handleTemplateItemToDetailPage(item) {
        this.$router.push({
          path: '/portal/details',
          query: {
            announcementId: item.announcementId
          }
        })
      },

      // 科研动态的时间选择
      // handleResearchTrends(val) {
      //   if (Array.isArray(val)) {
      //     this.axiosGetQueryAnnouncementList({
      //       start: val[0],
      //       end: val[1],
      //       announcementName: '',
      //       announcementType: '',
      //       announcementStatus: '',
      //       pageNum: 0,
      //       pageSize: 0,
      //     })
      //   }
      // },

      // 首頁柱狀圖的时间选择
      handleSelectTimeBar(val) {
        let {
          activeName
        } = this;
        if (Array.isArray(val)) {
          let postDate = {
            "start": val[0],
            "end": val[1],
            "userId": "",
            "types": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
          }

          if (activeName == 'first') postDate.types = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
          if (activeName == 'second') postDate.types = [14];
          if (activeName == 'third') postDate.types = [15];
          if (activeName == 'fourth') postDate.types = [16, 17];

          this.axiosPostHomepageadministrationbarchart(postDate); // 首頁的柱狀圖
        }


      },

      // 学科建设 选择时间
      handleXkjsPieChange(val) {
        if (Array.isArray(val)) {
          let postDate = {
            start: val[0],
            end: val[1],
            userId: '',
          };
          this.axiosGetDcinfoadministrationpiechart(postDate)
        }
      },

      // 科研成果 选择时间
      handleKycgPieChange(val) {
        if (Array.isArray(val)) {
          let postDate = {
            start: val[0],
            end: val[1],
            userId: '',
          }
          this.axiosGetSradministrationpiechart(postDate)
        }
      },

      // tab 选项卡切换
      handleTabChange(tab, event) {
        console.log(tab.index)
        this.selectTimeBarUser = '';
        this.selectTimeBarAdmin = '';
        if (tab.index == '0') {
          this.$nextTick(() => {
            this.showDrawBar([]);
            this.axiosPostHomepageadministrationbarchart({
              "start": "",
              "end": "",
              "userId": "",
              "types": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            }); // 首頁的柱狀圖

            this.$echarts.getInstanceByDom(this.$refs.myChart1).resize()
          })
        }
        if (tab.index == '1') {
          this.$nextTick(() => {
            this.$echarts.getInstanceByDom(this.$refs.myChart2).resize();
            this.axiosPostHomepageadministrationbarchart({
              "start": "",
              "end": "",
              "userId": "",
              "types": [15]
            }); // 首頁的柱狀圖

          })
        }
        if (tab.index == '2') {
          this.$nextTick(() => {
            this.$echarts.getInstanceByDom(this.$refs.myChart3).resize();
            this.axiosPostHomepageadministrationbarchart({
              "start": "",
              "end": "",
              "userId": "",
              "types": [14]
            }); // 首頁的柱狀圖

          })
        }
        if (tab.index == '3') {
          this.$nextTick(() => {
            this.$echarts.getInstanceByDom(this.$refs.myChart4).resize();
            this.axiosPostHomepageadministrationbarchart({
              "start": "",
              "end": "",
              "userId": "",
              "types": [16, 17]
            }); // 首頁的柱狀圖

          })
        }
      },


      // 学科建设 饼图
      showXkjsDrawPie(data) {
        let myChart5 = this.$echarts.init(document.getElementById('myChart5'))

        let num = 0;
        data.filter(item => {
          return num += item.value
        })

        let option = {
          title: {
            text: num,
            subtext: '共计',
            x: '26.5%',
            y: '44%',
            align: 'center',
            textStyle: {
              fontSize: 20,
              color: '#54657E',
            },
            subtextStyle: {
              color: '#CCCCCC'
            }
          },
          backgroundColor: '#fff',
          color: ['#1890FF', '#0CBDC0'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            show: true,
            y: 'center',
            right: '18%',
            orient: 'vertical',
            itemWidth: 10,
            align: 'left',
            icon: 'circle',
            data: ['学科专科', '学科方向'],
            textStyle: {
              color: '#999'
            },
            formatter: function(name) {
              var itemVal = {}
              data.filter(item => {
                if (item.name == name) {

                  itemVal = item;
                  return item.name;
                }
              })

              return '' + itemVal.name + '     ' + itemVal.value + '例'
            }
          },
          series: [{
            name: '学科建设',
            type: 'pie',
            center: ['30%', '50%'],
            radius: ['28%', '60%'],
            label: {
              normal: {
                lineHeight: 5,
                position: 'inside',
                formatter: (params) => {
                  return '\n' + params.percent + '%'
                },
                fontSize: 12,
              },
            },
            data,
            itemStyle: {
              normal: {
                borderColor: "#FFFFFF",
                borderWidth: 2,
              }
            },
          }]
        };

        myChart5.setOption(option);

        window.addEventListener('resize', function() { //自适应屏幕大小
          myChart5.resize();
        })
      },

      // 科研成果 饼图
      showKycgDrawPie(data) {
        let myChart6 = this.$echarts.init(document.getElementById('myChart6'))

        let num = 0;
        let legendData1 = ['论文', '科技成果转化', '技术推广', '专利成果', '计算机软件', '著作', '标准']
        let legendData2 = ['指南', '共识', '会议相关', '医学科技成果奖励', '学会/协会任职', '期刊杂志任职']

        data.filter(item => {
          return num += item.value
        })

        let option = {
          title: {
            text: num,
            subtext: '共计',
            x: '28%',
            y: '44%',
            align: 'center',
            textStyle: {
              fontSize: 20,
              color: '#54657E',
            },
            subtextStyle: {
              color: '#CCCCCC'
            }
          },
          backgroundColor: '#fff',
          color: ['#1890FF', '#0CBDC0', '#FD6435', '#0CC07E', '#18FCFF', '#236DDB', '#FFDC18',
            '#FF1895', '#C0FF39', '#39C5FF', '#F339FF', '#FFAB18', '#9D2AFF', '#5F53FF'
          ],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: [{
            type: "scroll",
            orient: 'vertical',
            left: '46%',
            align: 'left',
            top: 'center',
            itemGap: 20,
            icon: 'circle',
            // bottom:'50%',
            textStyle: {
              fontSize: 14,
              color: '#AAAAAA'
            },
            data: legendData1,
            formatter: function(name) {
              var itemVal = {}
              data.filter(item => {
                if (item.name == name) {

                  itemVal = item;
                  return item.name;
                }
              })

              return '' + itemVal.name + '     ' + itemVal.value + '例'
            }
          }, {
            type: "scroll",
            orient: 'vertical',
            icon: 'circle',
            right: '6%',
            align: 'left',
            top: 'center',
            itemGap: 20,
            // bottom:'50%',
            textStyle: {
              fontSize: 14,
              color: '#AAAAAA'
            },
            data: legendData2,
            formatter: function(name) {
              var itemVal = {}
              data.filter(item => {
                if (item.name == name) {

                  itemVal = item;
                  return item.name;
                }
              })

              return '' + itemVal.name + '     ' + itemVal.value + '例'
            }
          }],
          series: [{
            name: '学科建设',
            type: 'pie',
            center: ['30%', '50%'],
            radius: ['28%', '60%'],
            label: {
              normal: {
                lineHeight: 5,
                position: 'inside',
                formatter: (params) => {
                  return '\n' + params.percent + '%'
                },
                fontSize: 12,
              },
            },
            data,
            itemStyle: {
              normal: {
                borderColor: "#FFFFFF",
                borderWidth: 2,
              }
            },
          }]
        };
        myChart6.setOption(option);

        window.addEventListener('resize', function() { //自适应屏幕大小
          myChart6.resize();
        })
      },

      // 柱状图
      showDrawBar(data) {
        let {
          activeName
        } = this;

        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        let myChart4 = this.$echarts.init(document.getElementById('myChart4'))

        let option = {
          title: {
            text: ''
          },
          grid: {
            left: '2%',
            right: '3%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            barGap: '-100%',
            barCategoryGap: '60%',
            itemStyle: {
              color: '#1890FF'
            },
            data,
          }]
        }
        // 绘制图表
        let option1 = option,
          option2 = option,
          option3 = option,
          option4 = option;

        if (activeName == 'first') option1.title.text = '科研成果趋势';
        myChart1.setOption(option1);
        if (activeName == 'second') option2.title.text = '科研平台';
        myChart2.setOption(option2);
        if (activeName == 'third') option3.title.text = '学科建设';
        myChart3.setOption(option3);
        if (activeName == 'fourth') option4.title.text = '科研项目';
        myChart4.setOption(option4);

        window.addEventListener('resize', function() { //自适应屏幕大小
          if (activeName == 'first') myChart1.resize();
          if (activeName == 'second') myChart2.resize();
          if (activeName == 'third') myChart3.resize();
          if (activeName == 'fourth') myChart4.resize();
        })
      },
    }
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
