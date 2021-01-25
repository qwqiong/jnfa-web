<template>
    <div class="listStatus"> 
        <div v-if="rowDataStatus == 0">
            <u class="dot not-submitted"></u>
            <span>未提交</span>
        </div>
        <div v-if="rowDataStatus == 1">
            <u class="dot await"></u>
            <span>待审核</span>
        </div>
        <div v-else-if="rowDataStatus == 2">
            <u class="dot adopt"></u>
            <span>审核通过</span>
        </div>
        <div v-else-if="rowDataStatus == 3">
            <u class="dot reject"></u>
            <span>审核驳回</span>
        </div>
        <div v-else-if="rowDataStatus == 4">
            <u class="dot adopt"></u>
            <span>审核通过</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListStatus',
        props:{
            rowDataStatus: String,
        },
        data() {
            return {
            }
        },
        created: function() {
             
        }
    }
</script>

<style scoped lang="scss">
    .listStatus {
        // 状态
        u.dot {
            
            
            &.not-submitted {
                // 未提交
                background-color: #cfcfcf;
                    
                &+span {
                    color: #cfcfcf;
                }
            }
            
            &.await {
                // 待审核
                background-color: #FAD400;
        
                &+span {
                    color: #FAD400;
                }
            }
        
            &.reject {
                // 审核驳回
                background-color: #FD4701;
        
                &+span {
                    color: #FD4701;
                }
            }
        
            &.adopt {
                // 审核通过
                background-color: #01BABD;
        
                &+span {
                    color: #01BABD;
                }
            }
        }
    }
</style>
