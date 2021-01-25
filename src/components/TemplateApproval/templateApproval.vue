/*!
* 项目审批
*/

<template>
    <div class="template-approval">
        <!-- 审核驳回 -->
        <el-dialog title="审核驳回" :visible.sync="dialogRejectFormVisible" class="dialog-reject-form" @close="handleCheckValue">
            <h3>
                <i class="refute"></i>
                <span>您确定要驳回此申请？</span>
            </h3>
            <div class="dialogRejectForm">
                <el-form :model="dialogRejectForm">
                    <el-form-item label="驳回原因：" style="margin: 0;">
                        <el-input v-model="dialogRejectForm.refuseReason" type="textarea" placeholder="请填写驳回原因"
                            :autosize="{minRows:6,maxRows:9}"></el-input>
                        <el-link type="primary" class="saveTemplate" @click="handleSaveTemplate">存为模板</el-link>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 存为模板 -->
            <div class="reject-template-list">
                <el-tag :key="index" v-for="(tag,index) in rejectTemplateList" closable :disable-transitions="false" @close="handleRejectTemplateList(tag)" @click="handleSelectTagVal(tag)">
                    {{tag.content}}
                </el-tag>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCheckValue">取 消</el-button>
                <el-button type="primary" @click="handleDialogRejectOk">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 审核通过 -->
        <el-dialog title="审核通过" :visible.sync="dialogAdoptFormVisible" class="dialog-adopt-form" @close="handleCheckValue">
            <h3>
                <i class="success_s"></i>
                <span>项目审核已通过！</span>
            </h3>
            <div class="product-scoring">
                <p>项目评分（选填项）:</p>
                <el-form :model="dialogAdoptForm">
                    <el-row class="dialog-adopt-thead-style">
                        <el-col :span="6">
                            姓名
                        </el-col>
                        <el-col :span="6">
                            科室
                        </el-col>
                        <el-col :span="6" style="text-align: center;">
                            项目得分
                        </el-col>
                        <el-col :span="6" style="text-align: center;">
                            科室得分
                        </el-col>
                    </el-row>
                    <el-form-item class="dialog-adopt-tbody-style" v-for="(item, index) in dialogAdoptForm.scoreRecordInfos"
                        :key="index" :prop="'scoreRecordInfos.' + index + '.value'">
                        <el-row :gutter="10" clas>
                            <el-col :span="6">
                                {{ item.userName }}
                            </el-col>
                            <el-col :span="6">
                                {{ item.deptName }}
                            </el-col>
                            <el-col :span="6">
                                <el-input-number v-model="item.userScore" controls-position="right" size="mini" style="width: 100%;"></el-input-number>
                            </el-col>
                            <el-col :span="6">
                                <el-input-number v-model="item.deptScore" controls-position="right" size="mini" style="width: 100%;"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-form-item>

                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCheckValue">取 消</el-button>
                <el-button type="primary" @click="handleConfirmDialogAdoptForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        PostAdminAudit, // 审核
        PostAdminScoreSubmit, // 提交评分
        PostAdminScore, // 审核通过后查询评分列表
        GetDeleteRejectTemplate, // 删除模板
        GetSearchRejectTemplate, // 查询驳回模板列表
        PostInsRejectTemplate, // 保存驳回模板
    } from "@/api/dict.js" // 字典表接口文档

    export default {
        name: 'templateApproval',
        props: { // 接受父组件的值  ❗ 所有父组件的值必须进行数据初始化 ❗ 
            dialogTitle: String, // title
            type: String, // 业务类型 目前只支持 3 12 13 类型 ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理") 
            ParentDialogRejectFormVisible: Boolean, // 父组件 控制显隐  驳回
            ParentDialogAdoptFormVisible: Boolean, // 父组件 控制显隐  通过
            detailId: String, // 科研成果详情ID
            detailStart: Number, // 科研成果详情 start
        },
        data: function() {
            return {
                dialogRejectFormVisible: false, // 审核驳回原因的显隐
                dialogAdoptFormVisible: false, // 审核通过 visible
                dialogAdoptForm: { // 审核通过 form 
                    scoreRecordInfos: [],
                },
                switchVisible: false, // 审核驳回原因的显隐
                rejectTemplateList: [], // 驳回模板
                dialogRejectForm: {
                    refuseReason: '', // 驳回原因
                }, // 审核驳回表单

            }
        },
        watch: {
            ParentDialogRejectFormVisible(n, o) { // 审核驳回原因的显隐
                console.log('n ------>>>', n)
                this.dialogRejectFormVisible = n;
            },
            ParentDialogAdoptFormVisible(n, o) { // 审核通过 visible
                console.log('n ------>>>', n)
                console.log('this ------>>>', this)
                if (n) {
                    if (this.detailStart == 2) { // 提交評分
                        let postData = {};
                        postData.infoId = this.detailId;
                        postData.businessType = this.type; // ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理")

                        PostAdminScore(postData)
                            .then((res) => {
                                console.log('res ----->>>', res)
                                if (res.status == 200) {
                                    this.dialogAdoptForm = res.dataObject;
                                    this.dialogAdoptFormVisible = n;
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });

                    } else if (this.detailStart == 1) {
                        let postData = {};
                        postData.operatorType = 3; //  审核通过
                        postData.infoId = this.detailId;
                        postData.businessType = this.type; // ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理")

                        console.log('post ----->>>', postData)

                        PostAdminAudit(postData)
                            .then((res) => {
                                console.log('res ----->>>', res)
                                if (res.status == 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '操作成功!'
                                    });
                                    this.dialogAdoptForm = res.dataObject;
                                    this.dialogAdoptFormVisible = n;
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }


                }
            },
        },

        created: function() {
            let postData = {
                userId: '',
                type: '',
            }
            this.axiosGetSearchRejectTemplate(postData);
        },
        methods: {
            // 驳回模板查询
            axiosGetSearchRejectTemplate(postData) {
                GetSearchRejectTemplate(postData).then(res => {
                        if (res.status == 200) {
                            this.rejectTemplateList = res.dataObject
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            // 保存驳回模板
            axiosPostInsRejectTemplate(postData) {
                PostInsRejectTemplate(postData).then(res => {
                        if (res.status == 200) {
                            // this.rejectTemplateList.push(this.dialogRejectForm.refuseReason)
                            let postData = {
                                userId: '',
                                type: '',
                            }
                            this.axiosGetSearchRejectTemplate(postData);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            // 删除模板查询
            axiosGetDeleteRejectTemplate(postData) {
                GetDeleteRejectTemplate(postData).then(res => {
                        if (res.status == 200) {
                            
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            // 将子组件的值返回给父组件
            handleCheckValue() {
                this.dialogAdoptFormVisible = false;
                this.dialogRejectFormVisible = false;

                let childDate = {};
                childDate = {
                    dialogAdoptFormVisible: false,
                    dialogRejectFormVisible: false,
                }
                console.log('childDate --------->>>>', childDate)
                this.$emit('handleCheckValue', childDate);
            },
            
            //审核驳回模板保存
            handleSaveTemplate() { 
                let postData = {
                    id: '',
                    userId: '',
                    userName: '',
                    content: this.dialogRejectForm.refuseReason,
                    type: '',
                }
                this.axiosPostInsRejectTemplate(postData)
            },

            // 审核驳回模板清除
            handleRejectTemplateList(tag) {
                console.log('tag ----->>>',tag)
                this.rejectTemplateList.splice(this.rejectTemplateList.indexOf(tag), 1);
                
                let postData = {
                    id: tag.id
                }
                this.axiosGetDeleteRejectTemplate(postData)
            },

            // 审核通过确认
            handleConfirmDialogAdoptForm() {
                let postData = this.dialogAdoptForm;

                PostAdminScoreSubmit(postData)
                    .then((res) => {
                        console.log('res ----->>>', res)
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });

                            this.handleCheckValue()
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },

            // 审核驳回确认
            handleDialogRejectOk() {
                let postData = {};
                postData = this.dialogRejectForm;
                postData.infoId = this.detailId;
                postData.operatorType = 4; //  审核驳回 
                postData.businessType = this.type; // ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理")

                PostAdminAudit(postData)
                    .then((res) => {
                        console.log('res ----->>>', res)
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });

                            this.handleCheckValue()
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            
            // 选择审核意见模板
            handleSelectTagVal(val){
                this.dialogRejectForm.refuseReason = val.content;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .template-approval {

        // 审核样式
        .dialog-reject-form,
        .dialog-adopt-form {
            h3 {
                position: relative;
                line-height: 1;
                margin-bottom: 18px;
                margin-top: 24px;

                i {
                    width: 18px;
                    height: 18px;
                    margin-right: 12px;

                    &.success_s {
                        background: url(../../assets/img/success_s.png) no-repeat 0px 0px;
                        background-size: 100% 100%;
                    }

                    &.refute {
                        background: url(../../assets/img/refute.png) no-repeat 0px 0px;
                        background-size: 100% 100%;
                    }
                }

                span {
                    position: absolute;
                    font-size: 18px;
                    font-weight: normal;
                }
            }

            .dialog-adopt-thead-style {
                width: 100%;
                height: 36px;
                line-height: 36px;
                background: #E4E4E4;
                margin-top: 23px;

                div.el-col {
                    padding: 0 30px;
                    font-size: 14px;
                }
            }

            .dialog-adopt-tbody-style {
                div.el-row {
                    width: 100%;
                    height: 49px;
                    line-height: 49px;
                    background: #F5F6FA;
                    margin: 0px !important;
                    color: #333333;

                    div.el-col {
                        padding: 0 30px !important;
                        font-size: 14px;
                        font-weight: 400;
                        color: #333333;
                    }
                }
            }

            // 驳回原因表单
            .dialogRejectForm {
                position: relative;

                .saveTemplate {
                    position: absolute;
                    bottom: 0;
                    right: 16px;
                }
            }

            // 模板样式
            .reject-template-list {
                margin-bottom: 22px;

                .el-tag {
                    height: 34px;
                    line-height: 34px;
                    background: #F0F5F9;
                    border-radius: 17px;
                    margin-left: 10px;
                    margin-top: 10px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #9FAFBC;
                    border: none;
                    cursor: pointer;
                    
                    &:hover{
                        border:1px solid #409eff;
                    }
                }
            }

        }
    }
</style>

<style>
    .template-approval .dialog-adopt-form .el-form-item:not(:last-child) {
        margin: 0;
    }

    .template-approval .el-dialog__body {
        padding: 0px 20px 10px;
    }
</style>
