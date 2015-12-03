define([
    'backbone.radio',
    'common/Service',
    'header/HeaderView',
    'header/HeaderModel'
], function (Radio, Service, HeaderView, HeaderModel) {

    'use strict';

    return Service.extend({

        channelName: 'header',

        initialize: function (options) {
            this.container = options.container;
            this.start();
        },

        onStart: function () {
            this.view = new HeaderView({
                model: new HeaderModel()
            });
            this.container.show(this.view);
            this.channel.reply({
                showAccountMenu: this.showAccountMenu
            }, this)
        },

        showAccountMenu: function (accountMenuView) {
            this.view.showChildView('accountMenu', accountMenuView);
        }

    });

});
