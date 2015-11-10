define([
    'common/Service',
    'header/HeaderView'
], function (Service, HeaderView) {

    'use strict';

    return Service.extend({

        initialize: function (options) {
            this.container = options.container;
            this.start();
        },

        onStart: function () {
            this.view = new HeaderView();
            this.container.show(this.view);
        }

    });

});
