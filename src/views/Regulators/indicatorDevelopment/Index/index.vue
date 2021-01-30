<template>
    <div class="results-management-writings-index">
        <div class="results-management-writings-piece results-management-writings-form">
            <b>全部 ({{ total }})</b>
            <el-form :inline="true" :model="searchForm" class="search-form p-r" size="mini">
                <el-form-item>
                    <el-input prefix-icon="el-icon-search"   placeholder="著作名称/出版社"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input prefix-icon="el-icon-search" placeholder="发明人姓名"   class="input-with-select">
                        <el-select   slot="append" placeholder="请选择">
                            <el-option label="全部科室" value=""></el-option>
                            <el-option :label="item.deptName" :value="item.deptCode" v-for="(item,index) in departmentList"
                            :key="`literatureDeptCode${index}`"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select   placeholder="全部角色">
                          <el-option   
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="searchForm.publicationDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button @click="handleResetSearch">重置</el-button>
                    <el-button v-if="userInfo.userRole.indexOf('普通用户') != -1" @click="handleToAddPage">新建</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="results-management-writings-piece">
            <div class="results-management-writings-list">
                <!-- 选择表格数据导出 -->
                <div class="selectTableData" v-if="multipleSelection.length">
                    <ul>
                        <li>
                            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleToggleSelection(multipleSelection)"></el-checkbox>
                        </li>
                        <li>
                            <el-select size="mini" v-model="selectTableData.type" placeholder="请选择" @change="handleSelectTableDataAll">
                                <el-option label="全选本页数据" value="0"></el-option>
                                <el-option label="全选所有数据" value="1"></el-option>
                            </el-select>
                        </li>
                        <li>
                            已选择 {{  selectTableData.type == '1' ? total : multipleSelection.length }} 项目
                        </li>
                        <li>
                            <el-link :underline="false" type="primary" @click="handleExport">一键导出</el-link>
                        </li>
                        <li>
                            <el-link :underline="false" @click="handleToggleSelection()">清空</el-link>
                        </li>
                    </ul>
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :show-header="!multipleSelection.length"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" v-if="userInfo.userRole.indexOf('项目管理员') != -1"></el-table-column>
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="literatureName" label="软著名称" width="auto"></el-table-column>
                    <el-table-column label="著作人" width="160">
                        <template slot-scope="scope">
                            <div style="text-align: center;display: inline-block;" v-for=" (item,index) in scope.row.literaturePersons"
                                :key="`literaturePersons${index}`">
                                <p> {{ item.srAuthorPersonName }} </p>
                                <span style="font-size: 12px; color: #1890FF;">
                                    {{ item.srAuthorDeptName }}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所属角色" width="auto">
                        <template slot-scope="scope">
                            <div style="text-align: center;display: inline-block;" v-for=" (item,index) in scope.row.literaturePersons"
                                :key="`literaturePersons${index}`">
                                <p> {{ item.srAuthorRoleName }} </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="publisherName" label="出版社" width="160"></el-table-column>
                    <el-table-column prop="publicationDate" label="出版日期" width="auto"></el-table-column>
                    <el-table-column label="状态" width="100">
                        <template slot-scope="scope">
                            <ListStatus :rowDataStatus="`${scope.row.status}`"></ListStatus>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" @click="handleToDetailsPage(scope.row.literatureInfoId)">详情 /</el-link>
                            <el-link :underline="false" v-if="userInfo.userRole.indexOf('普通用户') != -1" @click="handleLiteratureDelect(scope.row)">删除</el-link>
                            <el-link :underline="false" v-if="userInfo.userRole.indexOf('项目管理员') != -1" @click="handleExport(scope.row,'one')">导出</el-link>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10]"
                        :current-page.sync="pageNum" :page-size="5" layout="sizes, prev, pager, next" :total="total">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ListStatus from '@/components/ListStatus/listStatus.vue' // list 状态

    import {
    } from "@/api/dict.js" // 字典表接口文档

    import {
    } from "@/assets/js/dict.js" // 字典表接口文档


    import {
        handleDownloadFileList, // post 文件下载
    } from "@/assets/js/publicFunctions.js"

    export default {
        name: 'resultsManagementWritingsIndex',
        components: {
            ListStatus, // 列表状态
        },
        data() {
            return {
                searchForm: {
                    publicationDate: [],
                },
                total: 0, // 查询总数
                pageNum: 1, // 查询分页
                pageSize: 5, // 查询分页

                 
                departmentList: [], // 科室列表
                tableData: [],

                multipleSelection: [], // 选中的数据

                checkAll: false, // 表格外checkbox表示是否全选  false 为不选 true 为全选
                isIndeterminate: true, // 以表示 checkbox 的不确定状态  true 为不选 false 为全选
                selectTableData: {
                    type: '请选择'
                }, // 查询结果的选择导出
                fileUpdataVisible: false, // 文件导出
            }
        },
        watch: {
            // 监听表格外全选的操作
            multipleSelection(newData, oldData) {
                if (newData.length < this.tableData.length && newData.length > 0) {
                    this.isIndeterminate = true;
                    this.checkAll = false;
                    this.selectTableData.type = '请选择';
                }
                if (newData.length <= 0) {
                    this.isIndeterminate = false;
                    this.checkAll = false;
                    this.selectTableData.type = '请选择';
                }
                if (newData.length == this.tableData.length) {
                    this.isIndeterminate = false;
                    this.checkAll = true;
                }
            }
        },
        created: function() {
            this.axiosGetDepartmentList(); // 初始化查询科室

            this.handleSearch(); // 初始化查询列表
        },
        methods: {

            // 表格外 select 的操作
            handleSelectTableDataAll(val) {
                if (val == '0') {
                    this.$refs.multipleTable.clearSelection();
                    this.tableData.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else if (val == '1') {
                    this.$refs.multipleTable.clearSelection();
                    this.tableData.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                }
            },

            // 表格外的选择
            handleToggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            // 表格里数据选择
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 一键导出
            handleExport(item,type) {
                let postData = {
                    infoIds: [],
                };

                if(type == 'one'){ // 表格内的单个导出
                    postData.infoIds.push(item.literatureInfoId)
                } else if (this.selectTableData.type != '1') {
                    this.multipleSelection.map((i) => {
                        postData.infoIds.push(i.literatureInfoId)
                    })
                }
            },

            // 表单重置
            handleResetSearch() {
                this.searchForm = {
                    publicationDate:[],
                };
                this.handleSearch(); // 初始化查询列表
            },

            // 著作新建
            handleToAddPage() {

            },

            // 著作详情
            handleToDetailsPage(writingsId) {

            },

            // 表单查询
            handleSearch() {
                console.log('submit!');
                let {
                    searchForm,
                    pageNum,
                    pageSize
                } = this, postData = {};

                if (!Array.isArray(searchForm.publicationDate)) {
                    searchForm.publicationDate = []
                }

                postData = searchForm;

                console.log('postData ---->>>', postData)

            },

            // 分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleSearch()
            },

            // 分页
            handleCurrentChange(val) {
                this.handleSearch(val);
            },
        }
    }
</script>


<style lang="scss" scoped>
    .results-management-writings-index {
        padding: 20px;
        background-color: #fff;

        .results-management-writings-piece {

            &.results-management-writings-form {
                height: auto;
                line-height: auto;
                overflow: hidden;
            }

            .results-management-writings-list {
                position: relative;

                // 选择查询结果导出
                .selectTableData {
                    width: 100%;
                    height: 48px;
                    line-height: 48px;
                    background-color: #F1F1F1;

                    ul {
                        overflow: hidden;

                        li {
                            float: left;
                            margin-right: 25px;

                            .el-checkbox {
                                padding-left: 14px;
                            }
                        }
                    }
                }
            }

        }

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

<style>
    .results-management-writings-piece .input-with-select .el-select .el-input {
        width: 90px;
    }

    .results-management-writings-piece .input-with-select .el-select .el-input input {
        padding: 0px 10px;
    }

    .results-management-writings-piece .el-date-editor .el-range-separator{
        width: 10%;
    }

    .results-management-writings-piece .el-date-editor--daterange.el-input__inner{
        width: 240px;
    }
</style>
