<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-11 00:23:19
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-11 10:08:07
 -->
<template>
  <div class="progress-pannel">
    <svg class="container">
      <g id>
        <defs>
    <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> <!-- stdDeviation is how much to blur -->
      <feOffset dx="5" dy="5" result="offsetblur"/> 
      <feOffset dx="-5" dy="-5" result="offsetblur"/>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
        <circle class="progress" id="two" cx="42" cy="43" r="40px" :style="circlefull" />
        <text id="percent-two" text-anchor="middle" x="43" y="50">0</text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "circleProgress",
  data() {
    return {
      circlefull:0
    }
  },
  props:[
    'CHANGE_PERCENT'
  ],
  mounted() {
      //this.init();
      this.circlefull = 'stroke-dasharray:'+this.CHANGE_PERCENT * 100 + '%;'
  },
  methods: {
    init: function() {
      var circle1 = document.getElementById("two");
      var text1 = document.getElementById("percent-two");
      var angle1 = 0;
      let totallength = 2 * Math.PI * 40;
      circle1.setAttribute("stroke-dasharray",totallength);
      var emptyAngle = totallength;
      var per = totallength / 100;
      var limit =  totallength * (1-this.CHANGE_PERCENT);

      window.timer1 = window.setInterval(
        function() {
          circle1.setAttribute("stroke-dashoffset", emptyAngle);
          text1.innerHTML = parseInt(angle1);

          if (emptyAngle <= limit) {
            window.clearInterval(window.timer1);
          }
          angle1 += 1;
          emptyAngle -=per;
        }.bind(this),
        30
      );
    },

    getCircleLength:function(el){
                var r = el.attr('r');
                var circleLength = 2 * Math.PI * r; 
                return circleLength;
            },
  }
  
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato);
.progress-pannel{
  display: inline;
  float: left;
}
.container{
  width:85px;
  height:85px;
  display: inline-block;
}
.progress {
  fill: none;
  stroke: #0a0a0a;
  stroke-width: 1.5;
  stroke-linecap: round;
  transform-origin: center;
  transform: rotate(-90deg);
  filter:url(#dropshadow);
}
text {
  font-family: "Lato", sans-serif;
  fill: #080808;
  font-size: 30px;
}
</style>