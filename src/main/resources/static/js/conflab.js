require([
    'core/ConfLabsApplication',
    'menu/MenuService',
    'header/HeaderService',
    'profile/ProfileRouter',
    'conferences/ConferencesRouter',
    'speakers/SpeakersRouter'
], function (C2CApplication, MenuService, HeaderService, ProfileRouter, ConferencesRouter, SpeakersRouter) {

    'use strict';

    $(function () {
        var app;

        app = new C2CApplication();

        app.menu = new MenuService({
            container: app.layout.getRegion('menu')
        });

        app.header = new HeaderService({
            container: app.layout.getRegion('header')
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

        app.start();

    });

});