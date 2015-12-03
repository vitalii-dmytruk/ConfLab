define([
    'core/ConfLabsLayoutView',
    'core/HomepageRouter',
    'header/HeaderService',
    'menu/MenuService',
    'speaker/SpeakerRouter',
    'conference/ConferenceRouter',
    'auth/AuthService',
    'account/AccountRouter',
    'backbone.marionette',
    'backbone'
], function (ConfLabsLayoutView, HomepageRouter, HeaderService, MenuService, SpeakerRouter, ConferenceRouter,
             AuthService, AccountRouter) {

    'use strict';

    return Marionette.Application.extend({

        initialize: function () {
            this.layout = new ConfLabsLayoutView();
            this.layout.render();

            this.authService = new AuthService({
                container: this.layout.getRegion('main')
            });
        },

        onStart: function () {
            var app = this;

            this.authService.refreshSession().always(function () {

                app.menu = new MenuService({
                    container: app.layout.getRegion('menu')
                });

                app.header = new HeaderService({
                    container: app.layout.getRegion('header')
                });

                app.account = new AccountRouter({
                    container: app.layout.getRegion('main')
                });

                app.home = new HomepageRouter({
                    container: app.layout.getRegion('main')
                });

                app.conferences = new ConferenceRouter({
                    container: app.layout.getRegion('main')
                });

                app.speakers = new SpeakerRouter({
                    container: app.layout.getRegion('main')
                });

                if (Backbone.history) {
                    Backbone.history.start();
                }

            });

        }
    });
});