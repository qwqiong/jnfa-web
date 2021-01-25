/*!
 * 科研项目管理系统 
 */

import {
    Message,
    MessageBox
} from 'element-ui'

/**
 *  --------------------------------------- 文件操作 Start ---------------------------------------
 */

import {
    GetFilePreview, // 文件预览
    GetFileDownload, // 文件下载
    DeleteFile, // 删除文件
} from "@/api/dict.js"; // 科技成果管理API


// 文件校验
export function handleBeforeAvatarUpload(file) {
    console.log('file ------>>>', file)
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isPDF = file.type === 'application/pdf';

    if (isPDF || isPNG || isJPG) {
        return isJPG || isPNG || isPDF;
    } else {
        Message.error('上传头像图片只能是 JPG或者PNG和PDF 格式!');
    }

    return isJPG || isPNG || isPDF;
};

// 文件预览控制
export function handleDownloadFile(fileId, type) {
    if (type == "down") {
        GetFileDownload(fileId)
    } else {
        GetFilePreview(fileId)
    }
};


            
// 文件上传控制
export function handleUploadFile(file, fileList) { 
    let arr = [];
    if (Array.isArray(fileList)) {
        fileList.map(item => {
            console.log('item  ----->>>', item)
            console.log('fileList ------->>>', fileList)
            console.log('arr ------->>>', arr)
            if (item.status === "success" && item.response) {
                item.id = item.response.dataObject;
                
                arr.push(item.id)
                
                console.log(',arr --------  2  --->>>',arr)  
            }
        })
    }
    return arr
};

// 文件删除控制
export function handleFileRemove(file, fileList, target) {
    let fileIdArr = [];
    console.log('file ------->>>', file)
    console.log('fileList ------->>>', fileList)

    let postData = {
        fileId: file.id
    }
    
    MessageBox.confirm(`确定移除 ${ file.name }？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log('postData -------->>>', postData)
        axiosDeleteFile(postData, target)
    }).catch(() => {
        Message({
            type: 'info',
            message: '已取消删除'
        });
    });
};


/**
 * 详情文件回显   文件ID与name 合并
 * @param {Array} arrId 文件 ID
 * @param {Array} arrName 文件 name
 * 
 * @return {Array} [{name:'',id:''}]
 */
export function handleFileMerge(arrId, arrName) {
    let fileListArr = [];
    arrId.map((item, index) => {
        fileListArr.push({
            name: arrName[index],
            id: item,
        })
    });
    return fileListArr
};


/**
 * post 文件下载 
 * @param {String} file 文件流
 * @param {String} filename 文件 name
 * 
 * @return {Array} [{name:'',id:''}]
 */
export function handleDownloadFileList (file, filename = '') {
    let blob = new Blob(
        [file], 
        {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
 
    let downloadElement = document.createElement('a');
    let href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = filename; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}
/**
 *  --------------------------------------- 文件操作 End ---------------------------------------
 */
/**
 * 时间--格式化
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
    if((/^[0-9]{4}$/.test(time))){
        return time
    }
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
            time = parseInt(time)
            } else {
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return timeStr
}