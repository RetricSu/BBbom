<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-10 15:18:14
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-27 14:09:52
 -->
<template>
  <div class="setting-main">
    <div class="window">
      <header class="toolbar toolbar-header">
        <h1 class="title">设置</h1>
      </header>
      <div class="window-content">
        <div class="pane-group">
          <div class="pane-sm sidebar">
            <nav class="nav-group">
              <h5 class="nav-group-title">所有设置</h5>
              <a class="nav-group-item" :class="{'active': activeTab === 1}" @click="activeTab = 1">
                <span class="icon icon-up-bold"></span>
                涨幅预警
              </a>
              <span
                class="nav-group-item"
                :class="{'active': activeTab === 2}"
                @click="activeTab = 2"
              >
                <span class="icon icon-down-bold"></span>
                跌幅预警
              </span>
              <span
                class="nav-group-item"
                :class="{'active': activeTab === 3}"
                @click="activeTab = 3"
              >
                <span class="icon icon-sound"></span>
                固定价格预警
              </span>
              <span
                class="nav-group-item"
                :class="{'active': activeTab === 4}"
                @click="activeTab = 4"
              >
                <span class="icon icon-picasa"></span>
                主题
              </span>
              <span
                class="nav-group-item"
                :class="{'active': activeTab === 5}"
                @click="activeTab = 5"
              >
                <span class="icon icon-globe"></span>
                个性化页面
              </span>
              <span
                class="nav-group-item"
                :class="{'active': activeTab === 6}"
                @click="activeTab = 6"
              >
                <span class="icon icon-globe"></span>
                数据来源API
              </span>
              <span
                class="nav-group-item"
                :class="{'active': activeTab === 7}"
                @click="activeTab = 7"
              >
                <span class="icon icon-globe"></span>
                语言
              </span>
            </nav>
          </div>
          <div class="pane">
            <div class="tab-content" :class="{'show': activeTab === 1}">
              <div class="line">
                波动幅度 =（最高价 - 最低价）／ 最低价。
                当波动幅度大于设定值时，触发报警。
                报警后将重新开始统计新一个时间段内的涨幅波动。
              </div>
              <hr />
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
                  <option
                    :selected="sound_up === 'alarm.mp3'?'selectd':null"
                    value="alarm.mp3"
                  >alarm</option>
                  <option
                    :selected="sound_up === 'cell_ringing_music.mp3'?'selectd':null"
                    value="cell_ringing_music.mp3"
                  >cell ringing music</option>
                  <option
                    :selected="sound_up === 'ed_sheeran_perfect.mp3'?'selectd':null"
                    value="ed_sheeran_perfect.mp3"
                  >ed sheeran perfect</option>
                  <option
                    :selected="sound_up === 'i_love_rock_n_roll.mp3'?'selectd':null"
                    value="i_love_rock_n_roll.mp3"
                  >i love rock n roll</option>
                  <option
                    :selected="sound_up === 'looney_tunes.mp3'?'selectd':null"
                    value="looney_tunes.mp3"
                  >looney_tunes</option>
                  <option
                    :selected="sound_up === 'mercy.mp3'?'selectd':null"
                    value="mercy.mp3"
                  >mercy</option>
                  <option
                    :selected="sound_up === 'mission_impossible.mp3'?'selectd':null"
                    value="mission_impossible.mp3"
                  >mission_impossible</option>
                  <option
                    :selected="sound_up === 'office_phone_4.mp3'?'selectd':null"
                    value="office_phone_4.mp3"
                  >office_phone_4</option>
                  <option
                    :selected="sound_up === 'Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3'?'selectd':null"
                    value="Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3"
                  >We_Are_The_Champions</option>
                  <option
                    :selected="sound_up === 'rick_and_morty_intro.mp3'?'selectd':null"
                    value="rick_and_morty_intro.mp3"
                  >rick_and_morty</option>
                  <option
                    :selected="sound_up === 'ring_music.mp3'?'selectd':null"
                    value="ring_music.mp3"
                  >ring_music</option>
                  <option
                    :selected="sound_up === 'ringtone_plus_ii.mp3'?'selectd':null"
                    value="ringtone_plus_ii.mp3"
                  >ringtone_plus_ii</option>
                  <option
                    :selected="sound_up === 'the_lazy_song.mp3'?'selectd':null"
                    value="the_lazy_song.mp3"
                  >the_lazy_song</option>
                  <option
                    :selected="sound_up === 'when_you_say_nothing.mp3'?'selectd':null"
                    value="when_you_say_nothing.mp3"
                  >when_you_say_nothing</option>
                  <option
                    :selected="sound_up === 'yo_phone_is_ringing.mp3'?'selectd':null"
                    value="yo_phone_is_ringing.mp3"
                  >yo_phone_is_ringing</option>
                </select>
              </div>
            </div>
            <div class="tab-content" :class="{'show': activeTab === 2}">
              <div class="line">
                波动幅度 =（最高价 - 最低价）／ 最低价。
                当波动幅度大于设定值时，触发报警。
                报警后将重新开始统计新一个时间段内的跌幅波动。
              </div>
              <hr />
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
                  <option
                    :selected="sound_down === 'alarm.mp3'?'selectd':null"
                    value="alarm.mp3"
                  >alarm</option>
                  <option
                    :selected="sound_down === 'cell_ringing_music.mp3'?'selectd':null"
                    value="cell_ringing_music.mp3"
                  >cell ringing music</option>
                  <option
                    :selected="sound_down === 'ed_sheeran_perfect.mp3'?'selectd':null"
                    value="ed_sheeran_perfect.mp3"
                  >ed sheeran perfect</option>
                  <option
                    :selected="sound_down === 'i_love_rock_n_roll.mp3'?'selectd':null"
                    value="i_love_rock_n_roll.mp3"
                  >i love rock n roll</option>
                  <option
                    :selected="sound_down === 'looney_tunes.mp3'?'selectd':null"
                    value="looney_tunes.mp3"
                  >looney_tunes</option>
                  <option
                    :selected="sound_down === 'mercy.mp3'?'selectd':null"
                    value="mercy.mp3"
                  >mercy</option>
                  <option
                    :selected="sound_down === 'mission_impossible.mp3'?'selectd':null"
                    value="mission_impossible.mp3"
                  >mission_impossible</option>
                  <option
                    :selected="sound_down === 'office_phone_4.mp3'?'selectd':null"
                    value="office_phone_4.mp3"
                  >office_phone_4</option>
                  <option
                    :selected="sound_down === 'Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3'?'selectd':null"
                    value="Queen_We_Are_The_Champions_Ringtone_(by Fringster.com).mp3"
                  >We_Are_The_Champions</option>
                  <option
                    :selected="sound_down === 'rick_and_morty_intro.mp3'?'selectd':null"
                    value="rick_and_morty_intro.mp3"
                  >rick_and_morty</option>
                  <option
                    :selected="sound_down === 'ring_music.mp3'?'selectd':null"
                    value="ring_music.mp3"
                  >ring_music</option>
                  <option
                    :selected="sound_down === 'ringtone_plus_ii.mp3'?'selectd':null"
                    value="ringtone_plus_ii.mp3"
                  >ringtone_plus_ii</option>
                  <option
                    :selected="sound_down === 'the_lazy_song.mp3'?'selectd':null"
                    value="the_lazy_song.mp3"
                  >the_lazy_song</option>
                  <option
                    :selected="sound_down === 'when_you_say_nothing.mp3'?'selectd':null"
                    value="when_you_say_nothing.mp3"
                  >when_you_say_nothing</option>
                  <option
                    :selected="sound_down === 'yo_phone_is_ringing.mp3'?'selectd':null"
                    value="yo_phone_is_ringing.mp3"
                  >yo_phone_is_ringing</option>
                </select>
              </div>
            </div>
            <div class="tab-content" :class="{'show': activeTab === 3}">
              <div class="line">
                当到达固定价格时，将触发报警。
                <br />报警后将失效。需要重新开启。
              </div>
              <hr />
              <div class="line">
                <input type="checkbox" id="fixed-price-up-check" v-model="is_fixed_up" />
                <label for="fixed-price-up-check">{{ is_fixed_up ? '已开启':'已关闭'}}</label>
              </div>
              <div class="line">
                <div v-if="is_fixed_up">
                  上涨至：
                  <input type="number" :value="fixed_up" ref="fixed_up" /> USDT
                </div>
              </div>
              <div class="line">
                <input type="checkbox" id="fixed-price-down-check" v-model="is_fixed_down" />
                <label for="fixed-price-down-check">{{ is_fixed_up ? '已开启':'已关闭'}}</label>
              </div>
              <div class="line">
                <div v-if="is_fixed_down">
                  下降至：
                  <input type="number" :value="fixed_down" ref="fixed_down" /> USDT
                </div>
              </div>
            </div>
            <div class="tab-content" :class="{'show': activeTab === 4}">
              <div class="line">
                <h2>主题设置</h2>
                <select ref="color_theme">
                  <option :selected="color_theme === 'dark'?'selectd':null" value="dark">夜间模式</option>
                  <option :selected="color_theme === 'light'?'selectd':null" value="light">白天模式</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="toolbar toolbar-footer">
        <div class="toolbar-actions">
          <span >每页设置需先单独保存，保存完再重启</span>
          <button @click="quit" class="btn btn-default">取消退出</button>
          
          <button @click="reStart" class="btn btn-default pull-right">重启生效</button>
          <button @click="save" class="btn btn-primary pull-right">保存当前页设置</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
