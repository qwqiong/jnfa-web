import axios from 'axios';//吃

import {
  Message
} from 'element-ui'
//  .defaults.headers.common['token'] = store.state.token;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.defaults.withCredentials = true; //让ajax携带cookie

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = '/api'
} else {
  axios.defaults.baseURL = '/'
}

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    const res = response.data
    if (!!res.code && res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject('error')
    } else {
      return res
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求';
          Message.error('http版本不支持该请求');
          break;
        case 403:
          err.message = '拒绝访问';
          Message.error('拒绝访问');
          break;
        case 404:
          err.message = '请求错误,未找到该资源';
          Message.error('请求错误,未找到该资源');
          break;
        case 405:
          err.message = '请求方法未允许';
          Message.error('请求方法未允许');
          break;
        case 408:
          err.message = '请求超时';
          Message.error('请求超时');
          break;
        case 500:
          err.message = '服务器端出错';
          Message.error('服务器端出错');
          break;
        case 501:
          err.message = '网络未实现';
          Message.error('网络未实现');
          break;
        case 502:
          err.message = '网络错误';
          Message.error('网络错误');
          break;
        case 503:
          err.message = '服务不可用';
          Message.error('服务不可用');
          break;
        case 504:
          err.message = '网络超时';
          Message.error('网络超时');
          break;
        case 505:
          err.message = 'http版本不支持该请求';
          Message.error('http版本不支持该请求');
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败";
      Message.error('连接到服务器失败');
    }
    // message.err(err.message)
    return Promise.reject(err)
  });

export default axios;
