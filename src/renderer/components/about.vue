<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-22 18:25:29
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-22 23:43:16
 -->
<template>
  <div class="about">
    
    <h1>made by Retric</h1>

  </div>
</template>

<script>
export default {
  name: "about",
  methods: {
    quit: function() {
      const remote = require("electron").remote;
      let w = remote.getCurrentWindow();
      w.close();
    }
  }
};
</script>

<style scoped src="../assets/css/photon.css"/>
<style scoped>
.about {
  text-align: center;
  color: black;
}
.nav {
  float: right;
}
button{
    width:150px;
    height: 40px;
    font-size: 30px;
    background-color:whitesmoke;
    color:black;
    border: 1px solid black;
}
h1 {
  text-align: center;
}
img {
  width: 200px;
  height: 300px;
}
</style>