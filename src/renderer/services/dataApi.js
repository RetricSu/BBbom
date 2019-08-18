/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-09 14:33:48
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-18 11:51:08
 */
const BASE_URL = require('../services/config').BASE_URL;
const PRICE_URL = require('../services/config').PRICE_URL;
const FREQUENCY = require('../services/config').FREQUENCY;
const PERIOD = require('../services/config').PERIOD;
const CHANGE = require('../services/config').CHANGE;
var CHANGE_UP,CHANGE_DOWN,PERIOD_UP,PERIOD_DOWN,
IS_FIXED_PRICE_WATCHED,FIXED_PRICE_UP,FIXED_PRICE_DOWN;
var setting;
const default_config = require('../services/config');
/*
if (localStorage.setting) {
    setting = JSON.parse(localStorage.setting);
    CHANGE_UP = setting.change_up || default_config.CHANGE_UP;
    CHANGE_DOWN = setting.change_down || default_config.CHANGE_DOWN;
    PERIOD_UP = setting.period_up || default_config.PERIOD_UP;
    PERIOD_DOWN = setting.period_down || default_config.PERIOD_DOWN;
} else {
    CHANGE_UP = default_config.CHANGE_UP;
    CHANGE_DOWN = default_config.CHANGE_DOWN;
    PERIOD_UP = default_config.PERIOD_UP;
    PERIOD_DOWN = default_config.PERIOD_DOWN;
}*/

//load user setting
localStorage.setting ? setting = JSON.parse(localStorage.setting) : setting = {};
CHANGE_UP = setting.change_up || default_config.CHANGE_UP;
CHANGE_DOWN = setting.change_down || default_config.CHANGE_DOWN;
PERIOD_UP = setting.period_up || default_config.PERIOD_UP;
PERIOD_DOWN = setting.period_down || default_config.PERIOD_DOWN;
IS_FIXED_PRICE_WATCHED = setting.is_fixed_price_watched || default_config.IS_FIXED_PRICE_WATCHED;
FIXED_PRICE_UP = setting.fixed_price_up || default_config.FIXED_PRICE_UP;
FIXED_PRICE_DOWN = setting.fixed_price_down || default_config.FIXED_PRICE_DOWN;


const axios = require('axios');
import bus from '../services/bus'

var changeFristPrice = 0; //alert period time's first price
var changeLastPrice = 0; //alert period time's last price, if two price abs greater than CHANGE, give alert to user.
var MAX_PRICE_UP = 0;
var MIN_PRICE_UP = 10000000000000000000;
var MAX_PRICE_DOWN = 0;
var MIN_PRICE_DOWN = 10000000000000000000;


