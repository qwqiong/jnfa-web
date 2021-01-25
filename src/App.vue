<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import '@/assets/main.css'; // 引入公共样式
    
    export default {
        name: 'App'
    }
</script>

<style>
    #app {
        font-family: MicrosoftYaHei;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        background-color: #E4F0FE;
    }
</style>
