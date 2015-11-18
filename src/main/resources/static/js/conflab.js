require([
    'backbone',
    'core/ConfLabsApplication',
    'menu/MenuService',
    'header/HeaderService',
    'core/HomepageRouter',
    'profile/ProfileRouter',
    'conferences/ConferencesRouter',
    'speakers/SpeakersRouter',
    'auth/Authentication',
    'auth/LoginRouter',
    'auth/LogoutRouter'
], function (Backbone, C2CApplication, MenuService, HeaderService, HomepageRouter, ProfileRouter, ConferencesRouter,
             SpeakersRouter, Authentication, LoginRouter, LogoutRouter) {

    'use strict';

    $(function () {
        var app;

        app = new C2CApplication();

        app.authentication = new Authentication();

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

        app.login = new LoginRouter({
            container: app.layout.getRegion('main'),
            application: app
        });

        app.logout = new LogoutRouter({application: app});

        app.authentication.initSessionUser();

        app.start();

        $.ajaxSetup({
            statusCode: {
                401: function(jqXHR) {
                    var response = '';
                    try {
                        response = jqXHR.responseJSON.error;
                    } catch (err) {}
                    app.authentication.set('error', response);
                    Backbone.history.navigate('#login', {trigger: true});
                }
            }
        });
    });

});