export default {

    getPrice: function () {
        var that = this;
        axios
            .get(PRICE_URL)
            .then(response => {

                let price = response.data.tick.close.toFixed(2);
                let last24h_price = response.data.tick.open.toFixed(2);
                let rmb_price = (price * 6.99).toFixed(2);
                
                //get fixed price alert if is ture
                IS_FIXED_PRICE_WATCHED ? 
                that.watchFixedPrice(price) : null;

                //get max and min price to call margin change alert 
                MAX_PRICE_UP <= price ? MAX_PRICE_UP = price : MAX_PRICE_UP;
                MIN_PRICE_UP >= price ? MIN_PRICE_UP = price : MIN_PRICE_UP;
                MAX_PRICE_DOWN <= price ? MAX_PRICE_DOWN = price : MAX_PRICE_DOWN;
                MIN_PRICE_DOWN >= price ? MIN_PRICE_DOWN = price : MIN_PRICE_DOWN;
                
                bus.$emit('newPrice', [price, rmb_price, last24h_price]);
                
            })
    },

    updatePrice: function () {
        var that = this;
        setInterval(() => {
            that.getPrice();
        }, FREQUENCY);
    },

    getChange: function () {
        var that = this;
        axios
            .get(PRICE_URL)
            .then(response => {
                let price = response.data.tick.close.toFixed(2);
                let result = that.calChange(changeFristPrice, price);
                changeFristPrice = price;
                bus.$emit('newAlert', result);
            })
    },

    calChange: function (p1, p2) {
        if (p1 == 0) return;

        if ((p2 - p1) >= 0) {
            if (Math.abs(p2 - p1) / p1 >= CHANGE_UP)
                return {
                    isAlert: true,
                    isUp: true,
                    change: (p2 - p1) / p1
                }
            else
                return {
                    isAlert: false,
                    isUp: true,
                    change: (p2 - p1) / p1
                }
        } else {
            if (Math.abs(p2 - p1) / p1 >= CHANGE_DOWN)
                return {
                    isAlert: true,
                    isUp: false,
                    change: (p2 - p1) / p1
                }
            else
                return {
                    isAlert: false,
                    isUp: false,
                    change: (p2 - p1) / p1
                }
        }
    },

    changeAlert: function () {
        var that = this;
        setInterval(() => {
            that.getChange();
        }, PERIOD);
    },

    getChangeMax: function () {
        let change_up = Math.abs( MAX_PRICE_UP - MIN_PRICE_UP ) / MIN_PRICE_UP ;
        
        change_up >= CHANGE_UP ? 
        bus.$emit('newAlert', {
            isAlert: true,
            isUp: true,
            change: change_up
        }) : null; 

        MAX_PRICE_UP = 0;
        MIN_PRICE_UP = 10000000000000000000;
    },

    getChangeMin: function () {
        let change_down = Math.abs( MAX_PRICE_DOWN - MIN_PRICE_DOWN ) / MIN_PRICE_DOWN ;
        
        change_down >= CHANGE_DOWN ?
        bus.$emit('newAlert', {
            isAlert: true,
            isUp: false,
            change: change_down
        }) : null; 
        
        MAX_PRICE_DOWN = 0;
        MIN_PRICE_DOWN = 10000000000000000000;
    },

    watchPriceUp: function () {
        var that = this;
        setInterval(() => {
            //that.getChange();
            that.getChangeMax();
        }, PERIOD_UP);
    },

    watchPriceDown: function () {
        var that = this;
        setInterval(() => {
            //that.getChange();
            that.getChangeMin();
        }, PERIOD_DOWN);
    },

    sendFixedAlert: function(isUp){
        isUp ? 
        //window.localStorage.setting.fixed_price_up = default_config.FIXED_PRICE_UP
        FIXED_PRICE_UP = default_config.FIXED_PRICE_UP
        :
        //window.localStorage.setting.fixed_price_down = default_config.FIXED_PRICE_DOWN;
        FIXED_PRICE_DOWN = default_config.FIXED_PRICE_DOWN;
        bus.$emit('newAlert', {
            isAlert: true,
            isUp: isUp,
            change: isUp ? 'reach fixed up price' + FIXED_PRICE_UP:'reach fixed down price' + FIXED_PRICE_DOWN
        });
        
    },
    
    watchFixedPrice: function(price){
        console.log(price,FIXED_PRICE_UP,FIXED_PRICE_DOWN);
        price >= FIXED_PRICE_UP ? this.sendFixedAlert(true):null;
        /*
        () => {
            bus.$emit('newAlert', {
                isAlert: true,
                isUp: true,
                change: 'reach fixed up price' + FIXED_PRICE_UP
            });
            localStorage.setting.fixed_price_up = default_config.FIXED_PRICE_UP;
        }: null;*/
        
        price <= FIXED_PRICE_DOWN ? this.sendFixedAlert(false):null;
        /*
        () => {
            bus.$emit('newAlert', {
                isAlert: true,
                isUp: false,
                change: 'reach fixed down price' + FIXED_PRICE_DOWN
            }) 
            localStorage.setting.fixed_price_down = default_config.FIXED_PRICE_DOWN;
        } : null;*/
    }
}

























