<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="welcome" v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="请稍等···"
       element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--欢迎页面-->
    <div v-on:click="toMain" id="submit" v-on:mouseenter="addActive" v-on:mouseleave="removeActive"
         :class="{'div-mouseenter':active1,'div-mouseleave':active2}">
      <img src="../assets/supply.png">
      <p>{{menu1}}</p>
    </div>
    <div v-on:click="toQuery" id="query" v-on:mouseenter="addActive2" v-on:mouseleave="removeActive2"
         :class="{'div-mouseenter':active3,'div-mouseleave':active4}">
      <img src="../assets/query.png">
      <p>{{menu2}}</p>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: "Welcome",
    data() {
      return {
        menu1:'提交交接表',
        menu2:'接班人记录',
        active1: false,
        active2: true,
        active3: false,
        active4: true,
        //authcode,工号，邮箱号，直接领导，token值

        fullscreenLoading: false,
        loginUrl:'https://mobileapi.gree.com/wfApi/api/login',
      }
    },
    async created() {
      this.getAuthcode("authcode:", window.location.hash);
      if (this.$store.state.authCode != ''){
        this.fullscreenLoading = true;
        await this.analyseAuthcode();
      }else if(this.$store.state.Token == ''){
        this.$router.push({path: '/login'});
        
      }else{
        this.fullscreenLoading = false;
      }
    },
    async activated() {
      if(this.$store.state.Token=='' && this.$store.state.authCode == ''){
        // this.getAuthcode("authcode", window.location.hash);
        this.fullscreenLoading = false;
      }else{
        this.fullscreenLoading = false;
      }

    },

    methods: {
      getAuthcode(key, urlHash) {
        let value = "";
        let url = urlHash.substr(3);
        let arr = url.split("&");
        for (let i = 0; i < arr.length; i++) {
          let ob = arr[i].split("=");
          if (ob[0] == key) {
            value = ob[1];
            this.$store.state.authCode = value;
          }
        }
      },
      //解析authCode,注意greecom api 接收的是json参数
      analyseAuthcode: function () {

        let params = {"AuthCode": this.$store.state.authcode};
        axios
          .create({
            headers: {
              'appid': "d106e653-d859-4ecf-9561-0a7bc43602c8",
              'appkey': "fe3b4a67-63b5-489a-9b43-816bcf056165"
            }
          })
          .post(this.loginUrl, params)
          .then(res => {
            // console.log(res.data);
            if (res.data.JsonMessage == "") {          
              this.$store.commit('initPerson',res.data);
              this.fullscreenLoading = false;
              this.$message({
                message: '基本信息加载成功',
                type: 'success'
              });
            } else {
              this.fullscreenLoading = false;
              this.$message.error({
                message: '基本信息加载失败',
              });
              // window.location.href = window.location.origin + "/#/login";
            }

          })
          .catch(function (error) {
              console.log(error);
            }
          );
      },

      
      //当鼠标悬浮，和移出时的背景变化
      addActive() {
        this.active1 = true;
        this.active2 = false;
      },
      removeActive() {
        this.active1 = false;
        this.active2 = true;
      },
      addActive2() {
        this.active3 = true;
        this.active4 = false;
      },
      removeActive2() {
        this.active3 = false;
        this.active4 = true;
      },

      //页面的跳转
      toMain: function () {
        //查询作业 数据 
        this.$router.push({path: '/left'});
        this.removeActive();
      },
      toQuery: function () {
        // 查询巡检 数据
        this.$router.push({path: '/right'});
        this.removeActive2();

      }
    }
  }
</script>

<style scoped>
  .div-mouseenter {
    background-color: #79bcff;
    display: inline-block;
    padding: 12px 40px;
    border-radius: 6px;
    color: #ecf5ff;
  }

  .div-mouseleave {
    display: inline-block;
    padding: 12px 40px;
    border-radius: 6px;
  }

  .welcome{
    margin-top: 50%;
  }
  .welcome p {
    margin-top: 0;
  }

</style>
