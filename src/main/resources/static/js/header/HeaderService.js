define([
    'backbone.radio',
    'common/Service',
    'header/HeaderView',
    'header/HeaderModel',
    'common/navigation/NavigationView'
], function (Radio, Service, HeaderView, HeaderModel, NavigationView) {

    'use strict';

    return Service.extend({

        channelName: 'header',

        initialize: function (options) {
            this.container = options.container;
            this.start();
        },

        onStart: function () {
            var appMenu = new NavigationView({
                className: 'nav navbar-nav'
            });
            this.view   = new HeaderView({
                model: new HeaderModel()
            });
            this.container.show(this.view);
            this.view.appMenuRegion.show(appMenu);

            this.channel.reply({
                showAccountMenu: this.showAccountMenu
            }, this);
            this.channel.reply({
                add       : appMenu.addItems,
                activate  : appMenu.activateItem,
                remove    : appMenu.removeItem,
                deactivate: appMenu.deactivateItem
            }, appMenu)
        },

        showAccountMenu: function (accountMenuView) {
            this.view.accountMenuRegion.show(accountMenuView);
        }

    });

});
