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
            Radio.channel('menu').request('activate', this.menuButton);
        }

    });

    function initMenuButton(router) {
        var auth = Radio.channel('auth');

        auth.request('isAuthenticated') ? addMenuButton() : removeMenuButton();

        function addMenuButton() {
            router.menuButton.active = router.active;
            Radio.channel('menu').request('add', router.menuButton);
            auth.listenToOnce(auth, 'logout', removeMenuButton);
        }

        function removeMenuButton() {
            Radio.channel('menu').request('remove', router.menuButton);
            auth.listenToOnce(auth, 'login', addMenuButton);
        }
    }

});
