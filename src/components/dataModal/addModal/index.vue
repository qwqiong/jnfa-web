<template>
  <div class="addClass">
    <el-button @click="handleToAddPage">添加</el-button>
    <el-dialog
      title="添加"
      :visible.sync="addVisible"
    >

      <el-form
        :model="addForm"
        :rules="ruleForm"
        label-position="left"
        ref="addForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="课题名称："
              prop="subject"
            >
              <el-input
                v-model="addForm.subject"
                placeholder="请输入课题名称"
                style="width:572px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item
              label="最小年龄："
              prop="minAge"
            >
              <el-input
                placeholder="年龄min"
                v-model="addForm.minAge"
                style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="maxAge"
              label="最大年龄："
            >
              <el-input
                placeholder="年龄max"
                v-model="addForm.maxAge"
                style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="危险因素："
              prop="exposeHis"
            >
              <el-select
                v-model="addForm.exposeHis"
                placeholder="请选择危险因素"
                style="width:572px"
              >
                <el-option
                  v-for="item in exposeHisList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item
              label="地区选择："
              prop="exposeHis"
            >
              <el-cascader
                v-model="addForm.manageOrg"
                :options="manageOrgOptions"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否有恶性肿瘤病史："
              prop="pastMaliGnant"
            >
              <el-radio-group v-model="addForm.pastMaliGnant">
                <el-radio
                  label="是"
                  value="1"
                ></el-radio>
                <el-radio
                  label="否"
                  value="0"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item
              label="是否抽烟："
              prop="smoke"
            >
              <el-radio-group v-model="addForm.smoke">
                <el-radio
                  label="是"
                  value="1"
                ></el-radio>
                <el-radio
                  label="否"
                  value="0"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否戒过烟："
              prop="passiveSmoking"
            >
              <el-radio-group v-model="addForm.passiveSmoking">
                <el-radio
                  label="是"
                  value="1"
                ></el-radio>
                <el-radio
                  label="否"
                  value="0"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addVisible=false">取 消</el-button>
        <el-button
          type="primary"
          @click="addOk('addForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addModal',//数据模型指标设置-添加Modal弹出
  data() {
    return {
      addVisible: false,
      addForm: {
        subject: '',//课题
        minAge: '',//最小年龄
        maxAge: '',//最大年龄
        smoke: '',//是否吸烟
        exposeHis: '',//危险因素
        passiveSmoking: '',//是否戒过烟
        pastMaliGnant: '',//是否有肿瘤病史
        manageOrg: '',//属于地区
      },
      ruleForm: {
        subject: [
          { required: true, message: '请输入课题名称', trigger: 'blur' },
        ],
        minAge: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        maxAge: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        exposeHis: [
          { required: true, message: '请选择危险因素', trigger: 'blur' }
        ],
        manageOrg: [
          { required: true, message: '请选择属于地区', trigger: 'blur' }
        ],
        pastMaliGnant: [
          { required: true, message: '请选择是否有肿瘤病史', trigger: 'blur' }
        ],
        smoke: [
          { required: true, message: '请选择是否有肿瘤病史', trigger: 'blur' }
        ],
        passiveSmoking: [
          { required: true, message: '请选择是否有肿瘤病史', trigger: 'blur' }
        ]
      },
      exposeHisList: [
        { id: "1", value: '吸烟>=20包年，其中包括戒烟时间不足15年者' },
        { id: "2", value: '被动吸烟者' },
        { id: "3", value: '有职业暴露史（石棉、铍、铀、氡等接触者）' },
        { id: "4", value: '有恶性肿瘤病史或弥漫性肺纤维化病史' },
      ],//危险因素假数据 选项
      manageOrgOptions: [{
        label: '全国',
        value: '000000000000',
        children: [{
          value: '110000000000',
          label: '北京',
          children: [{
            value: '110000000001',
            label: '东城'
          }, {
            value: '110000000002',
            label: '西城'
          }, {
            value: '110000000003',
            label: '海淀'
          }, {
            value: '110000000004',
            label: '朝阳'
          }]
        }, {
          value: '120000000000',
          label: '天津',
          children: [{
            value: '120000000001',
            label: '西青'
          }, {
            value: '120000000002',
            label: '河东'
          }, {
            value: '120000000003',
            label: '河西'
          }, {
            value: '120000000004',
            label: '南开'
          }]
        }]
      }],//属于地区假数据

    }
  },
  methods: {
    //   添加
    handleToAddPage() {
      this.addVisible = true
    },
    // 点击确定保存
    addOk(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          this.addVisible = false
        } else {
          this.$message({
            message: '添加失败!',
            type: 'success'
          });
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.addClass {
  display: inline-block;
}
.el-form-item {
  .el-form-item {
    margin-bottom: 14px;
  }
}
</style>