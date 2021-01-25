/*!
* 区划选择
*/

<template>
    <div class="selectXzqh">
      <el-dialog
        title="区划选择"
        :visible.sync="selectXzqhVisible"
        custom-class="xzqh-dialog"
        :before-close="handleClose">
            <div class="selectXzqh-piece">
                <div class="selectXzqh-piece-body">
                    <el-tree :data="xzqhList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
            </div>
             <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleCheckValue">确 定</el-button>
              </span>
      </el-dialog>


    </div>
</template>

<script>
    import {
        GetXzqhSelector, // 获取区划选择
    } from "@/api/dict.js" // 字典表接口文档

    export default {
        name: 'selectXzqh',
        props: { // 接受父组件的值  ❗ 所有父组件的值必须进行数据初始化 ❗
            parentSelectXzqhVisible: Boolean, // 父组件 控制显隐  驳回
        },
        data: function() {
            return {
                xzqhList: [],
                selectXzqhVisible: false,
                selectXzqhItem: '',
                defaultProps: { // tree 字段配置表
                    children: 'children',
                    label: 'fullName'
                }
            }
        },
        watch: {
            parentSelectXzqhVisible(n, o) { // 审核驳回原因的显隐
                console.log('n ------>>>', n)
                this.selectXzqhVisible = n;
            },
        },
        created: function() {
            this.axiosGetXzqhSelector(); // 初始化查询科室
        },
        methods: {
            axiosGetXzqhSelector(){
                GetXzqhSelector().then((res) => {
                    if (res.status === 200) {
                        this.xzqhList = res.dataObject;
                    }
                }).catch((error) => {
                    console.error(error);
                });
            },

            // 点击灰色区域 区划选择关闭
            handleClose(done) { 
                this.$confirm('确认关闭？')
                  .then(_ => {
                      this.dialogVisible = false;
                      let childDate = {};
                      childDate = {
                          dialogVisible: this.dialogVisible,
                      }
                      console.log('childDate --------->>>>', childDate)
                      this.$emit('handleCheckValue', childDate);
                  })
                  .catch(_ => {});
            },

            // tree 选择
            handleNodeClick(data) {
              console.log(data);
              this.selectXzqhItem = data.fullName;
            },


            // 将子组件的值返回给父组件
            handleCheckValue() {
                this.dialogVisible = false;

                let childDate = {};
                childDate = {
                    dialogVisible: this.dialogVisible,
                    selectXzqhItem: this.selectXzqhItem
                }
                console.log('childDate --------->>>>', childDate)
                this.$emit('handleCheckValue', childDate);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .selectXzqh {
        .selectXzqh-piece-footer{
            text-align: center;
        }
    }
</style>

<style>
    .xzqh-dialog .el-dialog__body{
        max-height: 54vh ;
        padding: 20px;
        overflow: auto;
    }
</style>
