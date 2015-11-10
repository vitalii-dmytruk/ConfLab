require([
    'core/ConfLabsApplication',
    'menu/MenuService',
    'header/HeaderService',
    'profile/ProfileRouter',
    'conferences/ConferencesRouter'
], function (C2CApplication, MenuService, HeaderService, ProfileRouter, ConferencesRouter) {

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

        app.start();

    });

});