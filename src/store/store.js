import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    AppID: '',
    AppKey: '',
    authCode: '',
    UserID: '',//邮箱号
    UserName: '',//姓名
    HREmpID: '',//HR工号
    OrgL1: '',//公司编号
    OrgL2: '',//部门编号
    OrgL3: '',//科室编号
    OrgL4: '',//组编号
    Company: '',//公司编号 旧
    Department: '',//部门编号 旧，流程中部门绑定的需要
    Group: '',//科室编号 旧
    Job: '',//软件工程师
    Title: '',//职能
    RoleName:'',
    Token: '',
    OfficeLeader: [], //科室领导
    DeptLeader: [], //部门领导
    GroupLeader: [], // 组长
    EmpID: '',//员工编号  旧
  },
  mutations:{
    initPerson(state,data){
      state.UserID = data.UserID;
      state.UserName = data.UserName;
      state.HREmpID = data.HREmpID;
      state.OrgL1 = data.OrgL1;
      state.OrgL2 = data.OrgL2;
      state.OrgL3 = data.OrgL3;
      state.OrgL4 = data.OrgL4;
      state.Company = data.Company;
      state.Department = data.Department;
      state.Group = data.Group;
      state.Job = data.Job;
      state.Title = data.Title;
      state.RoleName = data.RoleName;
      state.Token = data.Token;
      state.OfficeLeader = data.OfficeLeader;
      state.DeptLeader = data.DeptLeader;
      state.GroupLeader = data.GroupLeader;
      state.EmpID = data.EmpID;
    }
  }
});

export default store
