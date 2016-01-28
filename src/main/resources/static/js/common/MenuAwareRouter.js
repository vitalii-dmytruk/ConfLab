define([
    'common/Router',
    'backbone.radio',
    'backbone.marionette'
], function (Router, Radio) {

    'use strict';

    return Router.extend({

        constructor: function () {
            this.menuButton && initMenuButton(this);
            Router.apply(this, arguments);
        },

        onBeforeEnter: function () {
            Radio.channel('header').request('activate', this.menuButton);
        }

    });

    function initMenuButton(router) {
        var auth = Radio.channel('auth');

        auth.request('isAuthenticated') ? addMenuButton() : removeMenuButton();

        function addMenuButton() {
            Radio.channel('header').request('add', router.menuButton);
            router.active && Radio.channel('menu').request('activate', router.menuButton);
            auth.listenToOnce(auth, 'logout', removeMenuButton);
        }

        function removeMenuButton() {
            Radio.channel('header').request('remove', router.menuButton);
            auth.listenToOnce(auth, 'login', addMenuButton);
        }
    }

});
