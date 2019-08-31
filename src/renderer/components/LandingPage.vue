<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-07 15:42:24
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-26 14:39:01
 -->
<template>
  <div id="wrapper">
    <navbar></navbar>
    <price></price>
  </div>
</template>

<script>
  import navbar from './sections/navbar'
  import price from './sections/price'

  export default {
    name: 'landing-page',
    components:{
      navbar:navbar,
      price:price
    }
  }
</script>

<style>
  #wrapper{
    -webkit-app-region: drag;
  }
</style>
