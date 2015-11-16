define([
    'common/Service',
    'header/HeaderView',
    'header/HeaderModel'
], function (Service, HeaderView, HeaderModel) {

    'use strict';

    return Service.extend({

        initialize: function (options) {
            this.container = options.container;
            this.start();
        },

        onStart: function () {
            this.view = new HeaderView({model: new HeaderModel()});
            this.container.show(this.view);
        }

    });

});
