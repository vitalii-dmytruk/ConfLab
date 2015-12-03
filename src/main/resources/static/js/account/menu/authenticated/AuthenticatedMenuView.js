define([
    'backbone.radio',
    'text!account/menu/authenticated/AuthenticatedMenuTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function (Radio, template) {

    'use strict';

    return Marionette.ItemView.extend({
        template : _.template(template),
        className: 'dropdown',
        tagName  : 'li',

        ui: {
            signOutBtn: '[data-sign-out-btn]'
        },

        events: {
            'click @ui.signOutBtn': requestLogout
        },

        bindings: {
            '[data-current-user-name]': 'username'
        },

        onRender: function () {
            this.stickit();
        }
    });

    function requestLogout() {
        Radio.channel('auth').request('logout');
    }
});