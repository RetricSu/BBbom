<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-07 16:46:13
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-26 18:13:38
 -->
<template>
  <div>
    <div id="circle">
      <img src="../../assets/BTC_Logo.svg" alt />
    </div>

    <!--
    <circleChange ref="circleChange" :change="change"></circleChange>
    -->

    <!--
    <circleProgress :CHANGE_PERCENT="change"></circleProgress>
    -->
    <div class="big-number glow">{{ price }}</div>
    <div class="rmb-number">
      ≈ {{ rmb_price }}
      <span>{{ last24h_change }}</span>
    </div>
    <audio v-shortkey="['space']" @shortkey="stopSound()" id="down-audio" :src="down_sound"></audio>
    <audio v-shortkey="['space']" @shortkey="stopSound()" id="up-audio" :src="up_sound"></audio>
  </div>
</template>

<script>
import dataApi from "../../services/dataApi";
import request from "request";
import axios from "axios";
import bus from "../../services/bus";
import Vue from "vue";
import circleProgress from "../sections/circleProgress";
import circleChange from "../sections/circleChange";
import { setInterval, clearInterval } from 'timers';

Vue.prototype.$api = dataApi;


export default {
  name: "price",
  data() {
    return {
      preferences: {},
      price: 0,
      rmb_price: 0,
      last24h_change: 0,
      change: 0.3,
      down_sound:
        __static +
        "/sound/" +
        //"../../static/sound/" + 
        "ring_music.mp3",
      up_sound:
        __static +
        "/sound/" +
        //"../../static/sound/" + 
        "ring_music.mp3"
    };
  },
  components: {
    circleProgress,
    circleChange
  },
  mounted() {
    var that = this;
    
    let pref = dataApi.getPreferences();
    that.preferences = pref;
    that.down_sound = __static+"/sound/" + that.preferences.SOUNDTRACK_DOWN;
    that.up_sound = __static+"/sound/" + that.preferences.SOUNDTRACK_UP;
    
    let color_theme = that.preferences.COLOR_THEME;
    document.documentElement.setAttribute('data-theme', color_theme);

    dataApi.updatePrice();
    //record price change percentage and alert
    dataApi.watchPriceUp();
    dataApi.watchPriceDown();
    

    //listen for update price
    bus.$on("newPrice", function(data) {
      //change background color and opacity according to change percent.
      that.changeBackgroundViaPrice(data[0]);
      that.price = data[0];
      that.rmb_price = data[1];
      that.last24h_change = data[3];

      that.$electron.ipcRenderer.send("set-new-price-on-tray", that.price);
    });

    //listen for alert change
    bus.$on("newAlert", function(data) {
      if (!data) return;

      console.log(data);
      if (data.isAlert) that.Alert(data);
    });
  },
  methods: {
    initdb: async function() {
      this.preferences = await dataApi.getPreferencesAsync();
      console.log(this.preferences);
    },

    changeBackgroundViaPrice: function(data) {
      let that = this;
      let change = data - that.price;
      let changevol = Math.abs(data - that.price) / that.price;
      let changevol2 = (data - that.price) / that.price;

      changevol = changevol < 0.0001 ? changevol * 1000 : changevol;
      changevol = changevol < 0.001 ? changevol * 100 : changevol;
      changevol = changevol < 0.01 ? changevol * 10 : changevol;

      if (change >= 0) {
        document.body.style.background =
          "rgba(77, 255, 133, " + changevol + ")";
      } else {
        document.body.style.background = "rgba(255, 77, 77, " + changevol + ")";
      }
      //that.$refs.circleChange.setChange(change >=0,changevol);

      that.change = changevol;
    },

    Alert: function(data) {
      this.playSound(data.isUp);
      let message, tips;
      switch (data.type) {
        case "fixed alert":
          let num = data.isUp ? data.FIXED_PRICE_UP : data.FIXED_PRICE_DOWN;
          tips = data.isUp
            ? "大佬币价涨了，赚到钱赏我点吧！点击菜单栏的“赞赏”"
            : "大佬币价跌了，及时止损啊！";
          message = {
            title: "警报！比特币突破" + num + "!",
            body: tips + "\n 固定价格已经重置了，请重新设置。"
          };
          this.sendNotifcation(message);
          break;
        case "percentage alert":
          let minutes = data.isUp ? data.PERIOD_UP : data.PERIOD_DOWN;
          tips = minutes / (1000 * 60) + "分钟内波动超过：" + data.change + "%";
          message = {
            title: "比特币剧烈波动预警！",
            body: tips
          };
          this.sendNotifcation(message);
          break;
        default:
          this.sendNotifcation({
            title: "未知预警",
            body: "反正就是报警了..."
          });
      }
    },

    sendNotifcation: function(message) {
      let title = message.title;
      let body = message.body;
      let myNotification = new Notification(title, {
        body: body,
        icon: "../../assets/bitcoin.png",
        hasReply: true
      });
      myNotification.onclick = () => {
        console.log("Notification clicked");
        this.stopSound();
      };
    },

    playSound: function(isUp) {
      if (isUp) {
        let sound = document.getElementById("up-audio");
        sound.play();
      } else {
        let sound = document.getElementById("down-audio");
        sound.play();
      }

      //shake window effect
      this.shakeWindow();
    },

    stopSound: function() {
      console.log("press space....");
      let sound1 = document.getElementById("up-audio");
      let sound2 = document.getElementById("down-audio");
      sound1.pause();
      sound2.pause();
      sound1.currentTime = 0;
      sound2.currentTime = 0;

      this.stopShakeWindow();
    },

    shakeWindow: function() {
      const win = require("electron").remote.getCurrentWindow();
      var origin_pos = win.getPosition();
      console.log('origin_pos: ',origin_pos);
      let offset = 5;
      window.shakeTimer = setInterval(() => {
        win.setPosition(origin_pos[0]+offset,origin_pos[1]);
        offset = - offset;
      }, 100);
      
      //after 10 seconds auto stop shaking windowing
      setTimeout(() => {
        clearInterval(window.shakeTimer);
      }, 10000);
    },

    stopShakeWindow: function(){
      clearInterval(window.shakeTimer);
    }
  }
};
</script>

