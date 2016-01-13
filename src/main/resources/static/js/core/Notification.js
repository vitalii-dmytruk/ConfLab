define([
    'backbone'
], function () {
    'use strict';
    return function Notification(){
        this.error = function (msg) {
            alert(msg);
        }
    };
});