<template>
  <div id="login-form">
    <el-form :model="loginForm" ref="loginForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="用户" prop="name">
        <el-input type="text" v-model="loginForm.UserID" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.Password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {request} from "../axios/request";

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          UserID: '180438',
          Password: 'qwe!23asd'
        },
      }
    },
    methods: {
      //登录验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request({
              headers: {
                AppID: 'd0af10d4-39af-4858-bee3-d5bbc226d0c4',
                AppKey: '03801334-ecdc-45c1-94ad-da3bb4480d13'
              },
              url: '/login',
              data: this.loginForm,
              method: 'POST'
            }).then(res => {
              if (res.data.JsonMessage == "") {
                this.$store.commit('initPerson',res.data);
                window.location.href = window.location.origin + "/test/#/";
              } else {
                alert(res.data.JsonMessage);
              }
            })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //重置操作，清空输入框的内容
      resetForm(formName) {
        this.loginForm.Password = '';
        this.loginForm.UserID = '';
      }
    }
  }
</script>

<style scoped>
  #login-form {
    width: 300px;
    height: 180px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 180px;
  }
</style>
