<template>
  <div class="dataQuery">
    <!-- 查询搜索项 -->
    <div class="dataQuery_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="dataQuery_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- 姓名 -->
        <el-form-item label="姓名">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="姓名"
            v-model="searchForm.subject"
          />
        </el-form-item>
        <!-- 身份证 -->
        <el-form-item label="身份证">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="身份证"
            v-model="searchForm.idCard"
          />
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <!-- 添加 -->
          <add-modal />
          <el-button @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="dataQuery_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column
          fixed
          prop="key"
          label="序号"
          width="150"
        />

        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="idCard"
          label="身份证"
          width="300"
        />
        <el-table-column
          prop="sex"
          label="性别"
          width="120"
        />
        <el-table-column
          prop="telephone"
          label="联系方式"
          width="240"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleEdit(scope.$index, tableData)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="handleDetails(scope.$index, tableData)"
              type="text"
              size="small"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="dataQuery_footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 查询详情Modal -->
    <el-dialog
      title="详情"
      :visible.sync="detailsVisible"
    >
      <el-tabs
        v-model="activeName"
        @tab-click="handleTabClick"
      >
        <el-tab-pane name="first"><span slot="label"><i class="el-icon-wind-power"></i> 个人基本信息</span>
          <el-form
            :model="detailsForm"
            label-position="left"
            ref="detailsForm"
            label-width="auto"
            class="details"
          >
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="姓名：">
                  <el-input
                    v-model="detailsForm.name"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证件类型：">
                  <el-input
                    v-model="detailsForm.idType"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="身份证号码：">
                  <el-input
                    v-model="detailsForm.idCard"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：">
                  <el-radio-group
                    v-model="detailsForm.sex"
                    style="width: 100%;"
                  >
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="电话：">
                  <el-input
                    v-model="detailsForm.telephone"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期：">
                  <el-input
                    v-model="detailsForm.birth"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="国籍：">
                  <el-input
                    v-model="detailsForm.nationality"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文化程度：">
                  <el-input
                    v-model="detailsForm.culture"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="婚姻状态：">
                  <el-input
                    v-model="detailsForm.marriage"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族：">
                  <el-input
                    v-model="detailsForm.nation"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="出生地：">
                  <el-input
                    v-model="detailsForm.nationality"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="户口性质：">
                  <el-input
                    v-model="detailsForm.hkxz"
                    style="width: 100%;"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="second"><span slot="label"><i class="el-icon-wind-power"></i> 联系人信息</span></el-tab-pane>
        <el-tab-pane name="third"><span slot="label"><i class="el-icon-wind-power"></i> 儿童信息</span></el-tab-pane>
        <el-tab-pane name="fourth"><span slot="label"><i class="el-icon-wind-power"></i> 家庭成员信息</span></el-tab-pane>
        <el-tab-pane name="five"><span slot="label"><i class="el-icon-wind-power"></i> 其他信息</span></el-tab-pane>
      </el-tabs>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="detailsVisible=false">取 消</el-button>
        <el-button
          type="primary"
          @click="detailsOk('detailsForm')"
        >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'dataQueryIndex',
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        name: '',//姓名
        idCard: '',//身份证
      },//查询条件
      tableData: [{
        key: '1',
        name: '测试',
        idCard: '231084199601291615',
        sex: '男',
        telephone: '17644885599',

      }, {
        key: '2',
        name: '测试1',
        idCard: '231084199601291615',
        sex: '女',
        telephone: '17644885599',

      }, {
        key: '3',
        name: '测试',
        idCard: '231084199601291615',
        sex: '男',
        telephone: '17644885599',

      }, {
        key: '4',
        name: '测试',
        idCard: '231084199601291615',
        sex: '男',
        telephone: '17644885599',

      }, {
        key: '5',
        name: '测试',
        idCard: '231084199601291615',
        sex: '男',
        telephone: '17644885599',

      },],//table模拟数据
      currentPage: 1,
      total: 100,
      addVisible: false,//添加Modal显示隐藏
      activeName: 'first',//tab默认选中
      detailsVisible: false,//详情Modal隐藏显示
      detailsForm: {
        name: '测试1',//姓名
        idType: '身份证',//身份证类型
        idCard: '231086199601291615',//身份证号码
        sex: '1',//性别
        telephone: '17614556128',//电话
        birth: '2020年11月25日',//出生年月
        nationality: '中华人民共和国',//国籍
        culture: '博士',//学历
        marriage: '结婚已久',//婚姻状态
        nation: '汉族',//民族
        birthplace: '北京',//出生地
        hkxz: '没有',//户口性质
      },//详情回显 假数据
    }
  },

  methods: {
    handleTabClick(tab, event) {
      console.log('Tab', tab, event);
    },
    //   查询
    handleSearch() {
      console.log('查询--->>>>', this.searchForm);
      alert('查询')
    },
    // 自定义指标
    handleExport() {
      alert('自定义指标')
    },
    // 编辑
    handleEdit() {
      alert('编辑')
    },
    // 编辑
    handleDetails() {
      this.detailsVisible = true
    },
    // 详情确定
    detailsOk() {
      this.detailsVisible = false
    },
    // 每页加载几条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页-当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>


<style lang="scss" scoped>
.dataQuery {
  .dataQuery_query {
    .dataQuery_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .dataQuery_table {
    background: #fff;
  }
  .dataQuery_footer {
    margin-top: 10px;
  }
}
</style>


