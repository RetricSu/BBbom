<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-12 23:02:05
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-13 16:36:39
 -->
<template>
  <div id="circle-container">
    <div class="progress" id="progress"></div>
  </div>
</template>

<script>
var ProgressBar = require("progressbar.js");

export default {
  name: "circleChange",
  props: ["change"],
  data() {
    return {
      circle: null
    };
  },
  mounted() {
    var circle = new ProgressBar.Circle("#progress", {
      color: 'silver',
      trailColor: "whitle",
      duration: 500,
      //easing: 'easeInOut'
      strokeWidth: 3,
      trailWidth: 0,
      text:{
          value: 'Text',
      },
      svgStyle: {
        "stroke-width": "10",
        "stroke-linecap": "round",
        "-webkit-filter": "drop-shadow( -3px -2px 5px #08f )",
        filter: "drop-shadow( -3px -2px 5px #08f )"
      }
    });
    this.circle = circle;
    //circle.animate(this.change);
  },
  methods: {
    setChange: function(isUp,p) {
      var that = this;
      p = p * 4;
      if(isUp){
          that.circle.path.setAttribute('stroke', 'green');
          that.circle.text.style.color='green';
          p = p;
      }else{
          that.circle.path.setAttribute('stroke', 'red');
          that.circle.text.style.color='red';
          p = -p;
      }
      
      this.circle.animate(p, function() {
        that.circle.animate(0);
      });
      this.circle.setText(p.toFixed(2) + "%");
    }
  }
};
</script>

<style scoped>
#circle-container {
  width: 80px;
  height: 80px;
  float: left;
  margin: 5px;
  border-radius: 50%;
  background: url("../../assets/BTC_Logo.svg");
  background-size:cover;
  background-repeat:   no-repeat;
  background-position: center center; 
}
</style>
