define([
    'common/Router',
    'backbone.radio',
    'backbone.marionette'
], function (Router, Radio) {

    'use strict';

    return Router.extend({

        constructor: function () {
            this.menuButton && initMenuButton(this.menuButton);
            Router.apply(this, arguments);
        },

        onBeforeEnter: function () {
            Radio.channel('menu').request('activate', this.menuButton);
        }

    });

    function initMenuButton(menuButton) {
        var auth = Radio.channel('auth');

        if (auth.request('isAuthenticated')) {
            addMenuButton();
        } else {
            removeMenuButton()
        }

        function addMenuButton() {
            Radio.channel('menu').request('add', menuButton);
            auth.listenToOnce(auth, 'logout', removeMenuButton);
        }

        function removeMenuButton() {
            Radio.channel('menu').request('remove', menuButton);
            auth.listenToOnce(auth, 'login', addMenuButton);
        }
    }

});
