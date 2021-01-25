/*!
 * 科研项目管理系统字段表 Dict
 */

/**
 * 作者类别
 */
let authorCategoryDict = {
    1: '医生',
    2: '护士',
    3: '行政人员',
    4: '药剂师',
    5: '技师',
    6: '专职科研',
    7: '其他',
}

/**
 * 学校分级
 */
let schoolClassificationDict = {
    1: 'T1级',
    2: 'T2级',
    3: 'A级',
    4: 'B级',
    5: 'C级',
}

/**
 * 论文分类
 */
let thesisTypeDict = {
    1: 'SCI',
    2: 'EI',
    3: '中文期刊',
    4: '其他',
}

/**
 * 期刊认定
 */
let periodicalsFirmlyBelieveDict = {
    1: '核心库',
    2: '扩展库',
    3: '统计源',
    4: '其他',
}

/**
 * 文献类型
 */
let literatureTypeDict = {
    1: '论著',
    2: '技术方法/调查研究/短篇论著',
    3: '综述/短篇报道/个案报道/经验交流',
    4: '其他',
}

/**
 * 作者身份
 */
let authorshipDict = {
    1: '研究生导师',
    2: '科研项目负责人（文章中注明的受资助课题）',
    3: '其他',
}

/**
 * SCI 文献类型
 */
let literatureTypeSCIDict = {
    1: 'article',
    2: 'review',
    3: 'meta-analysis',
    4: 'letter',
    5: 'case report',
    6: '其他',
}

/**
 * 技术推广信息 推广形式
 */
let promotionFormDict = {
    1: '构建平台',
    2: '讲座',
    3: '培训班',
    4: '现场指导',
    5: '进修',
    6: '对口支援',
    7: '网络远程培训',
    8: '其他',
}

/**
 * 专利成果 专利类型名称
 */
let applyTypeDict = {
    1: '发明专利',
    2: '实用新型',
    3: '外观设计',
    4: '国际专利',
}

/**
 * 著作 所属角色
 */
let writingsRoleDict = {
    1: '主编',
    2: '副主编',
    3: '参编',
    4: '主译',
    5: '副主译',
    6: '参译',
    7: '其他',
}

/**
 * 标准 发布单位 所属级别
 */
let publishingUnitLevelDict = {
    1: '国家级',
    2: '省市级',
}

/**
 * 会议 会议类型
 */
let meetingTypeDict = {
    1: '国际会议',
    2: '国内会议',
}

/**
 * 会议 会议类别
 */
let meetingClassDict = {
    1: '专题报告',
    2: '壁报交流',
    3: '会议论文',
    4: '其他',
}

/**
 * 获奖 获奖类别
 */
let awardCategoriesDict = {
    1: '国家级',
    2: '省部级',
    3: '厅局级',
    4: '校级',
    5: '其他',
}

/**
 * 获奖 获奖级别
 */
let awardLevelDict = {
    1: '特等奖',
    2: '一等奖',
    3: '二等奖',
    4: '三等奖',
    5: '优秀奖',
    6: '其他',
}

/**
 * 学会/协会任职 职务级别
 */
let associationLevelDict = {
    1: '国家级',
    2: '省市级',
    3: '其他',
}

/**
 * 学会/协会等级 
 */
let associationGradeDict = {
    1: '一级',
    2: '二级',
    3: '三级',
    4: '其他',
}

/**
 * 科研平台等级
 */
let platformLevelDict = {
    0: '国家级',
    1: '省部级',
    2: '厅局级',
    3: '其他',
}

/**
 * 科研平台职务
 */
let platformPostDict = {
    0: '主任',
    1: '副主任',
    2: '秘书',
    3: '固定人员',
}


module.exports = {
    authorCategoryDict,
    schoolClassificationDict,
    thesisTypeDict,
    periodicalsFirmlyBelieveDict,
    literatureTypeDict,
    authorshipDict,
    literatureTypeSCIDict,
    promotionFormDict,
    applyTypeDict,
    writingsRoleDict,
    publishingUnitLevelDict,
    meetingTypeDict,
    meetingClassDict,
    awardCategoriesDict,
    awardLevelDict,
    associationLevelDict,
    associationGradeDict,
    platformLevelDict,
    platformPostDict,
}
