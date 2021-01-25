import request from './axios'

/**
 * 科室列表
 */
export function GetDepartmentList() {
  return request({
    url: '/department/getDepartmentList',
    method: 'get'
  })
}

/**
 * 科室列表 包含人员
 */
export function GetDepartment() {
  return request({
    url: '/personnel/getPersonnel',
    method: 'get'
  })
}


/**
 *  --------------------------------------- 文件操作 Start ---------------------------------------
 */


/**
 * 上传文件
 *
 * @method PostUploadFile
 *
 * @param {} file 文件
 *
 * @return
 * {
      "dataObject": "d3fa076daf2048b49ffcf83b170bc4c8_pdf",  // 为文件的fileId 保存或者提交的时候需要将 此id 传给后端
      "description": "",
      "status": 200
 * }
 */
export function PostUploadFile(params) {
    return request({
        url: '/cqm/file/upload',
        method: 'post',
        data: params

    })
}


/**
 * 预览文件
 *
 * @method GetFilePreview
 *
 * @param {String} fileId 文件Id fileId 为上传文件后后端返回给前端的fileId
 *
 */
export function GetFilePreview(params) {
    return window.open(`/cqm/file/preview?fileId=${params}`)
}

/**
 * 下载文件
 *
 * @method GetFileDownload
 *
 * @param {String} fileId 文件Id fileId 为上传文件后后端返回给前端的fileId
 *
 */
export function GetFileDownload(params) {
    return window.location.href  = `/cqm/file/down?fileId=${params}`
}

/**
 * 删除文件
 *
 * @method DeleteFile
 *
 * @param {String} fileId 文件Id fileId 为上传文件后后端返回给前端的fileId
 *
 */
export function DeleteFile(params) {
    return request({
        url: '/cqm/file',
        method: 'delete',
        params
    })
}


/**
 *  --------------------------------------- 文件操作 End ---------------------------------------
 */



/**
 *  --------------------------------------- 模板操作 Start ---------------------------------------
 */

/**
 * 模板下载
 *
 * @method PostExcelTemplate
 *
 * @param {Object} params
 *
 * @example
 *
 * {
    "businessType": "",  业务类型 目前只支持 3 12 13 类型 ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理") String 类型
 * }
 *
 * @return
 * {
      "dataObject": "",  //
      "description": "",
      "status": 200
 * }
 */
export function PostExcelTemplate(params) {
    return request({
        url: '/common/excel/template',
        method: 'post',
        data: params,
        responseType: 'arraybuffer'
    })
}


/**
 * excel 文件 导入 共用
 *
 * @method PostExcelImport
 *
 * @param {Object} params
 *
 * @example
 *
 * {
    "businessType": "",  业务类型 目前只支持 3 12 13 类型 ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理") String 类型
    "file": "",  文件   MultipartFile 类型
 * }
 *
 * @return
 * {
      "dataObject": "",  //
      "description": "",
      "status": 200
 * }
 */
export function PostExcelImport(params) {
    return request({
        url: '/common/excel/import',
        method: 'post',
        data: params
    })
}


/**
 *  --------------------------------------- 模板操作 End ---------------------------------------
 */



/**
 *  --------------------------------------- 管理员 审核 拒绝 或者 同意  评分  Start ---------------------------------------
 */


