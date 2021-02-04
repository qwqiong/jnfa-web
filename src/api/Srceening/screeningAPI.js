import request from '../axios'
// 肺癌筛查中心

/**
 *  --------------------------------------- 数据模型指标设置 Start ---------------------------------------
 */

/**
 * 增加指标
 * 
 * @param {String} subject  主题
 * @param {String} minAge  
 * @param {String} maxAge 
 * @param {String} exposeHis//危险因素 
 * @param {String} manageOrg //属于地区
 * @param {String} pastMaliGnant//是否有恶性肿瘤病史
 * @param {String} smoke//是否抽烟
 * @param {String} passiveSmoking //是否戒过烟
 * 
 * @method
 * 
 * @return {Object} 
 {
  "code": 0,
  "data": {},
  "msg": "string"
 }
 */
export function postIndicatorAdd(params) {
  return request({
    url: '/indicator/add',
    method: 'POST',
    params
  })
}

/**
 * 查找所有指标
 * 
 * @method
 * 
 * @return {Object} 
{
  "code": 200,
  "msg": "调用成功",
  "data": [
    {
      "id": 2,
      "subject": "主题1",
      "minAge": 0,
      "maxAge": 100,
      "smoke": true,
      "passiveSmoking": true,
      "exposeHis": true,
      "pastMaliGnant": true,
      "manageOrg": "双港"
    }
  ]
}
 */
export function postIndicatorListAll(params) {
  return request({
    url: '/indicator/listAll',
    method: 'POST',
    params
  })
}

/**
 * 删除指标
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
export function postIndicatordDelete(params) {
  return request({
    url: '/indicator/delete',
    method: 'POST',
    params
  })
}

/**
 * 新建筛查任务
 * @param {String} taskName //测试任务
 * @param {String} startTime //开始时间
 * @param {String} indicatorId //id
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
export function postTaskAdd(params) {
  return request({
    url: '/task/add',
    method: 'POST',
    params
  })
}

/**
 * 删除筛查任务
 * @param {String} id //id
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
export function postTaskDelete(params) {
  return request({
    url: '/task/delete',
    method: 'POST',
    params
  })
}

/**
 * 查询所有筛查任务
 * 
 * @method
 * 
 * @return {Object} 
{
  "code": 200,
  "msg": "调用成功",
  "data": [
    {
      "id": 8,
      "taskName": "测试任务",
      "startTime": "2021-01-28T01:18:00.000+00:00",
      "endTime": "2021-01-29T07:08:20.000+00:00",
      "indicatorId": 2,
      "status": "finished"
    }
  ]
}
 */
export function postTaskListAll(params) {
  return request({
    url: '/task/listAll',
    method: 'POST',
    params
  })
}

/**
 * 启动筛查任务
 * @param {String} id //id
 * 
 * @method
 * 
 * @return {Object} 
{
  "code": 0,
  "msg": "有正在执行的筛查任务，不能开始新的任务",
  "data": null
}
 */
export function postTaskStart(params) {
  return request({
    url: '/task/start',
    method: 'POST',
    params
  })
}

/**
 * 居民查询--筛查结果数据查询
 * @param {String} page 
 * @param {String} size 
 * @param {String} minAge 
 * @param {String} maxAge 
 * @param {String} exposeHis 
 * @param {String} manageOrg 
 * @param {String} pastMaliGnant 
 * @param {String} smoke 
 * @param {String} passiveSmoking 
 * @method
 * 
 * @return {Object} 
{
  "code": 200,
  "msg": "调用成功",
  "data": {
    "total": 1,
    "list": [
      {
        "archiveId": "8993406",
        "sickName": "刘晓晨（中心）",
        "sickPhone": "17718181811",
        "sickSex": "女",
        "birthday": "2013-07-04",
        "identityCardNo": "120112201307041153",
        "occupation": "无职业",
        "expHistoryChemistry": "1",
        "expHistoryToxicology": "0",
        "expHistoryRay": "0",
        "pastMalignant": "1",
        "pastMalignantCon": "肺癌",
        "pastMalignantDate": "2012-02-01",
        "manageOrg": "双港镇卫生院"
      }
    ]
  }
}
 */
export function postHighRiskPageList(params) {
  return request({
    url: '/highRisk/pageList',
    method: 'POST',
    params
  })
}

/**
 * 筛查结果复审 （审核通过）
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
export function postHighRiskApprove(params) {
  return request({
    url: '/highRisk/approve',
    method: 'POST',
    params
  })
}

/**
 * 筛查结果复审 （审核不通过）
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
export function postHighRiskRefuse(params) {
  return request({
    url: '/highRisk/refuse',
    method: 'POST',
    params
  })
}

/**
 * 高危人群信息提醒设置
 * @param {String} id 
 * @param {String} content 
 * @param {String} pushTime
 * @param {String} setting
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
export function postWarnContentSave(params) {
  return request({
    url: '/warnContent/save',
    method: 'POST',
    params
  })
}

/**
 * 高危人群信息提醒分页查询
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
        "total": 2,
        "list": [
            {
                "id": 2,
                "content": "string111",
                "status": "启用",
                "setting": "审核后推送",
                "pushTime": "2021-01-29 13:44:03"
            }
        ]
    }
    }
 */
export function postWarnContentPageList(params) {
  return request({
    url: '/warnContent/pageList',
    method: 'POST',
    params
  })
}

/**
 * 高危人群信息提醒 启用
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
export function postWarnContentEnable(params) {
  return request({
    url: '/warnContent/enable',
    method: 'POST',
    params
  })
}

/**
 * 高危人群信息提醒 禁用
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
export function postWarnContentDisable(params) {
  return request({
    url: '/warnContent/disable',
    method: 'POST',
    params
  })
}

/**
 *  --------------------------------------- 数据模型指标设置 End ---------------------------------------
 */