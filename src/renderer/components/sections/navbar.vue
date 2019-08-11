<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-07 16:15:29
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-10 16:03:00
 -->
<template>
  <div class="navbar">
    

    <div class="bar-container">
      <font-awesome-icon @click="minimize" icon="window-minimize" />
      <font-awesome-icon @click="showConfig" icon="cog" />
      <font-awesome-icon @click="quit" :icon="['fas', 'times']" />
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
//import DemoLoginModal from "./modals/setting.vue";

export default {
  name: "navbar",
  components: {
    //DemoLoginModal
  },
  methods: {
    showConfig: function() {
      // In renderer process (web page).
      //const { ipcRenderer } = require('electron')
      //ipcRenderer.sendSync('open-setting-page', 'ping')
      this.$electron.ipcRenderer.send('open-setting-page');
    },

    minimize: function() {
      const remote = require("electron").remote;
      let w = remote.getCurrentWindow();
      w.minimize();
    },

    quit: function() {
      const app = require("electron").remote.app;
      app.quit();
    }
  }
};
</script>

<style scoped>
.bar-container {
  float: right;
  margin-top: 0;
  display: block;
}
.navbar {
  color: black;
  -webkit-app-region: drag;
}

/* fix child float problem*/
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}

.clearfix {
  display: inline-block;
}

html[xmlns] .clearfix {
  display: block;
}

* html .clearfix {
  height: 1%;
}
</style>
