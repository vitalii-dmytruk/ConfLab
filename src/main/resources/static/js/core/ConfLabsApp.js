define([
    'core/ConfLabsLayoutView',
    'core/Notification',
    'core/HomepageRouter',
    'header/HeaderService',
    'menu/MenuService',
    'speaker/SpeakerRouter',
    'speech/SpeechRouter',
    'event/EventRouter',
    'auth/AuthService',
    'account/AccountRouter',
    'speech/LanguageService',
    'backbone.marionette'
], function (ConfLabsLayoutView, Notification, HomepageRouter, HeaderService, MenuService, SpeakerRouter, SpeechRouter,
    EventRouter, AuthService, AccountRouter, LanguageService) {

    'use strict';

    var ConfLabApp = Marionette.Application.extend({

        initialize: function () {
            this.layout = new ConfLabsLayoutView();
            this.layout.render();

            this.authService = new AuthService({
                container: this.layout.getRegion('main')
            });
        },

        notify : new Notification(),

        onStart: function () {
            var app = this;

            this.authService.refreshSession().always(function () {
                new LanguageService();

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

                app.event = new EventRouter({
                    container: app.layout.getRegion('main')
                });

                app.speaker = new SpeakerRouter({
                    container: app.layout.getRegion('main')
                });

                app.speech = new SpeechRouter({
                    container: app.layout.getRegion('main')
                });

                if (Backbone.history) {
                    Backbone.history.start();
                }

            });

        }
    });

    return new ConfLabApp();
});