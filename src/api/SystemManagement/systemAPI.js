import request from './axios'
// 系统管理

/**
 *  --------------------------------------- 系统管理 Start ---------------------------------------
 */

/**
 * 用户登录
 * 
 * @param {String} username 
 * @param {String} password  
 * 
 * @method
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
        method: 'POST',
        params
    })
}

/**
 * 获取用户信息
 * 
 * @param {String} token   
 * 
 * @method
 * 
 * @return {Object} 
 {
    "code": 200,
    "msg": "调用成功",
    "data": {
        "userName": "admin",
        "realName": "管理员",
        "telephone": "1881919911",
        "orgId": 13,
        "roleId": 1,
        "orgName": "天津市卫生健康委员会",
        "roleName": "admin"
        }
    }
 */
export function getUserInfo(params) {
    return request({
        url: '/user/info',
        method: 'GET',
        params
    })
}

/**
 * 分页查看用户列表
 * 
 * @param {String} page  
 * @param {String} size   
 * 
 * @method
 * 
 * @return {Object} 
     {
    "code": 200,
    "msg": "调用成功",
    "data": {
        "total": 15,
        "list": [
            {
                "id": 1,
                "userName": "admin",
                "realName": "管理员",
                "telephone": "1881919911",
                "orgId": 13,
                "roleId": 1,
                "orgName": "天津市卫生健康委员会",
                "roleName": "admin"
            }
        ]
    }
}
 */
export function getUserPageList(params) {
    return request({
        url: '/user/pageList',
        method: 'POST',
        params
    })
}

/**
 * 新增用户
 * 
 * @param {String} username  
 * @param {String} password 
 * @param {String} realName
 * @param {String} telephone  
 *
 * @method
 * 
 * @return {Object} 
  {
  "code": 200,
  "msg": "调用成功",
  "data": null
}
 */
export function getUserAdd(params) {
    return request({
        url: '/user/add',
        method: 'POST',
        params
    })
}

/**
 * 删除用户
 * 
 * @param {String} id  
 *
 * @method
 * 
 * @return {Object} 
  {
  "code": 200,
  "msg": "调用成功",
  "data": null
}
 */
export function getUserDelete(params) {
    return request({
        url: '/user/delete',
        method: 'POST',
        params
    })
}

/**
 * 分页查询操作日志
 * 
 * @param {String} page  
 * @param {String} userName  
 * @param {String} startTime  
 * @param {String} endTime  
 * @param {String} handleName  
 *
 * @method
 * 
 * @return {Object} 
  {
  "code": 200,
  "msg": "调用成功",
  "data": {
    "total": 10,
    "list": [
      {
        "id": 1,
        "handleTime": "2020-12-22 13:49:45",
        "userName": "admin",
        "realName": "管理员",
        "moduleName": "模块名称",
        "handleName": "分页查询机构"
      }
    ]
  }
}
 */
export function getHandleLogPageList(params) {
    return request({
        url: '/handleLog/pageList',
        method: 'POST',
        params
    })
}

/**
 *  --------------------------------------- 系统管理 End ---------------------------------------
 */