<style>
/* Default variables */
[data-theme^="dark"],
[data-theme] [data-theme^="dark"] {
  --main-color: #fff;
  --background-color: #000;
}

[data-theme^="light"],
[data-theme] [data-theme^="light"] {
  --main-color: #000;
  --background-color: whitesmoke;
}
/*****/
/*
.rmb-number {
  color: var(--main-color);
}
.rmb-number span {
  float: right;
  margin-right: 35px;
}
#circle {
  width: 80px;
  height: 80px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 1px solid var(--main-color);
  display: inline-block;
  float: left;
  margin-right: 1em;
}
#circle img {
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
  color: var(--main-color);
  text-shadow: 0 0 1px var(--background-color), 0 0 5px var(--background-color), 0 0 10px var(--main-color), 0 0 3px var(--main-color),
    0 0 5px var(--main-color), 0 0 5px var(--main-color);
  -webkit-animation: blink 1.5s infinite alternate;
  animation: blink 1.5s infinite alternate;
}

@-webkit-keyframes blink {
  100% {
    text-shadow: 0 0 2px var(--background-color), 0 0 10px var(--background-color), 0 0 20px var(--background-color),
      0 0 40px var(--main-color), 0 0 70px var(--main-color), 0 0 80px var(--main-color);
  }
}

@keyframes blink {
  100% {
    text-shadow: 0 0 2px var(--background-color), 0 0 10px var(--background-color), 0 0 20px var(--background-color),
      0 0 40px var(--main-color), 0 0 70px var(--main-color), 0 0 80px var(--main-color);
  }
}*/


.rmb-number {
  color: var(--background-color);
}
.rmb-number span {
  float: right;
  margin-right: 35px;
}
#circle {
  width: 80px;
  height: 80px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 1px solid var(--background-color);
  display: inline-block;
  float: left;
  margin-right: 1em;
}
#circle img {
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
  color: var(--background-color);
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
