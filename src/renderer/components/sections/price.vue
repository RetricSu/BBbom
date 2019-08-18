<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-07 16:46:13
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-18 11:52:11
 -->
<template>
  <div>
    <div id="circle">
      <img src="../../assets/BTC_Logo.svg" alt="">
    </div>
    
    <!--
    <circleChange ref="circleChange" :change="change"></circleChange>
    
    -->
    <!--
    <circleProgress :CHANGE_PERCENT="change"></circleProgress>
    -->
    <div class="big-number glow">{{ price }}</div>
    <div class="rmb-number">≈ {{ rmb_price }}</div>
    <audio v-shortkey="['space']" @shortkey="stopSound()" id="down-audio" :src="down_sound"></audio>
    <audio v-shortkey="['space']" @shortkey="stopSound()" id="up-audio" :src="up_sound"></audio>
  </div>
</template>

<script>
import dataApi from "../../services/dataApi";
import request from 'request';
import axios from 'axios';
import bus from '../../services/bus';
import Vue from 'vue';
import CONFIG from '../../services/config.json'
import circleProgress from '../sections/circleProgress'
import circleChange from '../sections/circleChange'
var setting;

//load user setting from local storage
if(localStorage.setting)
setting = JSON.parse(localStorage.setting);

export default {
  name: "price",
  data() {
    return {
      price: '...',
      rmb_price: '...',
      change:0.3,
      down_sound:__static+'/sound/'+ ( setting?setting.sound_down:null || CONFIG.SOUNDTRACK_DOWN),
      up_sound:__static+'/sound/'+( setting?setting.sound_up:null || CONFIG.SOUNDTRACK_UP)
    };
  },
  components:{
    circleProgress,
    circleChange
  },
  mounted() {
    var that = this;

    dataApi.updatePrice();
    
    //record price change percentage and alert
    //dataApi.getChange();
    dataApi.watchPriceUp();
    dataApi.watchPriceDown();

    //listen for update price
    bus.$on('newPrice', function(data){
      //change background color and opacity according to change percent.
      let change = data[0] - that.price;
      //let changevol = Math.abs(data[0] - that.price)/that.price;
      let changevol = Math.abs(data[0] - that.price)/that.price;
      let changevol2 = (data[0] - that.price)/that.price
      
      changevol = changevol<0.0001?changevol*1000:changevol;
      changevol = changevol<0.001?changevol*100:changevol;
      changevol = changevol<0.01?changevol*10:changevol;
      
      if(change >= 0){
        document.body.style.background = 'rgba(77, 255, 133, '+changevol+')';
      }else{
        document.body.style.background = 'rgba(255, 77, 77, '+changevol+')';
      }
      //console.log(changevol);

      //that.$refs.circleChange.setChange(change >=0,changevol);

      that.change = changevol;
      that.price = data[0];
      that.rmb_price = data[1];

      that.$electron.ipcRenderer.send('set-new-price-on-tray',that.price);
    });

    //listen for alert change
    bus.$on('newAlert', function(data){
      if(!data)return;

      console.log(data);
      if(data.isAlert)that.sendAlert(data);
      
    });
    
  },
  methods: {

    sendAlert: function(data){
      this.playSound(data.isUp);
      //alert(data.change);
    },
    
    playSound: function(isUp){
      if(isUp){
        let sound = document.getElementById("up-audio");
        sound.play();
      }
      else{
        let sound = document.getElementById("down-audio");
        sound.play();
      }
    },

    stopSound: function(){
      console.log('press space....')
      let sound1 = document.getElementById("up-audio");
      let sound2 = document.getElementById("down-audio");
      sound1.pause();
      sound2.pause();
      sound1.currentTime = 0;
      sound2.currentTime = 0;
    }

  }
};
</script>

<style scoped>
#circle {
  width: 80px;
  height: 80px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 1px solid black;
  display: inline-block;
  float: left;
  margin-right:1em;
}
#circle img{
  width: 100%;
  height: 100%;
  display: inline;
}
.big-number {
  font-size: 70px;
  font-weight: 400;
  margin-right: 20px;
}
.glow {
  color: black;
  text-shadow: 0 0 1px #ffffff, 0 0 5px #ffffff, 0 0 10px #08f, 0 0 3px #08f,
    0 0 5px #08f, 0 0 5px #08f;
  -webkit-animation: blink 1.5s infinite alternate;
  animation: blink 1.5s infinite alternate;
}

@-webkit-keyframes blink {
  100% {
    text-shadow: 0 0 2px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff,
      0 0 40px #08f, 0 0 70px #08f, 0 0 80px #08f;
  }
}

@keyframes blink {
  100% {
    text-shadow: 0 0 2px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff,
      0 0 40px #08f, 0 0 70px #08f, 0 0 80px #08f;
  }
}
</style>
