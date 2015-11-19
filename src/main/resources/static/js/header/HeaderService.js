define([
    'backbone.radio',
    'common/Service',
    'header/HeaderView',
    'header/HeaderModel'
], function (Radio, Service, HeaderView, HeaderModel) {

    'use strict';

    return Service.extend({

        initialize: function (options) {
            this.container = options.container;
            this.start();
        },

        onStart: function () {
            this.view = new HeaderView({
                model  : new HeaderModel(),
                session: Radio.channel('session').request('getSession')
            });
            this.container.show(this.view);
        }

    });

});
