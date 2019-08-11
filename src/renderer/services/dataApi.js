/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-09 14:33:48
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-11 16:04:43
 */
const BASE_URL = require('../services/config').BASE_URL;
const PRICE_URL = require('../services/config').PRICE_URL;
const FREQUENCY = require('../services/config').FREQUENCY;
const PERIOD = require('../services/config').PERIOD;
const CHANGE = require('../services/config').CHANGE;
var CHANGE_UP,CHANGE_DOWN,PERIOD_UP,PERIOD_DOWN;
var setting;
const default_config = require('../services/config');

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
}


const axios = require('axios');
import bus from '../services/bus'

var changeFristPrice = 0; //alert period time's first price
var changeLastPrice = 0; //alert period time's last price, if two price abs greater than CHANGE, give alert to user.

export default {

    getPrice: function () {
        var that = this;
        axios
            .get(PRICE_URL)
            .then(response => {
                let price = response.data.tick.close.toFixed(2);
                let rmb_price = (price * 6.99).toFixed(2);
                //console.log(response.data.tick.close);
                bus.$emit('newPrice', [price, rmb_price]);
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

    watchPriceUp: function () {
        var that = this;
        setInterval(() => {
            that.getChange();
        }, PERIOD_UP);
    },

    watchPriceDown: function () {
        var that = this;
        setInterval(() => {
            that.getChange();
        }, PERIOD_DOWN);
    },

    changeAlert: function () {
        var that = this;
        setInterval(() => {
            that.getChange();
        }, PERIOD);
    }
}







































/*
const axios = require('axios');
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 20000;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

function getPrice() {
    axios.get(PRICE_URL).then(response => {
            console.log(response.data.tick.close);
            //console.log(response);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}
*/