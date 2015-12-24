define([
    'common/Service',
    'common/navigation/NavigationView'
], function (Service, NavigationView) {

    'use strict';

    //noinspection JSUnusedGlobalSymbols
    return Service.extend({

        channelName: 'menu',

        initialize: function (options) {
            this.container  = options.container;
            this.start();
        },

        onStart: function () {
            var menu = new NavigationView({
                className: 'nav nav-sidebar'
            });
            this.container.show(menu);
            this.channel.reply({
                add     : menu.add,
                activate: menu.activate,
                remove  : menu.remove
            }, menu)
        },

        onStop: function () {
            this.channel.reset();
        }
    });
});
