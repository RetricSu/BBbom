<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-10 12:29:47
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-11 16:31:40
 -->
<template>
  <modal name="demo-login" transition="pop-out" :width="modalWidth" :height="modalHeight">
    <div class="box">
      <div class="box-part" id="bp-left">
        <div class="partition" id="partition-register">
          <div class="partition-title">设置</div>
          <div class="partition-form">
            <form autocomplete="false">
              <div class="alert-time-picker">
                <h2>涨：</h2>
                <div class="line">
                  在
                  <input ref="hourup" type="number" min="0" :value="hour_up" /> 小时
                  <input ref="minuteup" type="number" min="0" :value="minute_up" /> 分
                  <input ref="secondup" type="number" min="0" :value="second_up" /> 秒
                </div>
                <div class="line">
                  涨幅超过：
                  <input ref="changeup" type="number" min="0" :value="change_up" /> % 即触发报警。
                </div>

                <div class="line" v-shortkey="['space']" @shortkey="stopSound()">
                  音效选择：
                  <select ref="soundup" @change="selectSound($event)">
                    <option :selected="sound_up === 'alarm.mp3'?'selectd':null" value="alarm.mp3">alarm</option>
                    <option :selected="sound_up === 'cell_ringing_music.mp3'?'selectd':null" value="cell_ringing_music.mp3">cell ringing music</option>
                    <option :selected="sound_up === 'ed_sheeran_perfect.mp3'?'selectd':null" value="ed_sheeran_perfect.mp3">ed sheeran perfect</option>
                    <option :selected="sound_up === 'i_love_rock_n_roll.mp3'?'selectd':null" value="i_love_rock_n_roll.mp3">i love rock n roll</option>
                    <option :selected="sound_up === 'looney_tunes.mp3'?'selectd':null" value="looney_tunes.mp3">looney_tunes</option>
                    <option :selected="sound_up === 'mercy.mp3'?'selectd':null" value="mercy.mp3">mercy</option>
                    <option :selected="sound_up === 'mission_impossible.mp3'?'selectd':null" value="mission_impossible.mp3">mission_impossible</option>
                    <option :selected="sound_up === 'office_phone_4.mp3'?'selectd':null" value="office_phone_4.mp3">office_phone_4</option>
                    <option :selected="sound_up === 'Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3'?'selectd':null" value="Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3">We_Are_The_Champions</option>
                    <option :selected="sound_up === 'rick_and_morty_intro.mp3'?'selectd':null" value="rick_and_morty_intro.mp3">rick_and_morty</option>
                    <option :selected="sound_up === 'ring_music.mp3'?'selectd':null" value="ring_music.mp3">ring_music</option>
                    <option :selected="sound_up === 'ringtone_plus_ii.mp3'?'selectd':null" value="ringtone_plus_ii.mp3">ringtone_plus_ii</option>
                    <option :selected="sound_up === 'the_lazy_song.mp3'?'selectd':null" value="the_lazy_song.mp3">the_lazy_song</option>
                    <option :selected="sound_up === 'when_you_say_nothing.mp3'?'selectd':null" value="when_you_say_nothing.mp3">when_you_say_nothing</option>
                    <option :selected="sound_up === 'yo_phone_is_ringing.mp3'?'selectd':null" value="yo_phone_is_ringing.mp3">yo_phone_is_ringing</option>
                  </select>
                </div>
                <hr />
                <h2>跌：</h2>
                <div class="line">
                  在
                  <input ref="hourdown" type="number" min="0" :value="hour_down" /> 小时
                  <input ref="minutedown" type="number" min="0" :value="minute_down" /> 分
                  <input ref="seconddown" type="number" min="0" :value="second_down" /> 秒
                </div>
                <div class="line">
                  跌幅超过：
                  <input ref="changedown" type="number" :value="change_down" /> % 即触发报警。
                </div>

                <div class="line">
                  音效选择：
                  <select ref="sounddown" @change="selectSound($event)">
                    <option :selected="sound_down === 'alarm.mp3'?'selectd':null" value="alarm.mp3">alarm</option>
                    <option :selected="sound_down === 'cell_ringing_music.mp3'?'selectd':null" value="cell_ringing_music.mp3">cell ringing music</option>
                    <option :selected="sound_down === 'ed_sheeran_perfect.mp3'?'selectd':null" value="ed_sheeran_perfect.mp3">ed sheeran perfect</option>
                    <option :selected="sound_down === 'i_love_rock_n_roll.mp3'?'selectd':null" value="i_love_rock_n_roll.mp3">i love rock n roll</option>
                    <option :selected="sound_down === 'looney_tunes.mp3'?'selectd':null" value="looney_tunes.mp3">looney_tunes</option>
                    <option :selected="sound_down === 'mercy.mp3'?'selectd':null" value="mercy.mp3">mercy</option>
                    <option :selected="sound_down === 'mission_impossible.mp3'?'selectd':null" value="mission_impossible.mp3">mission_impossible</option>
                    <option :selected="sound_down === 'office_phone_4.mp3'?'selectd':null" value="office_phone_4.mp3">office_phone_4</option>
                    <option :selected="sound_down === 'Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3'?'selectd':null" value="Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3">We_Are_The_Champions</option>
                    <option :selected="sound_down === 'rick_and_morty_intro.mp3'?'selectd':null" value="rick_and_morty_intro.mp3">rick_and_morty</option>
                    <option :selected="sound_down === 'ring_music.mp3'?'selectd':null" value="ring_music.mp3">ring_music</option>
                    <option :selected="sound_down === 'ringtone_plus_ii.mp3'?'selectd':null" value="ringtone_plus_ii.mp3">ringtone_plus_ii</option>
                    <option :selected="sound_down === 'the_lazy_song.mp3'?'selectd':null" value="the_lazy_song.mp3">the_lazy_song</option>
                    <option :selected="sound_down === 'when_you_say_nothing.mp3'?'selectd':null" value="when_you_say_nothing.mp3">when_you_say_nothing</option>
                    <option :selected="sound_down === 'yo_phone_is_ringing.mp3'?'selectd':null" value="yo_phone_is_ringing.mp3">yo_phone_is_ringing</option>
                  </select>
                </div>
                <hr />
                <div class="line">
                  <h2>主题颜色</h2>
                  <select>
                    <option value="volvo">黑白灰</option>
                    <option value="saab">天空蓝</option>
                    <option value="opel">深沉红</option>
                    <option value="audi">傻逼紫</option>
                  </select>
                </div>
              </div>
            </form>

            <div style="margin-top: 42px"></div>

            <div class="button-set">
              <button @click="save" id="goto-signin-btn">保存</button>
              <button @click="quit" id="register-btn">取消</button>
            </div>

            </div>
        </div>
      </div>
      <div class="box-part" id="bp-right">
        <div class="box-messages"></div>
      </div>
    </div>
  </modal>
