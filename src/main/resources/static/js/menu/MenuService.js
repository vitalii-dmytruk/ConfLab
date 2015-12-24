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
                add     : menu.addItems,
                activate: menu.activateItem,
                remove  : menu.removeItem
            }, menu)
        },

        onStop: function () {
            this.channel.reset();
        }
    });
});
