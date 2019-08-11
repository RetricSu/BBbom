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
