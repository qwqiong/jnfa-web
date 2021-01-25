# 肺癌高危人群筛查管理系统-前端

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

> 注意事项

## 注意写清注释
## 关于页面样式 
```
    在每个页面的最顶级的 div class写该页面的名字，关于该页面里的样式都写在该class下面
    
    例如：
    <template>
        <div class="main">
            <span></span>
        </div>
    </template> 
    
    
    <style lang="scss" scoped>
        .main {
            span {}
        }
    </style>
```