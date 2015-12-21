define([
    'common/route/Route',
    'event/EventModel',
    'event/eventViewFactory'
], function (Route, EventModel, eventViewFactory) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        fetch: function (id) {
            this.model = new EventModel({id: id});
            return this.model.fetch();
        },

        render: function () {
            this.view = new eventViewFactory.itemDetailsView({
                model: this.model
            });
            this.container.show(this.view);
        }
    });
});