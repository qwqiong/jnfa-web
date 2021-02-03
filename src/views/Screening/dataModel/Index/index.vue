<template>
  <div class="dataModelIndex">
    <!-- 查询搜索项 -->
    <div class="dataModelIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="dataModelIndex_query_from p-r"
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
        <!-- 年龄 -->
        <el-form-item label="年龄">
          <el-input
            prefix-icon="el-icon-search"
            placeholder="年龄min"
            v-model="searchForm.minAge"
          />
        </el-form-item>
        <el-form-item>
          -
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-search"
            placeholder="年龄max"
            v-model="searchForm.maxAge"
          />
        </el-form-item>
        <el-form-item label="危险因素(至少包含以下一项危险因素）">
          <el-checkbox-group v-model="searchForm.dangerous">
            <el-checkbox
              label="a)	吸烟>=20包年，其中包括戒烟时间不足15年者"
              name="dangerous"
            ></el-checkbox>
            <el-checkbox
              label="b)	被动吸烟者"
              name="dangerous"
            ></el-checkbox>
            <el-checkbox
              label="c)	有职业暴露史（石棉、铍、铀、氡等接触者）"
              name="dangerous"
            ></el-checkbox>
            <el-checkbox
              label="d)	有恶性肿瘤病史或弥漫性肺纤维化病史"
              name="dangerous"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
          <!-- 添加 -->
          <add-modal />
          <el-button @click="handleCustomIndicators">自定义指标</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="dataModelIndex_table">
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
          prop="id"
          label="ID"
          width="120"
        />
        <el-table-column
          prop="subject"
          label="课题"
          width="120"
        />
        <el-table-column
          prop="age"
          label="年龄"
          width="120"
        />
        <el-table-column
          prop="address"
          label="地址"
          width="300"
        />

        <el-table-column
          prop="dangerous"
          label="危险因素"
          width="120"
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
              @click.native.prevent="handleElete(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="dataModelIndex_footer">
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
  </div>

</template>

<script>
export default {
  name: 'dataModelIndex',
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        subject: '',//课题
        minAge: '',//最小年龄
        maxAge: '',//最大年龄
        dangerous: [],//危险因素
      },//查询条件
      tableData: [{
        key: '1',
        subject: '测试',
        id: 'A001',
        age: '50-75',
        address: '上海市普陀区金沙江路 1518 弄',
        dangerous: '被动吸烟',
      }, {
        key: '2',
        subject: '测试',
        id: 'A002',
        age: '50-75',
        address: '上海市普陀区金沙江路 1518 弄',
        dangerous: '被动吸烟',
      }, {
        key: '3',
        subject: '测试',
        id: 'A003',
        age: '50-75',
        address: '上海市普陀区金沙江路 1518 弄',
        dangerous: '被动吸烟',
      }, {
        key: '4',
        subject: '测试',
        id: 'A004',
        age: '50-75',
        address: '上海市普陀区金沙江路 1518 弄',
        dangerous: '被动吸烟',
      }, {
        key: '5',
        subject: '测试',
        id: 'A005',
        age: '50-75',
        address: '上海市普陀区金沙江路 1518 弄',
        dangerous: '被动吸烟',
      }, {
        key: '6',
        subject: '测试',
        id: 'A006',
        age: '50-75',
        address: '上海市普陀区金沙江路 1518 弄',
        dangerous: '被动吸烟',
      }],//table模拟数据
      currentPage: 1,
      total: 100,
      addVisible: false,//添加Modal显示隐藏
    }
  },
  methods: {
    //   查询
    handleSearch() {
      console.log('查询--->>>>', this.searchForm);
      alert('查询')
    },
    // 自定义指标
    handleCustomIndicators() {
      alert('自定义指标')
    },
    // 编辑
    handleEdit() {
      alert('编辑')
    },
    // 移除
    handleElete() {
      alert('移除')
      this.$message({
        message: '删除成功!',
        type: 'success'
      });
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
.dataModelIndex {
  .dataModelIndex_query {
    .dataModelIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .dataModelIndex_table {
    background: #fff;
  }
  .dataModelIndex_footer {
    margin-top: 10px;
  }
}
</style>


