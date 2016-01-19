define([
    'core/ConfLabsLayoutView',
    'core/NotificationService',
    'core/HomepageRouter',
    'header/HeaderService',
    'menu/MenuService',
    'speaker/SpeakerRouter',
    'speech/SpeechRouter',
    'partner/PartnerRouter',
    'event/EventRouter',
    'auth/AuthService',
    'account/AccountRouter',
    'backbone.marionette'
], function (ConfLabsLayoutView, NotificationService, HomepageRouter, HeaderService, MenuService, SpeakerRouter, SpeechRouter,
    PartnerRouter, EventRouter, AuthService, AccountRouter) {

    'use strict';

    var ConfLabApp = Marionette.Application.extend({

        initialize: function () {
            this.layout = new ConfLabsLayoutView();
            this.layout.render();
            this.notification = new NotificationService();
            this.authService  = new AuthService({
                container: this.layout.getRegion('main')
            });
        },

        onStart: function () {
            var app = this;
            this.notification.start();

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

                app.event = new EventRouter({
                    container: app.layout.getRegion('main')
                });

                app.speaker = new SpeakerRouter({
                    container: app.layout.getRegion('main')
                });

                app.speech = new SpeechRouter({
                    container: app.layout.getRegion('main')
                });

                app.partner = new PartnerRouter({
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