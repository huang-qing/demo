<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <!--使用 base:'/app-react/' 配置子应用 -->
  <!--使用proxy反向代理 app-react 为 http://localhost:8007/app-react -->
  <WujieVue
    width="100%"
    height="100%"
    name="react-in-appReact-basePath"
    url="app-react/"
    :sync="false"
    alive="true"
  ></WujieVue>



</template>