/**
 * 管理员 审核 拒绝 或者 同意
 *
 * @method PostAdminAudit
 *
 * @param {Object} params
 *
 * @example
 *
 * {
    "businessType": "",  业务类型 目前只支持 3 12 13 类型 ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理") String 类型
    "operatorType": "",  操作类型 3 审核通过 4 审核驳回   String 类型
    "refuseReason": "",  拒绝原因   String 类型
    "auditUserId": "",  审核人的id 不需传参   String 类型
    "auditUserName": "",  审核人的姓名 不需传参   String 类型
    "status": "",  状态 不需传参   String 类型
    "infoId": "",  id   String 类型
 * }
 *
 * @return
 * {
      "dataObject": {
        "projectId": "",  项目关联id 必传  String 类型
        "projectName": "",  项目名称  String 类型
        "contractNumber": "",  横向项目 纵向项目 合同编号 必传   String 类型
        "projectCreateTime": "",  项目创建时间 yyyy-MM-dd   String 类型
        "scoreDate": "",  打分日期 (年/月/日) 非必传参数   String 类型
        "projectTypeCode": "",  项目类别编码 1:论文; 2:科技成果转化; 3:技术推广; 4:专利成果; 5:计算机软件著作权; 6:著作; 7:标准; 8:指南; 9:共识; 10:会议相关; 11:医学科技成果奖励; 12:学会/协会任职; 13:期刊杂志任职; 14:学科建设; 15:科研平台管理; 16:横向项目; 17:纵向项目   String 类型
        "projectTypeName": "",  项目类别名称   String 类型
        "scorePersonId": "",  打分人(操作者) id 非必传   String 类型
        "scorePersonName": "",  打分人(操作者) 姓名 非必传   String 类型
        "scoreRecordInfos": {
            "scoreRecordId": "", id 非必传  String 类型
            "userId": "", 用户id  String 类型
            "userName": "", 用户名称  String 类型
            "userScore": "", 个人得分  String 类型
            "userStandardScore": "", 个人应得分  String 类型
            "deptCode": "", 科室编码  String 类型
            "deptName": "", 科室名称  String 类型
            "deptScore": "", 科室得分  String 类型
            "deptPerformanceScore": "", 科室绩效得分  String 类型
            "projectId": "", 学科建设的 子项 id 后端给返此值 原值返回  String 类型
            "fractionTypeName": "", 科研平台 学科建设 打分类型名称 1.新获批、2.年度考核、3.周期考核  String 类型
            "fractionTypeCode": "", 科研平台 学科建设 打分类型编码 1.新获批、2.年度考核、3.周期考核  String 类型
            "fractionLevelTypeName": "", 科研平台 学科建设 分数等级类型名称 1.优秀 /2.合格 /3.不合格  String 类型
            "fractionLevelTypeCode": "", 科研平台 学科建设 分数等级类型编码 1.优秀 /2.合格 /3.不合格  String 类型
            "fractionNum": "", 科研平台 学科建设 分值  String 类型
        },  打分 列表   Object 类型
      },
      "description": "",
      "status": 200
 * }
 */
export function PostAdminAudit(params) {
    return request({
        url: '/common/audit',
        method: 'post',
        data: params
    })
}


/**
 * 评分按钮 点击
 *
 * @method PostAdminScore
 *
 * @param {Object} params
 *
 * @example
 *
 * {
    "businessType": "",  业务类型 目前只支持 3 12 13 类型 ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理") String 类型
    "infoId": "",  id   String 类型
 * }
 *
 * @return
 * {
      "dataObject": {
        "projectId": "",  项目关联id 必传  String 类型
        "projectName": "",  项目名称  String 类型
        "contractNumber": "",  横向项目 纵向项目 合同编号 必传   String 类型
        "projectCreateTime": "",  项目创建时间 yyyy-MM-dd   String 类型
        "scoreDate": "",  打分日期 (年/月/日) 非必传参数   String 类型
        "projectTypeCode": "",  项目类别编码 1:论文; 2:科技成果转化; 3:技术推广; 4:专利成果; 5:计算机软件著作权; 6:著作; 7:标准; 8:指南; 9:共识; 10:会议相关; 11:医学科技成果奖励; 12:学会/协会任职; 13:期刊杂志任职; 14:学科建设; 15:科研平台管理; 16:横向项目; 17:纵向项目   String 类型
        "projectTypeName": "",  项目类别名称   String 类型
        "scorePersonId": "",  打分人(操作者) id 非必传   String 类型
        "scorePersonName": "",  打分人(操作者) 姓名 非必传   String 类型
        "scoreRecordInfos": {
            "scoreRecordId": "", id 非必传  String 类型
            "userId": "", 用户id  String 类型
            "userName": "", 用户名称  String 类型
            "userScore": "", 个人得分  String 类型
            "userStandardScore": "", 个人应得分  String 类型
            "deptCode": "", 科室编码  String 类型
            "deptName": "", 科室名称  String 类型
            "deptScore": "", 科室得分  String 类型
            "deptPerformanceScore": "", 科室绩效得分  String 类型
            "projectId": "", 学科建设的 子项 id 后端给返此值 原值返回  String 类型
            "fractionTypeName": "", 科研平台 学科建设 打分类型名称 1.新获批、2.年度考核、3.周期考核  String 类型
            "fractionTypeCode": "", 科研平台 学科建设 打分类型编码 1.新获批、2.年度考核、3.周期考核  String 类型
            "fractionLevelTypeName": "", 科研平台 学科建设 分数等级类型名称 1.优秀 /2.合格 /3.不合格  String 类型
            "fractionLevelTypeCode": "", 科研平台 学科建设 分数等级类型编码 1.优秀 /2.合格 /3.不合格  String 类型
            "fractionNum": "", 科研平台 学科建设 分值  String 类型
        },  打分 列表   Object 类型
      },
      "description": "",
      "status": 200
 * }
 */
export function PostAdminScore(params) {
    return request({
        url: '/common/score/acquire',
        method: 'post',
        data: params
    })
}



