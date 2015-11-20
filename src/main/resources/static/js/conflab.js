require([
    'backbone',
    'core/ConfLabsApplication',
    'menu/MenuService',
    'header/HeaderService',
    'core/HomepageRouter',
    'profile/ProfileRouter',
    'conferences/ConferencesRouter',
    'speakers/SpeakersRouter',
    'auth/AuthRouter',
    'auth/session/SessionService'
], function (Backbone, C2CApplication, MenuService, HeaderService, HomepageRouter, ProfileRouter, ConferencesRouter,
             SpeakersRouter, AuthRouter, SessionService) {

    'use strict';

    $(function () {
        var app;

        app = new C2CApplication();

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

        app.speakers = new SpeakersRouter({
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