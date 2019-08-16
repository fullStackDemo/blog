<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <img src="http://192.168.0.103:8080/api/v1/user/getCaptchaImage">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.$http.get('./api/v1/user/getCaptcha').then(res=>{
        console.log(res);

      })
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
