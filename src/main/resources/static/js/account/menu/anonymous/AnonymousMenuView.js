define([
    'backbone.radio',
    'text!account/menu/anonymous/AnonymousMenuTemplate.html',
    'backbone.marionette'
], function (Radio, template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName : 'li',
        template: _.template(template),

        ui: {
            signInBtn: '[data-sign-in-btn]'
        },

        events: {
            'click @ui.signInBtn': requestLogin
        }
    });

    function requestLogin() {
        Radio.channel('auth').request('login');
    }
});