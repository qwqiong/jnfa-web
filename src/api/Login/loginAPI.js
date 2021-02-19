import request from '../axios'

/**
 * 用户登录
 * @method postUserLogin
 *
 * @param {String} username
 * @param {String} password
 *
 * @return {Object}
 {
    "code": 200,
    "msg": "调用成功",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiJ9"
        }
    }
 */
export function postUserLogin(params) {
  return request({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户信息
 * @param token
 * @returns {AxiosPromise}
 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
