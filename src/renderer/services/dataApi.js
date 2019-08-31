/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-09 14:33:48
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-27 13:58:42
 */
var db = require('./db');

loadData();

var BASE_URL,
    PRICE_URL,
    FREQUENCY,
    CHANGE_UP,
    CHANGE_DOWN,
    PERIOD_UP,
    PERIOD_DOWN,
    IS_FIXED_UP,
    IS_FIXED_DOWN,
    FIXED_PRICE_UP,
    FIXED_PRICE_DOWN;

const axios = require('axios');
import bus from './bus'

var MAX_PRICE_UP = 0;
var MIN_PRICE_UP = 10000000000000000000;
var MAX_PRICE_DOWN = 0;
var MIN_PRICE_DOWN = 10000000000000000000;

function loadData() {
    var PREFERENCES = db.get('preferences').value();
    console.log('PREFERENCES:',PREFERENCES);
    let value = PREFERENCES;
        //value = JSON.parse(value);
        BASE_URL = value.BASE_URL;
        PRICE_URL = value.PRICE_URL;
        FREQUENCY = value.FREQUENCY;
        CHANGE_UP = value.CHANGE_UP;
        CHANGE_DOWN = value.CHANGE_DOWN;
        PERIOD_UP = value.PERIOD_UP;
        PERIOD_DOWN = value.PERIOD_DOWN;
        IS_FIXED_UP = value.IS_FIXED_UP;
        IS_FIXED_DOWN = value.IS_FIXED_DOWN;
        FIXED_PRICE_UP = value.FIXED_PRICE_UP;
        FIXED_PRICE_DOWN = value.FIXED_PRICE_DOWN;
}

export default {
    
    getdb: function(){
        return db;
    },

    updatePreferences: function(pref){
        console.log('update prepare:',pref,typeof pref);
        let p = db.get('preferences').value();
        let newdata = Object.assign({},p,pref);
        db.set('preferences', newdata) // 通过set方法来对对象操作
          .write() 
    },

    updateSinglePreference: function(key,value){
        db.set('preferences.'+key, value) // 通过set方法来对对象操作
          .write()
    },

    getPreferences: function(){
        return db.get('preferences').value(); 
    },

    getPrice: function () {
        var that = this;
        axios
            .get(PRICE_URL)
            .then(response => {

                let price = response.data.tick.close.toFixed(2);
                let rmb_price = (price * 6.99).toFixed(2);
                let last24h_price = response.data.tick.open.toFixed(2);

                // var is week string type may contains bugs
                // when excute > < = operation with number.
                // so need to covert to Number type.
                /********** really ugly ***********/
                price = parseFloat(price);
                MAX_PRICE_UP = parseFloat(MAX_PRICE_UP);
                MIN_PRICE_UP = parseFloat(MIN_PRICE_UP);
                MAX_PRICE_DOWN = parseFloat(MAX_PRICE_DOWN);
                MIN_PRICE_DOWN = parseFloat(MIN_PRICE_DOWN);
                /********** really ugly ***********/
                let last24h_change = (price - last24h_price) / last24h_price * 100;

                last24h_change = last24h_change.toFixed(2) + '%';

                //get fixed price alert if is ture
                that.watchFixedPrice(price);

                //get max and min price to call margin change alert 
                MAX_PRICE_UP <= price ? MAX_PRICE_UP = price : MAX_PRICE_UP;
                MIN_PRICE_UP >= price ? MIN_PRICE_UP = price : MIN_PRICE_UP;
                MAX_PRICE_DOWN <= price ? MAX_PRICE_DOWN = price : MAX_PRICE_DOWN;
                MIN_PRICE_DOWN >= price ? MIN_PRICE_DOWN = price : MIN_PRICE_DOWN;

                bus.$emit('newPrice', [this.fixlenAddZero(price), rmb_price, last24h_price, last24h_change]);
            })
    },

    updatePrice: function () {
        var that = this;
        setInterval(() => {
            that.getPrice();
        }, FREQUENCY);
    },

    getChangeMax: function () {
        let change_up = Math.abs(MAX_PRICE_UP - MIN_PRICE_UP) / MIN_PRICE_UP;

        CHANGE_UP = parseFloat(CHANGE_UP);
        change_up = parseFloat(change_up);

        change_up >= CHANGE_UP ?
            bus.$emit('newAlert', {
                isAlert: true,
                isUp: true,
                type: 'percentage alert',
                change: change_up,
                PERIOD_UP: PERIOD_UP
            }) : null;

        MAX_PRICE_UP = 0;
        MIN_PRICE_UP = 10000000000000000000;
    },

    getChangeMin: function () {
        let change_down = Math.abs(MAX_PRICE_DOWN - MIN_PRICE_DOWN) / MIN_PRICE_DOWN;

        CHANGE_DOWN = parseFloat(CHANGE_DOWN);
        change_down = parseFloat(change_down);

        change_down >= CHANGE_DOWN ?
            bus.$emit('newAlert', {
                isAlert: true,
                isUp: false,
                type: 'percentage alert',
                change: change_down,
                PERIOD_DOWN: PERIOD_DOWN
            }) : null;

        MAX_PRICE_DOWN = 0;
        MIN_PRICE_DOWN = 10000000000000000000;
    },

    watchPriceUp: function () {
        var that = this;
        setInterval(() => {
            that.getChangeMax();
        }, PERIOD_UP);
    },

    watchPriceDown: function () {
        var that = this;
        setInterval(() => {
            that.getChangeMin();
        }, PERIOD_DOWN);
    },

    sendFixedAlert: function (isUp) {
        bus.$emit('newAlert', {
            isAlert: true,
            isUp: isUp,
            type: 'fixed alert',
            change: 0,
            FIXED_PRICE_UP: FIXED_PRICE_UP,
            FIXED_PRICE_DOWN: FIXED_PRICE_DOWN
        });
        isUp ?
            IS_FIXED_UP = false :
            IS_FIXED_DOWN = false;

        isUp ?
            db.set('preferences.IS_FIXED_UP', false).write() :
            db.set('preferences.IS_FIXED_DOWN', false).write();
    },

    watchFixedPrice: function (price) {
        price = parseFloat(price);

        FIXED_PRICE_UP = parseFloat(FIXED_PRICE_UP);
        FIXED_PRICE_DOWN = parseFloat(FIXED_PRICE_DOWN);

        IS_FIXED_UP && price >= FIXED_PRICE_UP ? this.sendFixedAlert(true) : null;
        IS_FIXED_DOWN && price <= FIXED_PRICE_DOWN ? this.sendFixedAlert(false) : null;
    },

    fixlenAddZero: function (value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
    }

}