import request from './axios'

/*!
 * 科研平台管理相关接口文档
 */


/**
 *  --------------------------------------- 科研平台管理 Start ---------------------------------------
 */

/**
 * 科研平台管理 - list查询
 * 
 * @method GetPlatFormSelectBySearch
 * 
 * @param {String} searchName  平台名称
 * @param {String} searchLevel  全部级别
 * @param {String} userId 
 * @param {String} pageNum 
 * @param {String} pageSize 
 * 
 * @example 
 * 
 * {
    "searchName": "",  查询名称   String类型
    "searchLevel": "",   全部作者_中文  String类型 
    "userId": "",  String类型
    "pageNum": "",  String类型
    "pageSize": "", String类型
 * }
 * 
 * 
 * @return {Object} 
 * {
     "dataObject": {
        "total": 1, 总数 int 类型
        "dataList": [
         {
            "caofLiteratureCenterPartition": "分区中心",  中科院文献情报中心分区 String 类型
             
            }
        ]
     },
     "description": "成功",
     "status": 200
 * }
 */
export function GetPlatFormSelectBySearch(params) {
    return request({
        url: '/PlatForm/selectBySearch',
        method: 'GET',
        params
    })
}


/**
 * 科研平台管理新增
 * 
 * @method PostAddPlatForm
 * 
 * @param {Object} params 
 * 
 * @example 
 * 
 * {
    "platformId": "",  科研平台id  String 类型
    "platformName": "",  科研平台名称 String 类型
    "platformLevel": "", 科研平台等级 0.国家级、1.省部级、2.厅局级、3.其他 String类型 
    "platformCompany": "", 批准单位  String类型
    "approvedBy": "", 财政拨款经费  String类型
    "platformIntroduce": "", 平台简介  String类型
    "platformFile": "", 附件上传信息  String类型
    "platformFileId": "", 附件上传信息Id  String类型
    "secondSubmit": "", 二次提交内容  String类型
    "secondSubmitFile": "", 二次提交文件  String类型
    "secondReason": "", 二次提交申请理由简述  String类型
    "approvedStatus": "", 4.审核失败：显示失败状态，可以重新提交)  String类型
    "founderId": "", 创建人id  String类型
    "founderName": "", 创建人名称  String类型
    "rejectReason": "", 拒绝原因  String类型
    "createTime": "", 创建时间  String类型
    "updateTime": "", 更新时间  String类型
    "PlatFormUser": [{  
        "platformId": "",平台id， String类型
        "userId": "", 成员编号   String类型
        "userName": "", 成员名称   Stirng类型
        "deptCode": "",科室名称编码  Stirng类型
        "deptName": "",科室名称  String类型 
        "platformPost": "",  0.主任、1.副主任、2.秘书 3.固定人员  String类型
        "userType": "", 0.内院 1.外院  String类型  
        "createTime": "", 创建时间   String类型
        "updateTime": "", 更新时间  String类型
    }],
 * }
 */
export function PostAddPlatForm(params) {
    return request({
        url: '/PlatForm/insPlatForm',
        method: 'POST',
        data: params
    })
}

/**
 * 科研平台管理修改
 * 
 * @method PostUpDatePlatForm
 * 
 * @param {Object} params 
 * 
 * @example 
 * 
 * {
    "platformId": "",  科研平台id  String 类型
    "platformName": "",  科研平台名称 String 类型
    "platformLevel": "", 科研平台等级 0.国家级、1.省部级、2.厅局级、3.其他 String类型 
    "platformCompany": "", 批准单位  String类型
    "approvedBy": "", 财政拨款经费  String类型
    "platformIntroduce": "", 平台简介  String类型
    "platformFile": "", 附件上传信息  String类型
    "platformFileId": "", 附件上传信息Id  String类型
    "secondSubmit": "", 二次提交内容  String类型
    "secondSubmitFile": "", 二次提交文件  String类型
    "secondReason": "", 二次提交申请理由简述  String类型
    "approvedStatus": "", 4.审核失败：显示失败状态，可以重新提交)  String类型
    "founderId": "", 创建人id  String类型
    "founderName": "", 创建人名称  String类型
    "rejectReason": "", 拒绝原因  String类型
    "createTime": "", 创建时间  String类型
    "updateTime": "", 更新时间  String类型
    "PlatFormUser": [{   
        "platformId": "",平台id， String类型
        "userId": "", 成员编号   String类型
        "userName": "", 成员名称   Stirng类型
        "deptCode": "",科室名称编码  Stirng类型
        "deptName": "",科室名称  String类型 
        "platformPostCode": "",  0.主任、1.副主任、2.秘书和3.固定人员  String类型
        "platformPostName": "",  0.主任、1.副主任、2.秘书和3.固定人员  String类型
        "userType": "", 0.内院 1.外院  String类型  
        "createTime": "", 创建时间   String类型
        "updateTime": "", 更新时间  String类型
    }],
 * }
 */
export function PostUpDatePlatForm(params) {
    return request({
        url: '/PlatForm/updPlatForm' ,
        method: 'POST',
        data: params
    })
}

/**
 * 查询科研平台管理-详情
 * 
 * @method GetPlatFormDetails
 * 
 * @param {String} platFormId 科研平台详情Id   
 * 
 * @example 
 *   platFormId = '';  
 * 
 * @return {Object} 
 * {
     "dataObject": {
        "thesisId": "AR9KD1YMT294T2EN",  科研平台管理id  String 类型
        
    },
    "description": "",
    "status": 200
 * }
 * 
 */
export function GetPlatFormDetails(params) {
    return request({
        url: '/PlatForm/getPlatFormDetails',
        method: 'get',
        params
    })
}

/**
 * 查询科研平台得分
 * 
 * @method GetScorerecords
 * 
 * @param {String} platFormId 科研平台详情Id   
 * 
 * @example 
 *   platFormId = '';  
 * 
 * @return {Object} 
 * {
     "dataObject": {
        "thesisId": "AR9KD1YMT294T2EN",  科研平台管理id  String 类型
        
    },
    "description": "",
    "status": 200
 * }
 * 
 */
export function GetScorerecords(params) {
    return request({
        url: '/PlatForm/getscorerecords',
        method: 'get',
        params
    })
}


/**
 * 删除科研平台
 * 
 * @method DeletePlatForm
 * 
 * @param {String}  platFormId  删除科研平台Id
 * 
 * @example 
 *   {
        platFormId: ""; 删除科研平台Id  String类型
 *   } 
 * @return {Object}
 * {
     "dataObject": {},
     "description": "",
     "status": 200
 * }
 */
export function DeletePlatForm(params) {
    return request({
        url: '/PlatForm/delPlatForm',
        method: 'delete',
        params
    })
}


/**
 * 导出科研平台
 * 
 * @method PostPlatFormExport
 * 
 * @param {String}  platFormIds  删除科研平台Id
 * 
 * @example 
 *   {
        platFormIds: ""; 科研平台Id  String类型
 *   } 
 * @return {Object}
 * {
     "dataObject": {},
     "description": "",
     "status": 200
 * }
 */
export function PostPlatFormExport(params) {
    return request({
        url: '/PlatForm/excel/export/platform',
        method: 'post',
        data: params,
        responseType: 'arraybuffer'
    })
}


/**
 *  --------------------------------------- 科研平台管理 End ---------------------------------------
 */




