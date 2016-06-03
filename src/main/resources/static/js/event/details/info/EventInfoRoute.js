define([
    'common/route/Route',
    'event/eventViewFactory'
], function (Route, eventViewFactory) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event = options.event;
            this.container = options.container
        },

        render: function () {
            this.container.show(new eventViewFactory.itemDetailsView({
                model: this.event
            }));
        }
    });
});