define([
    'backbone.radio',
    'common/Router',
    'account/menu/anonymous/AnonymousMenuView',
    'account/menu/authenticated/AuthenticatedMenuView'
], function (Radio, Router, AnonymousMenuView, AuthenticatedMenuView) {

    'use strict';

    return Router.extend({

        initialize: function (options) {
            this.container = options.container;
            showMenu();
        }
    });

    function showMenu() {
        var auth = Radio.channel('auth');

        auth.request('isAuthenticated') ? showAuthenticatedMenu() : showAnonymousMenu();
        auth.on('login', showAuthenticatedMenu);
        auth.on('logout', showAnonymousMenu)
    }

    function showAuthenticatedMenu() {
        var currentUser = Radio.channel('auth').request('currentUser');
        Radio.channel('header').request('showAccountMenu', new AuthenticatedMenuView({
            model: new Backbone.Model(currentUser)
        }));
    }

    function showAnonymousMenu() {
        Radio.channel('header').request('showAccountMenu', new AnonymousMenuView());
    }
});