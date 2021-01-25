import request from './axios'

/**
 *  --------------------------------------- 首页 Start ---------------------------------------
 */


/**
 * 查询本年度的项目总数
 * 
 * @method GetSearchthisyearprojectsum
 * 
 * @param {String} userId 
 * 
 * @return 
 * {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 */
export function GetSearchthisyearprojectsum(params) {
    return request({
        url: '/homepagecontroller/searchthisyearprojectsum',
        method: 'get',
        params
    })
}



/**
 * 学科建设餅图
 * 
 * @method GetDcinfoadministrationpiechart
 * 
 * @param {String} start 
 * @param {String} end
 *
 * @return 
    {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 * 
 */
export function GetDcinfoadministrationpiechart(params) {
    return request({
        url: '/homepagecontroller/dcinfoadministrationpiechart',
        method: 'get',
        params
    })
}



/**
 * 科研成果餅图
 * 
 * @method GetSradministrationpiechart
 * 
 * @param {String} start
 * @param {String} end
 *
 * @return 
    {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 * 
 */
export function GetSradministrationpiechart(params) {
    return request({
        url: '/homepagecontroller/sradministrationpiechart',
        method: 'get',
        params
    })
}


/**
 * 首頁的柱狀圖
 * 
 * @method PostHomepageadministrationbarchart
 * 
 * @param {Object} params
 * 
 * @example
 * 
 * {
    "start": "",
    "end": "",
    "userId": "",
    "types": [] Array类型
 * } 
 * 
 * @return
    {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 * 
 */
export function PostHomepageadministrationbarchart(params) {
    return request({
        url: '/homepagecontroller/homepageadministrationbarchart',
        method: 'post',
        data: params
    })
}



/**
 * 统计数据  横
 * 
 * @method GetTransverseProjectSum
 * 
 * @return
    {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 * 
 * 
 */
export function GetTransverseProjectSum(params) {
  return request({
    url: '/ProjectTransverse/getProjectSum',
    method: 'get',
    params
  })
}


/**
 * 统计数据  纵
 * 
 * @method GetPortraitProjectSum
 * 
 * @return
    {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 * 
 */
export function GetPortraitProjectSum(params) {
  return request({
    url: '/projectportrait/getProjectSum',
    method: 'get',
    params
  })
}


/**
 * 用户查看待办事项
 * 
 * @method GetSearchpushcontent
 * 
 * @param {String} receiverId  接受者 用户ID
 * 
 * @example
 * 
 * {
    "receiverId": "",
 * } 
 * 
 * @return
    {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 * 
 */
export function GetSearchpushcontent(params) {
  return request({
    url: '/pushcontent/searchpushcontent',
    method: 'get',
    params
  })
}


/**
 * 用户设置已读代办事项
 * 
 * @method PostUpdpushcontent
 * 
 * @param {Object} params
 * 
 * @example
 * 
 * {
    "id": "",
 * } 
 * 
 * @return
    {
      "dataObject": {},  //  
      "description": "",
      "status": 200
 * }
 * 
 */
export function PostUpdpushcontent(params) {
  return request({
    url: '/pushcontent/updpushcontent',
    method: 'post',
    data: params
  })
}

/**
 *  --------------------------------------- 首页  End ---------------------------------------
 */
