<template>
  <div class="">
    <span class="title">接班记录表</span>
    <el-form
      label-width="90px"
      :model="applyForm"
      :rules="rules"
      status-icon
      ref="applyForm"
    >
      <el-form-item label="交班人" >
        <el-input v-model="applyForm.交班人" readonly></el-input>
      </el-form-item>
      <el-form-item label="交班时间" required >
        <el-date-picker
          type="datetime"
          placeholder="选择进入时间"
          v-model="applyForm.交班时间"
          style="width: 100%"
          readonly
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="班 次">
        <el-select v-model="applyForm.班次" style="width: 100%" readonly>
          <el-option label="白班" value="白班"></el-option>
          <el-option label="夜班" value="夜班"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生产情况" required readonly>
        <el-input type="textarea" v-model="applyForm.当班生产情况"></el-input>
      </el-form-item>
      <el-form-item label="注意事项" readonly>
        <el-input type="textarea" v-model="applyForm.注意事项"></el-input>
      </el-form-item>
      <el-form-item label="接班人" readonly>
        <el-input
          v-model="applyForm.接班人"
          placeholder="填写邮箱号"
        ></el-input>
      </el-form-item>
      <el-form-item label="工 号" required prop="nextp">
        <el-input
          v-model="applyForm.工号"
          placeholder="填写工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="检查情况" required prop="desc">
        <el-input type="textarea" v-model="applyForm.接班检查情况"></el-input>
      </el-form-item>
      <el-form-item label="部门编号" >
        <el-input v-model="applyForm.部门编号"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="Submit()" style="width: 100%"
      >提交</el-button>
  </div>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {     
      //表单内容
      applyForm: {
        交班人: "",
        交班时间: "",
        当班生产情况: "",
        注意事项: "",
        班次: "白班",
        接班人: "",
        工号:'',
        接班检查的情况:'',
        部门编号:''

      },
      rules:{      
        desc:[{ required: true, message: '请描述接班检查情况', trigger: 'blur' }],
        nextp:[{ required: true, message: '请填写员工编号', trigger: 'blur' }]
      }
    };
  },
  //初始化组件的值
  activated() {},
  methods: {
    Submit: function (applyForm) {
      this.$refs[applyForm].validate((valid) => {
        if (valid) {
          let param = {
            WFID: "",
            WFNodeOperationID: "",
            MainData: this.applyForm,
          };
          axios
            .create({
              headers: {
                appid: "",
                appkey: "",
                token: this.$store.state.Token,
                "Content-Type": "application/json",
              },
            })
            .post("http://mobileapi.gree.com/wfapi/api/Business", param)
            .then((res) => {
              console.log("Submit post data:------", param);
              if (res.data.JsonMessage == "") {
                alert("提交成功！");
              } else {
                alert("提交失败：" + res.data.JsonMessage);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  display: inline-block;
  margin: 20px 0;
  font-size: large;
  letter-spacing: 4px;
  font-weight: 700;
}
</style>