</template>
<script>
import default_config from "../../../services/config.json";
import { linkSync } from 'fs';

const MODAL_WIDTH = 656;
const MODAL_HEIGHT = 656;
export default {
  name: "DemoLoginModal",
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      modalHeight: MODAL_HEIGHT,
      change_up: null,
      change_down: null,
      period_up: null,
      period_down: null,
      hour_up: null,
      hour_down: null,
      minute_up: null,
      minute_down: null,
      second_up: null,
      second_down: null,
      sound_up: null,
      sound_down: null,
      previewSound:null
    };
  },
  created() {
    this.modalWidth = window.innerWidth;
    this.modalHeight = window.innerHeight;
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      let setting = localStorage.setting;
      console.log(setting);
      if (!setting) {
        this.change_up = default_config.CHANGE_UP * 100;
        this.change_down = default_config.CHANGE_DOWN * 100;
        this.period_up = default_config.PERIOD_UP;
        this.period_down = default_config.PERIOD_DOWN;
        this.sound_up = default_config.SOUNDTRACK_UP;
        this.sound_down = default_config.SOUNDTRACK_DOWN;
      } else {
        setting = JSON.parse(setting);
        this.change_up = (setting.change_up || default_config.CHANGE_UP) * 100;
        this.change_down = (setting.change_down || default_config.CHANGE_DOWN) * 100;
        this.period_up = setting.period_up || default_config.PERIOD_UP;
        this.period_down = setting.period_down || default_config.PERIOD_DOWN;
        this.sound_up = setting.sound_up || default_config.SOUNDTRACK_UP;
        this.sound_down = setting.sound_down || default_config.SOUNDTRACK_DOWN;
      }
      
      let duration_up = this.milsecToHms(this.period_up);
      this.hour_up = duration_up[0];
      this.minute_up = duration_up[1];
      this.second_up = duration_up[2];

      let duration_down = this.milsecToHms(this.period_down);
      this.hour_down = duration_down[0];
      this.minute_down = duration_down[1];
      this.second_down = duration_down[2];
    },

    save: function() {
      
      let hourup = this.$refs.hourup.value;
      let minuteup = this.$refs.minuteup.value;
      let secondup = this.$refs.secondup.value;
      //console.log(hourup,minuteup,secondup)
      let periodup = ( Number(hourup) * 3600 + Number(minuteup) * 60 + Number(secondup) ) * 1000;

      let hourdown = this.$refs.hourdown.value;
      let minutedown = this.$refs.minutedown.value;
      let seconddown = this.$refs.seconddown.value;
      //console.log(hourdown,minutedown,seconddown, hourdown * 3600 + minutedown * 60 + seconddown,( hourdown * 3600 + minutedown * 60 + seconddown ) * 1000)
      let perioddown = ( Number(hourdown) * 3600 + Number(minutedown * 60) + Number(seconddown) ) * 1000;
      
      let changeup = this.$refs.changeup.value / 100;
      let changedown = this.$refs.changedown.value / 100;

      let soundup = this.$refs.soundup.value;
      let sounddown = this.$refs.sounddown.value;
      
      console.log(periodup,perioddown,changeup,changedown,soundup,sounddown);
      
      
      //if(!localStorage.setting)localStorage.setting = {};

      let setting = {
        period_up:periodup,
        period_down:perioddown,
        change_up:changeup,
        change_down:changedown,
        sound_up:soundup,
        sound_down:sounddown
      }
      localStorage.setting = JSON.stringify(setting);
      
      //relauche the app to make new setting work
      const app = require("electron").remote.app
      app.relaunch()
      app.exit()
    },

    quit: function() {
      const remote = require("electron").remote;
      let w = remote.getCurrentWindow();
      w.close();
    },

    selectSound: function(event){
      let soundname = event.currentTarget.value;
      //this.previewSound =  + soundname;
      console.log(soundname);
      this.playSound(soundname);
    },

    playSound: function(name){
      let audio = new Audio(__static+'/sound/'+name);
      if(this.previewSound)this.previewSound.pause();

      this.previewSound = audio;
      this.previewSound.play();
    },
    
    stopSound: function(){
      if(this.previewSound)this.previewSound.pause();
    },

    milsecToHms: function(d) {
      d = Number(d)/1000;
      console.log(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);
      return [h,m,s];
    }
  }
};
</script>
<style lang="scss">
$background_color: #404142;
$github_color: #dba226;
$facebook_color: #3880ff;
.box {
  background: white;
  color: #8b8c8d;
  font-size: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 50%;
    &#bp-right {
      background: url('../../../assets/background.jpeg')
        no-repeat top left;
      background-size: cover;
      border-left: 1px solid #eee;
    }
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #f38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  input[type="password"],
  input[type="text"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }
  .alert-time-picker {
    color: #8b8c8d;
    font-size: 12px;
    input {
      width: 50px;
      font-size: 12px;
      line-height: 2;
      padding: 4px 8px;
      font-family: inherit;
      transition: 0.5s all;
      outline: none;
    }
    .line {
      margin-bottom: 10px;
    }
  }
  button {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    outline: none;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .large-btn {
    width: 100%;
    background: white;
    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }
  .button-set {
    margin-bottom: 8px;
  }
  #register-btn,
  #signin-btn {
    margin-left: 8px;
  }
  .facebook-btn {
    border-color: $facebook_color;
    color: $facebook_color;
    &:hover {
      border-color: $facebook_color;
      background: $facebook_color;
    }
  }
  .github-btn {
    border-color: $github_color;
    color: $github_color;
    &:hover {
      border-color: $github_color;
      background: $github_color;
    }
  }
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
body{
  -webkit-app-region: drag;
}
</style>