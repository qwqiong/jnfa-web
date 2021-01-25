/*!
* 模板上传
*/

<template>
    <div class="templateUpload">
        <!-- 文件上传 -->
        <el-dialog :title="dialogTitle" :visible.sync="fileUpdataVisible" class="file-updata-dialog" width="30%" @close="handleCheckValue">
            <h3>
                <span class="p-l">模板上传</span>
                <el-link class="p-r" :underline="false" type="primary" @click="handleDownloadTemplateExce">请点击下载模板</el-link>
            </h3>
            <div class="product-scoring">
                <el-upload class="upload-demo" drag action="/common/excel/import" multiple :data="{businessType: type}"
                    :on-change="handleTemplateFileUpload" :before-upload="handleBeforeAvatarUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或<em>点击上传</em>
                        <p style="color: #999999;font-size: 14px;">
                            支持扩展名：xlsx
                        </p>
                    </div>
                </el-upload>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCheckValue">取 消</el-button>
                <el-button type="primary" @click="handleCheckValue">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        PostExcelTemplate, // 模板下载
        PostExcelImport, // excel 文件 导入 共用
    } from "@/api/dict.js" // 字典表接口文档

    import {
        handleFileMerge, // 详情文件回显
        handleUploadFile, // 文件上传
        handleDownloadFile, // 文件预览，下载
        handleDownloadFileList, // post 文件下载
    } from "@/assets/js/publicFunctions.js" // 公共方法

    export default {
        name: 'templateUpload',
        props: { // 接受父组件的值  ❗ 所有父组件的值必须进行数据初始化 ❗ 
            dialogTitle: String, // title
            type: String, // 业务类型 目前只支持 3 12 13 类型 ("1", "论文"), ("2", "科技成果转化"), ("3", "技术推广"), ("4", "专利成果"), ("5", "计算机软件著作权"), ("6", "著作"), ("7", "标准"), ("8", "指南"), ("9", "共识"), ("10", "会议相关"), ("11", "医学科技成果奖励"), ("12", "学会/协会任职"), ("13", "期刊杂志任职"), ("14", "学科建设"), ("15", "科研平台管理") 
            ParentFileUpdataVisible: Boolean, // 父组件控制显隐
        },
        data: function() {
            return {
                fileUpdataVisible: this.$props.ParentFileUpdataVisible, // 文件导出
            }
        },
        watch: {
            ParentFileUpdataVisible(n, o) {
                console.log('n ------>>>', n)
                this.fileUpdataVisible = n;
            }
        },
        created: function() {
            console.log('this ', this.$props)
        },
        methods: {
            // 将子组件的值返回给父组件
            handleCheckValue() {
                this.fileUpdataVisible = false;

                let childDate = {};
                childDate = {
                    fileUpdataVisible: this.fileUpdataVisible,
                }
                console.log('childDate --------->>>>', childDate)
                this.$emit('handleCheckValue', childDate);
            },

            // 模板下载
            handleDownloadTemplateExce() {
                let postData = {
                    businessType: this.type
                };

                PostExcelTemplate(postData).then(res => {
                    handleDownloadFileList(res, `${this.dialogTitle}模板下载`);
                })
                .catch(err => {
                    console.log('err --------->>>', err)
                })
            },

            // 模板上传
            handleTemplateFileUpload(file, fileList) {
                let fileIdArrList = [],
                    fileIdArr = [];
                fileIdArrList = handleUploadFile(file, fileList);
                if (file.response && file.response.status == 200) {
                    this.$message({
                        type: 'success',
                        message: '上传成功!'
                    });
                }
            },

            // 文件校验
            handleBeforeAvatarUpload(file) {
                const isExel = file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                if (isExel) {
                    return isExel
                } else {
                    this.$message.error('上传文件只能是 xlsx 格式!');
                }

                return isExel
            },
        }
    }
</script>

<style lang="scss" scoped>
    .templateUpload {
        .file-updata-dialog {

            h3 {
                overflow: hidden;
            }

            .product-scoring {
                margin: 10px auto;
                text-align: center;
            }
        }
    }
</style>
