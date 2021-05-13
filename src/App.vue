<template>
  <div id="app">
    <Header2Component></Header2Component>
    <NavBarComponent></NavBarComponent>
    <HomeComponent></HomeComponent>
  </div>
</template>

<script>
import Header2Component from './components/Share/Header2Component.vue'
import NavBarComponent from './components/Share/NavBarComponent.vue'
import HomeComponent from './components/Share/HomeComponent.vue'


import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


export default {
  name: 'App',
  components: {
    Header2Component,
    NavBarComponent,
    HomeComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
