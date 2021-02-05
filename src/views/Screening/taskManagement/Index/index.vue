<template>
  <div class="taskManagementIndex">
    <!-- 查询搜索项 -->
    <div class="taskManagementIndex_query">
      <el-form
        :inline="true"
        :model="searchForm"
        class="taskManagementIndex_query_from p-l"
        size="mini"
        ref="searchForm"
      >
        <!-- 时间 -->
        <el-form-item label="时间">
          <el-date-picker
            v-model="searchForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 任务状态 -->
        <el-form-item label="任务状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择任务状态"
          >
            <el-option
              label="完成"
              value="0"
            >完成</el-option>
            <el-option
              label="执行中"
              value="1"
            >执行中</el-option>
            <el-option
              label="未执行"
              value="2"
            >未执行</el-option>
          </el-select>
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <!-- 新建任务 -->
          <el-button @click="addTask">新建任务</el-button>
          <el-button
            type="primary"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table 数据展示 -->
    <div class="taskManagementIndex_table">
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
          prop="Id"
          label="ID"
          width="150"
        />
        <el-table-column
          prop="subjectName"
          label="任务名称"
          width="200"
        />
        <el-table-column
          prop="content"
          label="任务详情"
          width="300"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleStart(scope.$index, tableData)"
              type="text"
              size="small"
            >
              启动
            </el-button>
            <el-button
              @click.native.prevent="handleStop(scope.$index, tableData)"
              type="text"
              size="small"
            >
              停止
            </el-button>
            <el-button
              @click.native.prevent="handleDelete(scope.$index, tableData)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页底部展示 -->
    <div class="taskManagementIndex_footer">
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
  name: 'taskManagementIndex',
  data() {
    return {
      total: 0, // 查询总数
      pageNum: 1, // 查询分页
      pageSize: 5, // 查询分页
      searchForm: {
        date: '',//时间
        status: '',//状态
      },//查询条件
      tableData: [{
        key: '1',
        Id: 'A001',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '2',
        Id: 'A001',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '3',
        Id: 'A001',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '4',
        Id: 'A001',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '5',
        Id: 'A001',
        subjectName: '课题1',
        content: '测试',
      }, {
        key: '6',
        Id: 'A001',
        subjectName: '课题1',
        content: '测试',
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
    addTask() {
      alert('新建任务')
    },
    // 启动
    handleStart() {
      alert('启动')
    },
    // 停止
    handleStop() {
      alert('停止')
    },
    // 删除
    handleDelete() {
      alert('删除')
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
.taskManagementIndex {
  .taskManagementIndex_query {
    .taskManagementIndex_query_from {
      background: #fff;
      padding: 12px 16px;
    }
  }
  .taskManagementIndex_table {
    background: #fff;
  }
  .taskManagementIndex_footer {
    margin-top: 10px;
  }
}
</style>