/**
 * 提交评分
 *
 * @method PostAdminScore
 *
 * @param {Object} params
 *
 * @example
 *
 * {
    "projectId": "",  项目关联id 必传  String 类型
    "projectName": "",  项目名称  String 类型
    "contractNumber": "",  横向项目 纵向项目 合同编号 必传   String 类型
    "projectCreateTime": "",  项目创建时间 yyyy-MM-dd   String 类型
    "scoreDate": "",  打分日期 (年/月/日) 非必传参数   String 类型
    "projectTypeCode": "",  项目类别编码 1:论文; 2:科技成果转化; 3:技术推广; 4:专利成果; 5:计算机软件著作权; 6:著作; 7:标准; 8:指南; 9:共识; 10:会议相关; 11:医学科技成果奖励; 12:学会/协会任职; 13:期刊杂志任职; 14:学科建设; 15:科研平台管理; 16:横向项目; 17:纵向项目   String 类型
    "projectTypeName": "",  项目类别名称   String 类型
    "scorePersonId": "",  打分人(操作者) id 非必传   String 类型
    "scorePersonName": "",  打分人(操作者) 姓名 非必传   String 类型
    "scoreRecordInfos": {
        "scoreRecordId": "", id 非必传  String 类型
        "userId": "", 用户id  String 类型
        "userName": "", 用户名称  String 类型
        "userScore": "", 个人得分  String 类型
        "userStandardScore": "", 个人应得分  String 类型
        "deptCode": "", 科室编码  String 类型
        "deptName": "", 科室名称  String 类型
        "deptScore": "", 科室得分  String 类型
        "deptPerformanceScore": "", 科室绩效得分  String 类型
        "projectId": "", 学科建设的 子项 id 后端给返此值 原值返回  String 类型
        "fractionTypeName": "", 科研平台 学科建设 打分类型名称 1.新获批、2.年度考核、3.周期考核  String 类型
        "fractionTypeCode": "", 科研平台 学科建设 打分类型编码 1.新获批、2.年度考核、3.周期考核  String 类型
        "fractionLevelTypeName": "", 科研平台 学科建设 分数等级类型名称 1.优秀 /2.合格 /3.不合格  String 类型
        "fractionLevelTypeCode": "", 科研平台 学科建设 分数等级类型编码 1.优秀 /2.合格 /3.不合格  String 类型
        "fractionNum": "", 科研平台 学科建设 分值  String 类型
    },  打分 列表   Object 类型
 * }
 *
 * @return
 * {
      "dataObject": {},
      "description": "",
      "status": 200
 * }
 */
export function PostAdminScoreSubmit(params) {
    return request({
        url: '/score/submit',
        method: 'post',
        data: params
    })
}


/**
 * 保存驳回模板
 *
 * @method PostInsRejectTemplate
 *
 * @param {Object} params
 *
 * @example
 *
 * {
    "id": "",  项目关联id 必传  String 类型
    "userId": "",  用户id  String 类型
    "userName": "",  用户姓名   String 类型
    "content": "",  内容   String 类型
    "type": "",  类型  String 类型
 * }
 *
 * @return
 * {
      "dataObject": {},
      "description": "",
      "status": 200
 * }
 */
export function PostInsRejectTemplate(params) {
    return request({
        url: '/rejectTemplate/insRejectTemplate',
        method: 'post',
        data: params
    })
}


/**
 * 查询驳回模板列表
 *
 * @method GetSearchRejectTemplate
 *
 * @param {String} userId
 * @param {String} type
 *
 * @example
 *
 * {
    "userId": "",  用户id  String 类型
    "type": "",  类型  String 类型
 * }
 *
 * @return
 * {
      "dataObject": {},
      "description": "",
      "status": 200
 * }
 */
export function GetSearchRejectTemplate(params) {
    return request({
        url: '/rejectTemplate/searchRejectTemplate',
        method: 'GET',
        params
    })
}


/**
 * 删除模板
 *
 * @method GetDeleteRejectTemplate
 *
 * @param {String} id
 *
 * @example
 *
 * {
    "id": "",  项目关联id 必传  String 类型
 * }
 *
 * @return
 * {
      "dataObject": {},
      "description": "",
      "status": 200
 * }
 */
export function GetDeleteRejectTemplate(params) {
    return request({
        url: '/rejectTemplate/deleteRejectTemplate',
        method: 'get',
        params
    })
}


/**
 *  --------------------------------------- 管理员 审核 拒绝 或者 同意  评分 End ---------------------------------------
 */




/**
 *  --------------------------------------- 区划选择 Start ---------------------------------------
 */

/**
 * 区划选择
 *
 * @method GetXzqhSelector
 *
 * @return
 * {
      "dataObject": [],
      "description": "",
      "status": 200
 * }
 */
export function GetXzqhSelector(params) {
    return request({
        url: '/xzqh/action/getXzqhSelector',
        method: 'get',
        params
    })
}


/**
 *  --------------------------------------- 区划选择 End ---------------------------------------
 */
