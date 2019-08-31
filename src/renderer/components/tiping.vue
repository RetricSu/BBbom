<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-22 18:25:29
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-22 22:29:22
 -->
<template>
  <div class="tiping">
    <h3>感恩的心，感谢有你</h3>
    <hr />


    <img src="../assets/wechat_code.jpeg" alt />
    <img src="../assets/alipay_code.jpeg" alt />
    <!--
        <img src="../assets/btc_code.png" alt="">
        <img src="../assets/eth_code.png" alt="">
    -->
    <h3>BTC 地址：</h3>
    <p>3M6pmN9anjrKyfxiumaSGmxmeoE3Bnizk1</p>
    <h3>ETH 地址：</h3>
    <p>0xa70eaB813CC65953C6107316afA32f8dED961ed9</p>
  </div>
</template>

<script>
export default {
  name: "tiping",
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
.tiping {
  text-align: center;
  color: black;
}
.nav {
  float: right;
}
button {
  width: 150px;
  height: 40px;
  font-size: 30px;
  background-color: whitesmoke;
  color: black;
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