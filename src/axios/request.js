import axios from 'axios'

export function request(config) {
  //方法三
  const instance = axios.create({
    baseURL: 'http://mobileapi.gree.com/wfApi/api',
    timeout: 5000,
  });
  return instance(config);
  //方法二
  // return new Promise((resolve, reject) => {
  //   const instance = axios.create({
  //     baseURL: 'http://mobileapi.gree.com/wfApi/api',
  //     timeout: 5000,
  //   });
  //   instance(config).get(url, params).then(res => {
  //     resolve(res);
  //   }).catch(e => {
  //     reject(e);
  //   });
  // });
  //方法一
  // const instance =axios.caret({
  //   baseURL:'',
  //   timeout:5000,
  // });
  //
  // instance(config).then(res=>{
  //   success(res);
  // }).catch(e =>{
  //   failure(e);
  // });
}