var dataApi = Vue.prototype.$api;

export default {
  name: "setting",
  data() {
    return {
      activeTab: 1,
      is_fixed_up: null,
      is_fixed_down: null,
      fixed_up: null,
      fixed_down: null,
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
      color_theme: null,
      previewSound: null
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function() {
      let pref = dataApi.getPreferences();
      console.log(pref);

      this.is_fixed_up = pref.IS_FIXED_UP;
      this.is_fixed_down = pref.IS_FIXED_DOWN;
      this.fixed_up = pref.FIXED_PRICE_UP;
      this.fixed_down = pref.FIXED_PRICE_DOWN;
      this.change_up = pref.CHANGE_UP * 100;
      this.change_down = pref.CHANGE_DOWN * 100;
      this.period_up = pref.PERIOD_UP;
      this.period_down = pref.PERIOD_DOWN;
      this.sound_up = pref.SOUNDTRACK_UP;
      this.sound_down = pref.SOUNDTRACK_DOWN;
      this.color_theme = pref.COLOR_THEME;

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
      
      let periodup =
        (Number(hourup) * 3600 + Number(minuteup) * 60 + Number(secondup)) *
        1000;

      let hourdown = this.$refs.hourdown.value;
      let minutedown = this.$refs.minutedown.value;
      let seconddown = this.$refs.seconddown.value;
      
      let perioddown =
        (Number(hourdown) * 3600 +
          Number(minutedown * 60) +
          Number(seconddown)) *
        1000;

      let changeup = this.$refs.changeup.value / 100;
      let changedown = this.$refs.changedown.value / 100;

      let soundup = this.$refs.soundup.value;
      let sounddown = this.$refs.sounddown.value;
      
      let pref = {};
          pref.IS_FIXED_UP = this.is_fixed_up;
          pref.IS_FIXED_DOWN = this.is_fixed_down;
          this.is_fixed_up ? pref.FIXED_PRICE_UP = this.$refs.fixed_up.value:pref.FIXED_PRICE_UP = 1000000;
          this.is_fixed_down ? pref.FIXED_PRICE_DOWN = this.$refs.fixed_down.value:pref.FIXED_PRICE_DOWN = 0;
          pref.CHANGE_UP = changeup;
          pref.CHANGE_DOWN = changedown;
          pref.PERIOD_UP = periodup;
          pref.PERIOD_DOWN = perioddown;
          pref.SOUNDTRACK_UP = soundup;
          pref.SOUNDTRACK_DOWN = sounddown;
          pref.COLOR_THEME = this.$refs.color_theme.value;

          console.log('setting page',pref);
          dataApi.updatePreferences(pref);

      //relauche the app to make new setting work
      /*
      const app = require("electron").remote.app;
      app.relaunch();
      app.exit();
      */
    },

    reStart: function(){
      const app = require("electron").remote.app;
      app.relaunch();
      app.exit();
    },

    quit: function() {
      const remote = require("electron").remote;
      let w = remote.getCurrentWindow();
      w.close();
    },

    selectSound: function(event) {
      let soundname = event.currentTarget.value;
      //this.previewSound =  + soundname;
      console.log(soundname);
      this.playSound(soundname);
    },

    playSound: function(name) {
      let audio = new Audio(__static + "/sound/" + name);
      if (this.previewSound) this.previewSound.pause();

      this.previewSound = audio;
      this.previewSound.play();
    },

    stopSound: function() {
      if (this.previewSound) this.previewSound.pause();
    },

    milsecToHms: function(d) {
      d = Number(d) / 1000;
      console.log(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);
      return [h, m, s];
    }
  }
};
</script>

<style scoped src="../assets/css/photon.css"/>
<style lang="scss" scoped>
.window {
  color: black;
}
.toolbar-header {
  -webkit-app-region: drag;
}
.tab-content {
  display: none;
}
.show {
  display: inline-block;
}
.tab-content {
  padding: 30px;
  text-align: center;
}
.tab-content .line {
  margin: 20px;
  margin-left: 40px;
  text-align: left;
}
.line input[type="number"] {
  padding: 5px;
  width: 100px;
}
</style>