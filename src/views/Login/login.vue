<template>
  <div class='login'>
    <el-card class='login-card'>
      <el-header class="header-box">
        <h2 class="login-title">
          <i class="logo"></i>
        </h2>
      </el-header>
      <!-- 登录表单 -->
      <el-form
        ref='loginForm'
        :model="loginForm"
        :rules="loginRules"
        style='margin-top:20px'
        label-width="auto"
      >
        <!-- 表单项  prop绑定需要校验的字段名 但是 不写loginForm.username 只写username-->
        <el-form-item
          prop="username"
          label="账号:"
        >
          <!-- 绑定手机号 -->
          <el-input
            v-model="loginForm.username"
            placeHolder='请输入账号'
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码:"
        >
          <!-- 绑定验证码 -->
          <el-input
            v-model="loginForm.password"
            placeHolder='请输入密码'
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item prop="check">
          <!-- 绑定是否勾选协议 -->
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

      </el-form>
      <el-button
        @click="handleLogin"
        type="primary"
        style='width:100%'
      >登录</el-button>
    </el-card>
  </div>
</template>

<script>
import { postUserLogin } from '../../api/Login/loginAPI'
export default {
  name: 'login',
  data() {
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack() // 如果value为true直接通过
      } else {
        callBack(new Error('请同意'))
      }
    }
    return {
      loginForm: {
        username: '', // 手机号
        password: '', // 验证码
        check: false // 是否勾选协议
      },
      loginRules: {
        username: [{
          required: true, // 意味着必填
          message: '账号不能为空' // 如果没有满足要求 就会提示message的内容
        }],
        password: [{
          required: true,
          message: '密码不能为空'
        }],
        check: [{
          validator
        }]
      }
    }
  },
  methods: {
    // 登录接口
    async axiosLogin(params) {
      this.$router.push('/home/index') // 登录成功 跳转到home页
      //   let res = await postUserLogin(params)
      //   window.localStorage.setItem('user-token', res)
      //   this.$router.push('/home/index') // 登录成功 跳转到home页
    },

    handleLogin() {
      // 通过el-form组件的validata方法 校验整个表单的数据
      // 传入一个回调函数 isOK为true 说明所有的校验规则都成功了
      // 如果为false 说明有错误
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          let params = {}
          params.username = this.loginForm.username
          params.password = this.loginForm.password
          this.axiosLogin(params)
        }
      })
    },

  }
}
</script>

<style lang="scss" scoped>
.login {
  background-image: url("../../assets/img/bac.png");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 350px;
  }
  .header-box {
    height: 50px;
    .logo {
      width: 210px;
      height: 40px;
      background: url(../../assets/img/logo2.e1c148bb.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
