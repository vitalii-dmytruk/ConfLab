require([
    'core/ConfLabsApp',
    'core/HomepageRouter',
    'header/HeaderService',
    'menu/MenuService',
    'profile/ProfileRouter',
    'speaker/SpeakerRouter',
    'conferences/ConferencesRouter',
    'auth/AuthRouter',
    'auth/session/SessionService',
    'backbone'
], function (C2CApplication, HomepageRouter, HeaderService, MenuService, ProfileRouter, SpeakersRouter, ConferencesRouter,
             AuthRouter, SessionService) {

    'use strict';

    $(function () {
        var app;

        app = new ConfLabApp();

        app.session = new SessionService();

        app.menu = new MenuService({
            container: app.layout.getRegion('menu')
        });

        app.header = new HeaderService({
            container: app.layout.getRegion('header')
        });

        app.home = new HomepageRouter({
            container: app.layout.getRegion('main')
        });

        app.profile = new ProfileRouter({
            container: app.layout.getRegion('main')
        });

        app.conferences = new ConferencesRouter({
            container: app.layout.getRegion('main')
        });

        app.speakers = new SpeakerRouter({
            container: app.layout.getRegion('main')
        });

        app.auth = new AuthRouter({
            container: app.layout.getRegion('main')
        });

        app.start();

        $.ajaxSetup({
            statusCode: {
                401: function (jqXHR) {
                    var response = '';
                    try {
                        response = jqXHR.responseJSON.error;
                    } catch (err) {
                    }
                    Backbone.history.navigate('#login', {trigger: true});
                }
            }
        });
    });

});